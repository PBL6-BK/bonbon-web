import { SpendingDetail } from 'src/types/spending.type'
import spendingApi from 'src/apis/spending.api'
import { toast } from 'react-toastify'
import { Form, FormInstance, Select } from 'antd'
import Spending from './Spending'
import { useRef } from 'react'
import { IFormModalRef } from 'src/components/common/FormModal'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CategoryIcon } from 'src/shared/constant'
import SpendingForm from './SpendingForm'
import { useCategory } from 'src/contexts/category.context'
import { OrbitProgress } from 'react-loading-indicators'

export interface FilterType {
  time: string
  categoryId: number
}

interface Props {
  spendingList: SpendingDetail[]
  onAddSpending: (spending: SpendingDetail) => void
  onUpdateSpending: (spending: SpendingDetail) => void
  onDeleteSpending: (spending: SpendingDetail) => void
  onFilterSpending: (filter: FilterType) => void
  isLoading: boolean
}

export default function SpendingList({
  spendingList,
  onAddSpending,
  onUpdateSpending,
  onDeleteSpending,
  onFilterSpending,
  isLoading
}: Props) {
  const { categoryList, reloadCategories } = useCategory()
  const modalRef = useRef<IFormModalRef>(null)
  const [addForm] = Form.useForm()
  const [filterForm] = Form.useForm()

  const useFieldValue = (fieldName: string, form: FormInstance) => {
    return Form.useWatch(fieldName, form)
  }

  const spending: SpendingDetail = {
    id: Date.now(),
    name: useFieldValue('name', addForm),
    amount: useFieldValue('amount', addForm),
    currency: useFieldValue('currency', addForm),
    time: useFieldValue('time', addForm)?.format('YYYY-MM-DD'),
    type: useFieldValue('type', addForm),
    category_id: useFieldValue('category', addForm)
  }

  const filterValue = {
    time: useFieldValue('time', filterForm),
    categoryId: useFieldValue('category', filterForm)
  }

  const handleAddSpending = async () => {
    const res = await spendingApi.createSpending(spending)
    const data = res.data
    onAddSpending(data)
    reloadCategories()
    toast.success('Add transaction successfully')
  }

  const handleDeleteSpendingList = async (spending: SpendingDetail) => {
    await spendingApi.deleteSpending(spending.id)
    onDeleteSpending(spending)
    reloadCategories()
    toast.success('Delete spending successfully')
  }

  const handleUpdateSpending = async (id: number, spending: SpendingDetail) => {
    const res = await spendingApi.updateSpending(id, spending)
    onUpdateSpending(res.data)
    reloadCategories()
    toast.success('Update spending successfully')
  }

  return (
    <>
      <div className='flex justify-between gap-3'>
        <h2>Transactions</h2>
        <div className='flex items-center gap-3'>
          <button
            className='text-md rounded border-none bg-green-400 p-2 font-bold text-black hover:cursor-pointer hover:bg-green-500'
            onClick={() => modalRef.current?.showModal()}
          >
            + Add transaction
          </button>
          <Form layout='inline' form={filterForm}>
            <Form.Item name='time' initialValue={'This month'}>
              <Select
                onChange={(value) => onFilterSpending({ time: value, categoryId: filterValue.categoryId })}
                style={{ width: 120, alignItems: 'end' }}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'This week', label: 'This week' },
                  { value: 'This month', label: 'This month' },
                  { value: 'This year', label: 'This year' }
                ]}
              />
            </Form.Item>
            <Form.Item name='category' initialValue={0}>
              <Select
                onChange={(value) => onFilterSpending({ time: filterValue.time, categoryId: value })}
                style={{ width: 160, alignItems: 'end' }}
                options={[
                  { value: 0, label: 'All' },
                  ...categoryList.map((cate) => ({
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
                  }))
                ]}
              />
            </Form.Item>
          </Form>
          <SpendingForm
            modalRef={modalRef}
            form={addForm}
            title='Add transaction'
            handleCancel={modalRef.current?.closeModal}
            handleSubmit={handleAddSpending}
          />
        </div>
      </div>
      <ul className='scrollbar-hide m-1 flex h-full w-full flex-col overflow-y-auto rounded-2xl border-none bg-zinc-300 p-5'>
        {!isLoading &&
          spendingList.map((spending: SpendingDetail) => (
            <Spending
              spending={spending}
              key={spending.id}
              onDeleteSpending={handleDeleteSpendingList}
              onUpdateSpending={handleUpdateSpending}
            />
          ))}
        {isLoading && (
          <div className='flex h-full w-full items-center justify-center'>
            <OrbitProgress color='#32cd32' size='medium' text='' textColor='' />
          </div>
        )}
      </ul>
    </>
  )
}
