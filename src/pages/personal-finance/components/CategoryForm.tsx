import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { FormInstance } from 'antd/lib'
import { useEffect } from 'react'
import FormModal from 'src/components/common/FormModal'
import { CATEGORY_NAME, CategoryIcon } from 'src/shared/constant'
import { CategoryDetail } from 'src/types/category.type'
import { formatNumberWithLocale } from 'src/utils/tools'

interface Props {
  title: string
  modalRef: any
  income?: number
  categoryList: CategoryDetail[]
  form: FormInstance
  formData?: CategoryDetail
  handleSubmit?: () => void
  handleCancel?: () => void
}

export default function CategoryForm({
  title,
  modalRef,
  income,
  categoryList,
  form,
  formData,
  handleSubmit,
  handleCancel
}: Props) {
  const categoryNames = categoryList?.map((category) => category.name)
  const missingCategories = CATEGORY_NAME.filter((category) => !categoryNames?.includes(category))
  const initialIncome = income || 0

  const handlePercentageChange = (percentage: number | null) => {
    if (percentage) {
      const amount = (percentage * initialIncome) / 100
      console.log(amount)
      form.setFieldsValue({ amount: formatNumberWithLocale(amount) })
    }
  }

  useEffect(() => {
    if (formData && formData.percentage) {
      const initialAmount = (formData.percentage * initialIncome) / 100
      form.setFieldsValue({ amount: formatNumberWithLocale(initialAmount) })
    }
  }, [formData, initialIncome, form])

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
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item name='name' label='Name' initialValue={formData && formData.name} rules={[{ required: true }]}>
              <Select
                style={{ width: '100%' }}
                options={missingCategories.map((cate) => ({
                  value: cate
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name='icon'
              label='Icon'
              rules={[{ required: true }]}
              initialValue={formData ? formData.icon : null}
            >
              <Select
                style={{ width: '100%' }}
                options={CategoryIcon.map((cateIcon) => ({
                  value: cateIcon.name,
                  label: <FontAwesomeIcon icon={cateIcon.icon} size='lg' />
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name='percentage'
              label='Percentage'
              initialValue={formData ? formData.percentage : 0}
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                max={100}
                style={{ width: '100%' }}
                addonAfter='%'
                onChange={handlePercentageChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='amount'
              label='Amount'
              initialValue={formatNumberWithLocale(formData ? (formData.percentage * initialIncome) / 100 : 0)}
            >
              <Input style={{ width: '100%' }} addonAfter='đ' disabled />
            </Form.Item>
          </Col>
        </Row>
      </FormModal>
    </>
  )
}
