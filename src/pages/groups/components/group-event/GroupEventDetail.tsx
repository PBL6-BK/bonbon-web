import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EventGroup } from 'src/types/group.type'
import ConfirmModal, { IConfirmModalRef } from 'src/components/common/ConfirmModal'
import { useRef } from 'react'
import GroupEventForm from '../GroupEventForm'
import { Form } from 'antd'
import { IFormModalRef } from 'src/components/common/FormModal'
import { useFieldValue } from 'src/shared/hook'
import EventItemList from '../event-item/EventItemList'

interface Props {
  event?: EventGroup
  handleUpdate: (id: number, updatedName: { name: string }) => void
  handleDelete: (id: number) => void
  handleBack: () => void
}

export default function GroupEventDetail({ event, handleUpdate, handleDelete, handleBack }: Props) {
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
        <span className='text-xl font-bold text-green-600'>{event?.name}</span>
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
          <button className='border-none bg-blue-200 text-xl hover:cursor-pointer' onClick={handleBack}>
            ❌
          </button>
        </div>
      </div>
      <div className='mt-1 flex items-center justify-around'>
        <div className='text-center'>
          <p className='text-green-500'>Items</p>
          <div className='mx-auto mt-1 h-1 w-32 bg-green-500'></div>
        </div>
        <div className='text-center'>
          <p className='text-gray-500'>Refund</p>
        </div>
      </div>
      <div className='p-3'>
        <div className='scrollbar-hide flex h-[26.5rem] flex-col gap-5 overflow-y-auto bg-white'>
          <EventItemList eventId={event?.id || 0} canModified={event?.can_modified || false} />
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
