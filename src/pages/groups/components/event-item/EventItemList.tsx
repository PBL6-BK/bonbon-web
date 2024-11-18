import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import groupApi from 'src/apis/group.api'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form } from 'antd'
import { toast } from 'react-toastify'
import { useFieldValue } from 'src/shared/hook'
import EventItem from './EventItem'
import type { EventItem as EventItemType } from 'src/types/group.type'
import GroupEventForm from '../GroupEventForm'

interface Props {
  eventId: number
  canModified: boolean
}
export default function EventItemList({ eventId, canModified }: Props) {
  const [items, setItems] = useState<EventItemType[]>([])
  const modalRef = useRef<IFormModalRef>(null)
  const [addForm] = Form.useForm()

  const newItem = {
    event_id: eventId,
    name: useFieldValue('name', addForm)
  }

  const handleAddItem = async () => {
    const res = await groupApi.createItem(newItem)
    const data = res.data
    setItems([data, ...items])
    toast.success('Create an item successfully')
  }

  const handleUpdateItem = async (id: number, updatedName: { name: string }) => {
    await groupApi.updateItem(id, updatedName)
    setItems(items.map((item) => (item.id === id ? { ...item, name: updatedName.name } : item)))
    toast.success('Update an item successfully')
  }

  const handleDeleteItem = async (id: number) => {
    await groupApi.deleteItem(id)
    setItems(items.filter((item) => item.id !== id))
    toast.success('Delete an item successfully')
  }

  useEffect(() => {
    console.log('EventItemList', eventId)
    const getItems = async () => {
      const res = await groupApi.getAllItemsOfEvent(eventId)
      const data = res.data
      setItems(data['results'])
      console.log(data['results'])
    }
    getItems()
  }, [eventId])

  return (
    <>
      <div className='scrollbar-hide flex h-[29rem] flex-col gap-5 overflow-y-auto bg-white p-5'>
        {items.map((item) => (
          <EventItem
            key={item.id}
            eventItem={item}
            canModified={canModified}
            handleUpdate={handleUpdateItem}
            handleDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </div>

      <div className='fixed bottom-10 right-10 z-50 m-3 flex flex-col items-center'>
        <div className='flex flex-col items-center space-y-2'>
          <button
            className='shadow-3xl flex h-14 w-14 items-center justify-center rounded-full border-none bg-green-500 text-white hover:cursor-pointer'
            onClick={modalRef.current?.showModal}
          >
            <FontAwesomeIcon icon={faPlus} size='2x' />
          </button>
        </div>
      </div>
      <GroupEventForm title='Create new item' modalRef={modalRef} form={addForm} handleSubmit={handleAddItem} />
    </>
  )
}
