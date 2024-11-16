import { Option } from 'antd/es/mentions'
import { useEffect, useRef, useState } from 'react'
import aiAssistanceApi from 'src/apis/aiAssistance.api'
import CategoryCard, { CategoryData } from './CategoryCard'
import { ThreeDot } from 'react-loading-indicators'

interface Props {
  onClose?: () => void
}

export interface Message {
  text: any
  sender: 'bot' | 'user'
  type: 'text' | 'card'
}

export interface Option {
  label: string
  nextQuestionIndex: number
}

export interface Question {
  text: string
  options?: { label: string; nextQuestionIndex: number }[]
  validator?: (input: string) => boolean
  errorMessage?: string
  key?: string
}

const questions: Question[] = [
  {
    text: `Hello 😊! Would you like me to create a spending plan for you?`,
    options: [
      { label: 'Yes', nextQuestionIndex: 1 },
      { label: 'No', nextQuestionIndex: -1 }
    ]
  },
  {
    text: 'How many percentages do you want to save next month? 💰',
    validator: (input) => !isNaN(Number(input)) && Number(input) >= 0 && Number(input) <= 100,
    errorMessage: 'Please tell me a number from 0 to 100 😉',
    key: 'savings'
  }
]

export default function PlanChatbot({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [loading, setLoading] = useState(false)
  const userResponses = useRef<{ [key: string]: string }>({})

  const bottomRef = useRef<HTMLDivElement>(null)

  const handleUserResponse = (option?: Option, input?: string) => {
    let nextIndex = currentQuestionIndex

    if (option) {
      nextIndex = handleUserOption(option)
    } else if (input) {
      nextIndex = handleUserInput(input)
    }

    setCurrentQuestionIndex(nextIndex)
    setUserInput('')

    if (nextIndex === currentQuestionIndex) {
      return
    }

    if (nextIndex === -1) {
      displayMessageWordByWord('Alright, whenever you need, don’t hesitate to ask me—I’ll be here to help you. 🥰')
    } else if (nextIndex === questions.length) {
      displayMessageWordByWord('This is a spending plan for you.')
      generateSpendingPlan()
    } else {
      displayMessageWordByWord(questions[nextIndex].text)
    }
  }

  const handleUserOption = (option: Option) => {
    setMessages((prevMessages) => [...prevMessages, { text: option.label, sender: 'user', type: 'text' }])
    setShowOptions(false)

    return option.nextQuestionIndex
  }

  const handleUserInput = (input: string) => {
    if (!input.trim()) return currentQuestionIndex
    setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user', type: 'text' }])

    if (currentQuestionIndex >= questions.length || currentQuestionIndex === -1) return 0

    const currentQuestion = questions[currentQuestionIndex]

    if (currentQuestion.validator && !currentQuestion.validator(userInput)) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentQuestion.errorMessage || 'Invalid input', sender: 'bot', type: 'text' }
      ])
      return currentQuestionIndex
    }

    if (currentQuestion.key) {
      userResponses.current = {
        ...userResponses.current,
        [currentQuestion.key]: userInput
      }
    }

    return currentQuestionIndex + 1
  }

  const generateSpendingPlan = async () => {
    setLoading(true)
    const res = await aiAssistanceApi.getSuggestionPlan(Number(userResponses.current.savings))
    const data = res.data
    const categoryList = data['response']['savings_plan']['recommendations']
    const categoryMsg: Message[] = []

    categoryList.forEach((category: CategoryData) => {
      categoryMsg.push({ text: category, sender: 'bot', type: 'card' })
    })

    setMessages((prevMessages) => [...prevMessages, ...categoryMsg])
    setLoading(false)
  }

  const displayMessageWordByWord = (fullText: string) => {
    const words = fullText.split(' ')
    let index = -1

    const interval = setInterval(() => {
      if (index < words.length - 1) {
        index++
        setDisplayedText((prevText) => prevText + words[index] + ' ')
      } else {
        clearInterval(interval)
        setMessages((prevMessages) => [...prevMessages, { text: fullText, sender: 'bot', type: 'text' }])
        setDisplayedText('')

        const currentQuestion = questions[currentQuestionIndex]
        if (currentQuestion?.options) setShowOptions(true)
      }
    }, 50)
  }

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, displayedText])

  useEffect(() => {
    displayMessageWordByWord(questions[0].text)
  }, [])

  return (
    <div className='relative flex h-[36rem] w-96 flex-col rounded-t-2xl border border-gray-300 bg-white shadow-2xl'>
      <div className='flex h-14 flex-shrink-0 items-center gap-3 rounded-t-2xl bg-green-400 ps-2'>
        <div className='h-10 w-10 rounded-full bg-gray-400'></div>
        <span className='text-xl font-bold'>BonBon Assistant</span>
        <button
          className='absolute right-2 border-none bg-green-400 text-2xl text-red-500 hover:cursor-pointer hover:text-gray-800'
          onClick={onClose}
        >
          ❌
        </button>
      </div>
      <div className='flex grow flex-col overflow-y-auto px-4'>
        <div className='scrollbar-hide mb-4 flex-1 overflow-y-auto'>
          {messages.map((msg, index) => (
            <div key={index} className={`mt-3 flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.type === 'text' ? (
                <div
                  className={`inline-block max-w-[75%] break-words rounded-lg p-2 text-lg leading-normal ${
                    msg.sender === 'user' ? 'bg-green-400 text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              ) : msg.type === 'card' && msg.sender === 'bot' ? (
                <CategoryCard categoryData={msg.text} />
              ) : null}
            </div>
          ))}
          {displayedText && (
            <div className='mt-3 flex w-full justify-start'>
              <div className='inline-block max-w-[75%] break-words rounded-md bg-gray-200 p-2 text-lg leading-normal text-black'>
                {displayedText}
              </div>
            </div>
          )}
          {currentQuestionIndex >= 0 && currentQuestionIndex < questions.length
            ? showOptions && (
                <div className='mt-3 flex justify-center gap-4'>
                  {questions[currentQuestionIndex].options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUserResponse(option)}
                      className='h-10 w-16 rounded-full border-none bg-green-400 px-4 py-2 text-white hover:cursor-pointer hover:bg-green-500'
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )
            : null}
          {loading && (
            <div className='mt-3 text-center'>
              <ThreeDot variant='pulsate' color='#32cd32' size='small' text='' textColor='' />
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <div className='flex h-16 flex-shrink-0 items-center bg-gray-300'>
        <input
          type='text'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserResponse(undefined, userInput)}
          placeholder='Type a message...'
          className='mx-2 flex-1 rounded border-none p-2 hover:border-gray-500'
        />
        <button
          onClick={() => handleUserResponse(undefined, userInput)}
          className='mr-2 rounded border-none bg-green-500 p-2 text-white hover:cursor-pointer'
        >
          Send
        </button>
      </div>
    </div>
  )
}
