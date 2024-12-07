import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'
import { FormInstance } from 'antd/lib'
import dayjs from 'dayjs'
import FormModal from 'src/components/common/FormModal'
import { useCategory } from 'src/contexts/category.context'
import { CategoryIcon } from 'src/shared/constant'
import { Currency, SpendingDetail } from 'src/types/spending.type'

const { Option } = Select

interface Props {
  title: string
  modalRef: any
  form: FormInstance
  formData?: SpendingDetail
  handleSubmit?: () => void
  handleCancel?: () => void
}

export default function TransactionForm({ title, modalRef, form, formData, handleSubmit, handleCancel }: Props) {
  const { categoryList } = useCategory()
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
        <Form.Item name='name' label='Name' initialValue={formData && formData.name} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='amount'
              label='Amount'
              initialValue={formData ? formData.amount : 0}
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                addonAfter={
                  <Form.Item name='currency' initialValue={formData ? formData.currency : Currency.VND} noStyle>
                    <Select style={{ width: 60 }}>
                      <Option value={Currency.VND}>đ</Option>
                      {/* <Option value={Currency.USD}>$</Option> */}
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='time'
              label='Date'
              initialValue={formData ? dayjs(formData.time) : dayjs()}
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name='type' label='Type' initialValue={formData && formData.type} rules={[{ required: true }]}>
              <Select
                style={{ width: '100%' }}
                options={[
                  { value: 'DEBIT', label: 'Debit' },
                  { value: 'CREDIT', label: 'Credit' },
                  { value: 'INCOME', label: 'Income' }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='category'
              label='Category'
              initialValue={formData && formData.category_id}
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: '100%' }}
                options={categoryList.map((cate) => ({
                  value: cate.id,
                  label: (
                    <span>
                      <FontAwesomeIcon
                        icon={CategoryIcon.find((item) => item.name === cate.icon)?.icon || faXmark}
                        size='lg'
                        className='mr-2'
                      />
                      {cate.name}
                    </span>
                  )
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
      </FormModal>
    </>
  )
}
