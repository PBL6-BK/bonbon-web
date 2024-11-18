import { faAngleDown, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
import ConfirmModal, { IConfirmModalRef } from 'src/components/common/ConfirmModal'
import { IFormModalRef } from 'src/components/common/FormModal'
import type { EventItem } from 'src/types/group.type'
import GroupEventForm from '../GroupEventForm'
import { Form } from 'antd'
import { useFieldValue } from 'src/shared/hook'
import ItemSpending from '../item-spending/ItemSpending'

interface Props {
  eventItem: EventItem
  canModified: boolean
  handleUpdate: (id: number, updatedName: { name: string }) => void
  handleDelete: () => void
}

export default function EventItem({ eventItem, canModified, handleUpdate, handleDelete }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const confirmModalRef = useRef<IConfirmModalRef>(null)
  const modalRef = useRef<IFormModalRef>(null)
  const [editForm] = Form.useForm()

  const name = useFieldValue('name', editForm)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleUpdateItem = async () => {
    handleUpdate(eventItem.id, { name: name })
  }

  return (
    <div>
      <div
        role='button'
        tabIndex={0}
        className='flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-2xl'
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown()
          }
        }}
      >
        <div>
          <div className='mb-3 flex items-center gap-5'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-800'>{eventItem.name}</h2>
            {eventItem.spendings.length <= 5 ? (
              eventItem.spendings.map((spending) => (
                <img
                  key={spending.id}
                  src={spending.avatar}
                  alt={`${spending.full_name}'s avatar`}
                  className='h-10 w-10 rounded-full object-cover'
                />
              ))
            ) : (
              <>
                {eventItem.spendings.slice(0, 5).map((spending) => (
                  <img
                    key={spending.id}
                    src={spending.avatar}
                    alt={`${spending.full_name}'s avatar`}
                    className='h-10 w-10 rounded-full object-cover'
                  />
                ))}
                <div className='-ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-sm text-white'>
                  +{eventItem.spendings.length - 5}
                </div>
              </>
            )}
            {/* {eventItem.spendings.map((spending) => (
              <img
                key={spending.id}
                src={spending.avatar}
                alt={`${spending.full_name}'s avatar`}
                className='h-10 w-10 rounded-full object-cover'
              />
            ))} */}
          </div>
          <div className='flex gap-5'>
            <p className='italic text-gray-500'>Created at: {new Date(eventItem.created_at).toLocaleString()}</p>
            {/* {eventItem.updated_at && (
              <p className='italic text-gray-500'>Updated at: {new Date(eventItem.updated_at).toLocaleString()}</p>
            )} */}
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className='text-xl hover:cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              modalRef.current?.showModal()
            }}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className={`text-xl ${canModified ? 'hover:cursor-pointer' : 'text-gray-400 hover:cursor-default'}`}
            onClick={(e) => {
              e.stopPropagation()
              if (!canModified) return
              confirmModalRef.current?.showModal()
            }}
          />
          <FontAwesomeIcon icon={faAngleDown} size='2x' />
        </div>
      </div>

      {isOpen && <ItemSpending itemId={eventItem.id} spendings={eventItem.spendings} canModified={canModified} />}
      <ConfirmModal title='Delete an item' ref={confirmModalRef} onOk={handleDelete} />
      <GroupEventForm
        title='Update an item'
        modalRef={modalRef}
        form={editForm}
        formData={eventItem}
        handleSubmit={handleUpdateItem}
      />
    </div>
  )
}
