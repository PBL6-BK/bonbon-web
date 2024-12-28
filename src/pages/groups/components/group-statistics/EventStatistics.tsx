import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker, Form, Select } from 'antd'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { OrbitProgress } from 'react-loading-indicators'
import groupApi from 'src/apis/group.api'
import { useFieldValue } from 'src/shared/hook'

interface GroupEvent {
  id: number
  group_id: number
  name: string
  can_modified: boolean
  total_spent: number
}

interface Props {
  groupId?: string
  setSelectedEventId: Dispatch<SetStateAction<number>>
}

export default function EventStatistics({ groupId, setSelectedEventId }: Props) {
  const [events, setEvents] = useState<GroupEvent[]>([])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const formValue = {
    year: useFieldValue('year', form),
    type: useFieldValue('type', form)
  }

  const handleChangeForm = () => {
    if (formValue.type === 0) {
      const getRecentEvents = async () => {
        setIsLoading(true)
        const res = await groupApi.getRecentEvent(Number(groupId), formValue.year?.year() || dayjs().year())
        const data = res.data
        setEvents(data)
        setIsLoading(false)
      }
      getRecentEvents()
    } else {
      const getTopSpending = async () => {
        setIsLoading(true)
        const res = await groupApi.getTopEvent(Number(groupId), formValue.year?.year() || dayjs().year())
        const data = res.data
        setEvents(data)
        setIsLoading(false)
      }
      getTopSpending()
    }
  }

  useEffect(() => {
    handleChangeForm()
  }, [formValue.year?.year(), formValue.type])

  return (
    <>
      <div className='mb-3 flex w-full items-center justify-between gap-3'>
        <h3>Events</h3>
        <Form layout='inline' form={form}>
          <Form.Item name='year' initialValue={dayjs()}>
            <DatePicker picker='year' className='w-24' />
          </Form.Item>
          <Form.Item name='type' initialValue={0}>
            <Select
              className='w-48'
              options={[
                { value: 0, label: 'Recent event' },
                { value: 1, label: 'Top spending' }
              ]}
            />
          </Form.Item>
        </Form>
      </div>

      <div className='scrollbar-hide flex h-[25rem] w-full flex-col justify-center overflow-y-auto rounded-lg bg-[#e6f4ff] px-5 py-2 hover:cursor-pointer'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
          </div>
        ) : events.length > 0 ? (
          events.map((event, index) => (
            <div
              key={event.id}
              className={`mb-4 flex items-center justify-between rounded-lg bg-[#88d1ff] p-6 shadow-md transition-shadow duration-200 hover:shadow-lg ${
                index === 0 ? '' : ''
              }`}
              onClick={() => setSelectedEventId(event.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedEventId(event.id)
                }
              }}
              role='button'
              tabIndex={0}
            >
              <div className='flex flex-col'>
                <h3 className='text-xl font-bold text-gray-800'>{event.name}</h3>
                <p className='mt-1 text-lg font-medium text-[#001a7d]'>
                  💰 Total Spent: {event.total_spent.toLocaleString()}đ
                </p>
              </div>
              <FontAwesomeIcon icon={faAngleRight} size='2x' />
            </div>
          ))
        ) : (
          <div className='flex h-full flex-col items-center justify-start text-center text-gray-500'>
            <p className='text-lg font-semibold'>No events available</p>
            <p className='text-sm'>Please check back later for upcoming events.</p>
          </div>
        )}
      </div>
    </>
  )
}
