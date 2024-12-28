import { faPenToSquare, faTimes, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EventGroup } from 'src/types/group.type'
import ConfirmModal, { IConfirmModalRef } from 'src/components/common/ConfirmModal'
import { useRef, useState } from 'react'
import GroupEventForm from '../GroupEventForm'
import { Form } from 'antd'
import { IFormModalRef } from 'src/components/common/FormModal'
import { useFieldValue } from 'src/shared/hook'
import EventItemList from '../event-item/EventItemList'
import RefundList from '../../refund/RefundList'

interface Props {
  event?: EventGroup
  handleUpdate: (id: number, updatedName: { name: string }) => void
  handleDelete: (id: number) => void
  handleBack: () => void
}

export default function GroupEventDetail({ event, handleUpdate, handleDelete, handleBack }: Props) {
  const [activeTab, setActiveTab] = useState('items')
  const confirmModalRef = useRef<IConfirmModalRef>(null)
  const modalRef = useRef<IFormModalRef>(null)
  const [editForm] = Form.useForm()

  const name: string = useFieldValue('name', editForm)

  const handleUpdateEvent = async () => {
    handleUpdate(event?.id || 0, { name: name })
  }

  const handleDeleteEvent = async () => {
    handleDelete(event?.id || 0)
    handleBack()
  }

  return (
    <>
      <div className='flex items-center justify-between gap-2 rounded-t-lg border-x-0 border-t-0 border-solid border-blue-300 bg-blue-200 p-3'>
        <span className='text-xl font-bold text-[#0040ff]'>{event?.name}</span>
        <div className='flex items-center gap-4'>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className='text-xl hover:cursor-pointer'
            onClick={() => modalRef.current?.showModal()}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            className='text-xl hover:cursor-pointer'
            onClick={() => confirmModalRef.current?.showModal()}
          />
          <FontAwesomeIcon icon={faTimes} className='text-2xl hover:cursor-pointer' onClick={handleBack} />
        </div>
      </div>
      <div className='mt-1 flex items-center justify-around'>
        {/* Items Tab */}
        <div
          className={`cursor-pointer text-center ${activeTab === 'items' ? 'text-[#1da1f2]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('items')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setActiveTab('items')
          }}
          role='tab'
          tabIndex={0}
        >
          <p>Items</p>
          {activeTab === 'items' && <div className='mx-auto mt-1 h-1 w-32 bg-[#48baff]'></div>}
        </div>

        {/* Refund Tab */}
        <div
          className={`cursor-pointer text-center ${activeTab === 'refund' ? 'text-[#1da1f2]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('refund')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setActiveTab('refund')
          }}
          role='tab'
          tabIndex={0}
        >
          <p>Refund</p>
          {activeTab === 'refund' && <div className='mx-auto mt-1 h-1 w-32 bg-[#48baff]'></div>}
        </div>
      </div>
      <div className='p-3'>
        <div className='scrollbar-hide flex h-[26.5rem] flex-col gap-5 overflow-y-auto rounded-xl bg-white'>
          {activeTab === 'items' && (
            <EventItemList eventId={event?.id || 0} canModified={event?.can_modified || false} />
          )}
          {activeTab === 'refund' && <RefundList eventId={event?.id || 0} />}
        </div>
      </div>
      <ConfirmModal title='Delete this event' ref={confirmModalRef} onOk={handleDeleteEvent} />
      <GroupEventForm
        title='Update event'
        modalRef={modalRef}
        form={editForm}
        formData={event}
        handleSubmit={handleUpdateEvent}
      />
    </>
  )
}
