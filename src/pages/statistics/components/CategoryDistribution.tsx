import { DatePicker, Form } from 'antd'
import PieChart from './PieChart'
import { useEffect, useState } from 'react'
import statisticsApi from 'src/apis/statistics.api'
import dayjs from 'dayjs'
import { useFieldValue } from 'src/shared/hook'
import { OrbitProgress } from 'react-loading-indicators'
const { RangePicker } = DatePicker

export default function CategoryDistribution() {
  const [incomeData, setIncomeData] = useState([])
  const [outcomeData, setOutcomeData] = useState([])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const range = useFieldValue('range', form)
  const startDate = range?.[0].format('YYYY-MM-DD')
  const endDate = range?.[1].format('YYYY-MM-DD')

  useEffect(() => {
    const getCategoryDistribution = async () => {
      setIsLoading(true)
      try {
        const res = await statisticsApi.categoryDistribution(
          startDate || dayjs().startOf('month').format('YYYY-MM-DD'),
          endDate || dayjs().endOf('month').format('YYYY-MM-DD')
        )
        const data = res.data
        setIncomeData(data['income'])
        setOutcomeData(data['outcome'])
      } finally {
        setIsLoading(false)
      }
    }
    getCategoryDistribution()
  }, [endDate, startDate])

  return (
    <>
      <div className='flex w-full items-center justify-between gap-4'>
        <h2>Distribution</h2>
        <Form layout='inline' form={form}>
          <Form.Item name='range' initialValue={[dayjs().startOf('month'), dayjs().endOf('month')]}>
            <RangePicker />
          </Form.Item>
        </Form>
      </div>

      <div className='scrollbar-hide flex h-[32rem] w-full justify-center overflow-y-auto'>
        <div className='w-5/6'>
          {!isLoading && (
            <>
              <PieChart title='Outcome by Category' datasets={outcomeData} />
              {/* <PieChart title='Income by Category' datasets={incomeData} /> */}
            </>
          )}
          {isLoading && (
            <div className='flex h-full w-full items-center justify-center'>
              <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
