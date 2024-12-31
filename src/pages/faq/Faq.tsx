// Import React and Tailwind CSS
import React, { useEffect, useState } from 'react'
import { set } from 'lodash'
import { FaqType } from 'src/types/faq.type'
import faqApi from 'src/apis/faq.api'
import { OrbitProgress } from 'react-loading-indicators'
import { Link } from 'react-router-dom'
import { BonBonChatbotImg, FAQImg, LogoImg } from 'src/assets/images'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [faqList, setFaqList] = useState<FaqType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleAnswer = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  useEffect(() => {
    const getFAQList = async () => {
      setIsLoading(true)
      try {
        const res = await faqApi.getFaq()
        const data = res.data
        setFaqList(data)
      } finally {
        setIsLoading(false)
      }
    }
    getFAQList()
  }, [])

  return (
    <div className='mx-auto max-w-4xl bg-gray-100 p-6 text-center'>
      <Link to='/personal-finance'>
        <img src={LogoImg} alt='Bonni' className='h-20 w-20 rounded-full' />
      </Link>
      <h1 className='mb-8 text-center text-3xl font-semibold text-gray-900'>Frequently Asked Questions</h1>
      <div
        className='mx-auto mb-7 h-80 max-w-4xl bg-gray-100 bg-cover bg-center p-6'
        style={{ backgroundImage: `url(${FAQImg})` }}
      ></div>
      {!isLoading && (
        <div className='rounded-lg bg-white'>
          {faqList.map((item, index) => (
            <div key={index} className=''>
              <button
                className={`flex w-full items-center justify-between border border-solid border-gray-400 bg-white px-5 py-3 text-xl font-medium text-gray-900 hover:cursor-pointer hover:bg-gray-200 focus:outline-none ${
                  index > 0 ? 'border-t-0' : ''
                }`}
                onClick={() => toggleAnswer(index)}
              >
                {item.name}
                <span className='ml-2 text-gray-500'>{activeIndex === index ? '-' : '+'}</span>
              </button>
              {activeIndex === index && (
                <div className=' texttext-left border border-t-0 border-solid border-gray-400 bg-blue-100 px-5 py-3 text-left'>
                  {item.question_and_answer.map((qa, i) => (
                    <div key={i} className='mt-2 leading-5'>
                      <span className='font-semibold'>Q: {qa.question}</span>
                      <p>
                        <span className='font-semibold'>A:</span> {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isLoading && (
        <div className='flex h-full w-full items-center justify-center'>
          <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
        </div>
      )}
    </div>
  )
}
