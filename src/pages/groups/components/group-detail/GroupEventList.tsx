import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import groupApi from 'src/apis/group.api'
import { EventGroup } from 'src/types/group.type'
import GroupEvent from './GroupEvent'

export default function GroupEventList() {
  const { id } = useParams()
  const [events, setEvents] = useState<EventGroup[]>([])

  useEffect(() => {
    const getEvents = async () => {
      const res = await groupApi.getAllEventsOfGroup(Number(id))
      const data = res.data
      setEvents(data['results'])
    }
    getEvents()
  }, [id])

  return (
    <>
      <div className='mt-1 flex justify-around'>
        <div className='text-center'>
          <p className='text-green-500'>Events</p>
          <div className='mx-auto mt-1 h-1 w-32 bg-green-500'></div>
        </div>
        <div className='text-center'>
          <p className='text-gray-500'>Statistics</p>
        </div>
      </div>
      <div className='scrollbar-hide mt-3 flex h-[29.5rem] flex-col gap-5 overflow-y-auto bg-white p-3'>
        {events.map((event) => (
          <GroupEvent key={event.id} />
        ))}
      </div>
    </>
  )
}
