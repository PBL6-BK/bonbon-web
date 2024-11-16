import FinancialOverview from './components/FinancialOverview'
import CategoryDistribution from './components/CategoryDistribution'
import ChatbotBubble from './components/ChatbotBubble'

export default function Statistics() {
  return (
    <div className='scrollbar-hide m-1 flex grid min-h-full grid-cols-12 gap-5 overflow-y-auto rounded-2xl bg-white p-5 py-2'>
      <div className='col-span-6 flex h-full w-full flex-col gap-3'>
        <FinancialOverview />
      </div>

      <div className='col-span-6 flex flex-col'>
        <div className='flex h-full w-full flex-col'>
          <CategoryDistribution />
        </div>
        <ChatbotBubble />
      </div>
    </div>
  )
}
