import { useEffect, useRef } from 'react'
import { Form, Input, InputNumber, Button, Select, Row, Col } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import settingsApi from 'src/apis/settings.api'
import { BANK_LIST, CategoryIcon } from 'src/shared/constant'
import { Currency } from 'src/types/spending.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CategoryDetail } from 'src/types/category.type'
import categoryApi from 'src/apis/category.api'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

const { Option } = Select

const SettingsPage = () => {
  const [form] = Form.useForm()
  const categoryList = useRef<CategoryDetail[]>([])

  const handleSaveSettings = async () => {
    const formValue = form.getFieldsValue()

    await Promise.all([
      settingsApi.updateUserBanking({
        bank_account: formValue.bankAccount,
        bank_name: formValue.bankName
      }),
      settingsApi.updateFixedIncome(formValue.fixedIncome),
      settingsApi.createFixedOutcome(formValue.fixedOutcome)
    ])
    toast.success('Settings saved successfully')
  }

  useEffect(() => {
    const getPersonalFinance = async () => {
      const res = await settingsApi.getPersonalFinance()
      const data = res.data
      form.setFieldsValue({
        fixedIncome: data?.fixed_income,
        incomeCurrency: data?.currency
      })
    }
    getPersonalFinance()
  }, [])

  useEffect(() => {
    const getBanking = async () => {
      const res = await settingsApi.getBankingInfomation()
      const data = res.data
      form.setFieldsValue({
        bankAccount: data?.bank_account,
        bankName: data?.bank_name
      })
    }
    getBanking()
  }, [])

  useEffect(() => {
    const getFixedOutcome = async () => {
      const res = await settingsApi.getFixedOutcome()
      const data = res.data
      form.setFieldsValue({
        fixedOutcome: data['results'] || []
      })
    }
    getFixedOutcome()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryApi.getAllCategories()
      const data = response.data
      categoryList.current = data['results']
    }
    fetchCategories()
  }, [])

  return (
    <div className='scrollbar-hide mx-auto h-[35.5rem] max-w-4xl overflow-auto rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-4 text-xl font-bold'>Settings</h2>
      <Form
        form={form}
        layout='vertical'
        onFinish={handleSaveSettings}
        initialValues={{
          fixedOutcome: []
        }}
      >
        {/* Fixed Income */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Fixed Income'
              name='fixedIncome'
              // rules={[{ required: true, message: 'Please enter fixed income' }]}
            >
              <InputNumber
                min={0}
                className='w-full'
                placeholder='Enter fixed income'
                addonAfter={
                  <Form.Item name='incomeCurrency' noStyle>
                    <Select style={{ width: 60 }}>
                      <Option value={Currency.VND}>đ</Option>
                    </Select>
                  </Form.Item>
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label='Bank Account'
              name='bankAccount'
              // rules={[{ required: true, message: 'Please enter your bank account' }]}
            >
              <Input placeholder='Enter bank account' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label='Bank Name'
              name='bankName'
              // rules={[{ required: true, message: 'Please enter your bank name' }]}
            >
              <Select
                style={{ width: '100%' }}
                options={BANK_LIST.map((bank) => ({
                  value: bank.shortName,
                  label: `${bank.name} (${bank.shortName})`
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.List name='fixedOutcome'>
          {(fields, { add, remove }) => (
            <>
              <p className='mb-2 block text-sm font-medium text-gray-700'>Fixed Outcome</p>
              {fields.map(({ key, name, ...restField }) => (
                <div key={key} className='flex w-full items-baseline gap-4'>
                  {/* Outcome Name */}
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Please enter outcome name' }]}
                    className='flex-1'
                  >
                    <Input placeholder='Outcome Name' />
                  </Form.Item>

                  {/* Outcome Amount */}
                  <Form.Item
                    {...restField}
                    name={[name, 'amount']}
                    rules={[{ required: true, message: 'Please enter outcome amount' }]}
                    className='flex-1'
                  >
                    <InputNumber min={0} className='w-full' placeholder='Outcome Amount' />
                  </Form.Item>

                  {/* Outcome Currency */}
                  <Form.Item
                    {...restField}
                    name={[name, 'currency']}
                    rules={[{ required: true, message: 'Please select currency' }]}
                    className='flex-1'
                  >
                    <Select placeholder='Select currency'>
                      <Select.Option value={Currency.VND}>đ</Select.Option>
                    </Select>
                  </Form.Item>

                  {/* Outcome Category */}
                  <Form.Item
                    {...restField}
                    name={[name, 'category_id']}
                    rules={[{ required: true, message: 'Please enter a category' }]}
                    className='flex-1'
                  >
                    <Select
                      style={{ width: '100%' }}
                      options={categoryList.current?.map((cate) => ({
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

                  {/* Remove Button */}
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    style={{ color: 'red', fontSize: '16px', cursor: 'pointer' }}
                  />
                </div>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />} className='w-full'>
                  Add Outcome
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Submit Button */}
        <Form.Item>
          <Button type='primary' htmlType='submit' className='w-full'>
            Save Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SettingsPage
