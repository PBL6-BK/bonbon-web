import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import groupApi from 'src/apis/group.api'
import { EventGroup } from 'src/types/group.type'
import GroupEvent from './GroupEvent'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GroupEventForm from '../GroupEventForm'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form } from 'antd'
import { toast } from 'react-toastify'
import { useFieldValue } from 'src/shared/hook'
import GroupEventDetail from './GroupEventDetail'
import GroupStatistics from '../group-statistics/GroupStatistics'
import { OrbitProgress } from 'react-loading-indicators'

export default function GroupEventList() {
  const { id } = useParams()
  const [events, setEvents] = useState<EventGroup[]>([])
  const [selectedEventId, setSelectedEventId] = useState<number>(0)
  const [activeTab, setActiveTab] = useState('events')
  const [isLoading, setIsLoading] = useState(false)

  const modalRef = useRef<IFormModalRef>(null)
  const [addForm] = Form.useForm()

  const selectedEvent = events.find((event) => event.id === selectedEventId)

  const newEvent = {
    group_id: id,
    name: useFieldValue('name', addForm)
  }

  const handleAddEvent = async () => {
    const res = await groupApi.createEvent(newEvent)
    const data = res.data
    setEvents([data, ...events])
    toast.success('Create an event successfully')
  }

  const handleUpdateEvent = async (id: number, updatedName: { name: string }) => {
    await groupApi.updateEvent(id, updatedName)
    setEvents(events.map((event) => (event.id === id ? { ...event, name: updatedName.name } : event)))
    toast.success('Update event successfully')
  }

  const handleDeleteEvent = async (id: number) => {
    await groupApi.deleteEvent(id)
    setEvents(events.filter((event) => event.id !== id))
    toast.success('Delete event successfully')
  }

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true)
      try {
        const res = await groupApi.getAllEventsOfGroup(Number(id))
        const data = res.data
        setEvents(data['results'])
      } finally {
        setIsLoading(false)
      }
    }
    getEvents()
  }, [id])

  return (
    <>
      {!selectedEventId ? (
        <div className='p-3'>
          <div className='mt-1 flex items-center justify-around'>
            <div
              className={`cursor-pointer text-center ${activeTab === 'events' ? 'text-[#1da1f2]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('events')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setActiveTab('events')
              }}
              role='tab'
              tabIndex={0}
            >
              <p>Events</p>
              {activeTab === 'events' && <div className='mx-auto mt-1 h-1 w-32 bg-[#48baff]'></div>}
            </div>

            {/* Refund Tab */}
            <div
              className={`cursor-pointer text-center ${
                activeTab === 'statistics' ? 'text-[#1da1f2]' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('statistics')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setActiveTab('statistics')
              }}
              role='tab'
              tabIndex={0}
            >
              <p>Statistics</p>
              {activeTab === 'statistics' && <div className='mx-auto mt-1 h-1 w-32 bg-[#48baff]'></div>}
            </div>
          </div>

          {activeTab === 'events' && (
            <>
              <div className='scrollbar-hide mt-3 flex h-[29rem] flex-col gap-5 overflow-y-auto bg-white p-5 rounded-xl'>
                {!isLoading &&
                  events.map((event) => (
                    <GroupEvent key={event.id} event={event} handleClick={() => setSelectedEventId(event.id)} />
                  ))}
                {isLoading && (
                  <div className='flex h-full w-full items-center justify-center'>
                    <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
                  </div>
                )}
              </div>
              <div className='fixed bottom-10 right-10 z-50 m-3 flex flex-col items-center'>
                <div className='flex flex-col items-center space-y-2'>
                  <button
                    className='shadow-3xl flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-[#48baff] text-white'
                    onClick={modalRef.current?.showModal}
                  >
                    <FontAwesomeIcon icon={faPlus} size='2x' />
                  </button>
                  <GroupEventForm
                    title='Create new event'
                    modalRef={modalRef}
                    form={addForm}
                    handleSubmit={handleAddEvent}
                  />
                </div>
              </div>
            </>
          )}
          {activeTab === 'statistics' && (
            <div className='mt-3 h-[29rem] bg-white p-1'>
              <GroupStatistics groupId={id} setSelectedEventId={setSelectedEventId} />
            </div>
          )}
        </div>
      ) : (
        <GroupEventDetail
          event={selectedEvent}
          handleUpdate={handleUpdateEvent}
          handleDelete={handleDeleteEvent}
          handleBack={() => setSelectedEventId(0)}
        />
      )}
    </>
  )
}
