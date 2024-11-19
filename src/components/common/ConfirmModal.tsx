import { Modal, ModalFuncProps } from 'antd'
import { forwardRef, useImperativeHandle, useState } from 'react'

interface Props {
  title?: string
  onOk?: () => void
  onCancel?: () => void
  onDelete?: () => void
  onEdit?: () => void
  deleteAction?: ModalFuncProps
}

export interface IConfirmModalRef {
  showModal: () => void
}

function ConfirmModal({ title, onOk, onCancel }: Props, ref: React.Ref<IConfirmModalRef>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    onOk && onOk()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    onCancel && onCancel()
    setIsModalOpen(false)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal: showModal
      }
    },
    []
  )

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='Confirm'
      cancelText='Cancel'
    >
      <p>Are you sure you want to perform this action?</p>
    </Modal>
  )
}

export default forwardRef(ConfirmModal)

// interface Props {
//   onEdit?: () => void
//   onDelete?: () => void
//   deleteAction?: ModalFuncProps
// }

// function FormAction({ onEdit, onDelete, deleteAction }: Props) {
//   const [modal, contextHolder] = Modal.useModal()

//   const handleDelete = () => {
//     modal.confirm({
//       cancelText: deleteAction?.cancelText ?? 'Cancel',
//       centered: true,
//       content: deleteAction?.content ?? 'Are you sure you want to delete this item?',
//       icon: deleteAction?.icon,
//       okText: deleteAction?.okText ?? 'Delete',
//       onOk: onDelete,
//       title: deleteAction?.title ?? 'Delete Item'
//     })
//   }

//   return (
//     <Space className='flex items-center' size={14}>
//       {onEdit && <EditOutlined name='edit' onClick={onEdit} />}
//       {onDelete && <DeleteOutlined name='ic-delete' onClick={handleDelete} />}
//       {contextHolder}
//     </Space>
//   )
// }

// export default FormAction
