import { Form, Input } from 'antd'
import { FormInstance } from 'antd/lib'
import FormModal from 'src/components/common/FormModal'
import { EventGroup, EventItem } from 'src/types/group.type'

interface Props {
  title: string
  modalRef: any
  form: FormInstance
  formData?: EventGroup | EventItem
  handleSubmit?: () => void
  handleCancel?: () => void
}

export default function GroupEventForm({ title, modalRef, form, formData, handleSubmit, handleCancel }: Props) {
  return (
    <>
      <FormModal
        ref={modalRef}
        title={title}
        okText='OK'
        cancelText='Cancel'
        form={form}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      >
        <Form.Item
          name='name'
          label='Name'
          initialValue={formData && formData.name}
          rules={[
            { required: true, message: 'Name is required' },
            { max: 30, message: 'Name cannot exceed 30 characters' }
          ]}
        >
          <Input maxLength={30} />
        </Form.Item>
      </FormModal>
    </>
  )
}
