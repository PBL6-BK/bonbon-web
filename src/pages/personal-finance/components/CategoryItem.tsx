import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { CategoryIcon } from 'src/shared/constant'
import { CategoryDetail } from 'src/types/category.type'
import CategoryForm from './CategoryForm'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form, FormInstance } from 'antd'

interface Props {
  category: CategoryDetail
  categoryList: CategoryDetail[]
  income: number
  onUpdateCategory: (id: number, category: CategoryDetail) => void
}

export default function CategoryItem({ category, categoryList, income, onUpdateCategory }: Props) {
  const modalRef = useRef<IFormModalRef>(null)
  const [editForm] = Form.useForm()

  const spendingAmount = category.used_amount ? category.used_amount : 0
  const maxSpendingAmount = (category.percentage * income) / 100
  const usedPercentage =
    maxSpendingAmount === 0 ? (spendingAmount > 0 ? 101 : 0) : (spendingAmount / maxSpendingAmount) * 100

  const progressColor =
    usedPercentage >= 80 && usedPercentage <= 100
      ? 'bg-amber-600'
      : usedPercentage > 100
      ? 'bg-red-600'
      : 'bg-green-600'

  const useFieldValue = (fieldName: string, form: FormInstance) => {
    return Form.useWatch(fieldName, form)
  }

  const updatedCategory = {
    id: Date.now(),
    name: useFieldValue('name', editForm),
    percentage: useFieldValue('percentage', editForm),
    icon: useFieldValue('icon', editForm)
  }

  const handleUpdateCategory = () => {
    onUpdateCategory(category.id, updatedCategory)
  }

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        className='mb-5 flex shrink-0 grow-0 basis-1/3 flex-col items-center gap-1 hover:scale-110 hover:cursor-pointer'
        onClick={() => modalRef.current?.showModal()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            modalRef.current?.showModal()
          }
        }}
      >
        <div className='relative flex h-16 w-16 items-center justify-center rounded-full bg-white'>
          <FontAwesomeIcon icon={CategoryIcon.find((item) => item.name === category.icon)?.icon || faXmark} size='2x' />
          <div className='absolute inset-0 flex items-end overflow-hidden rounded-full'>
            <div
              className={`absolute w-full ${progressColor}`}
              style={{
                height: `${usedPercentage}%`,
                opacity: 0.4
              }}
            />
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <span className='text-md font-bold'>{category.name}</span>
          <span className='text-md text-gray-500'>
            {parseFloat(spendingAmount.toFixed(2)).toLocaleString()}/
            {parseFloat(maxSpendingAmount.toFixed(2)).toLocaleString()}
          </span>
        </div>
      </div>
      <CategoryForm
        modalRef={modalRef}
        form={editForm}
        categoryList={categoryList}
        formData={category}
        income={income}
        title='Edit category'
        handleCancel={modalRef.current?.closeModal}
        handleSubmit={handleUpdateCategory}
      />
    </>
  )
}
