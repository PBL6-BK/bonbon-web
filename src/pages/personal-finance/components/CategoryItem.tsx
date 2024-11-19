import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

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
    <div className='mb-5 flex shrink-0 grow-0 basis-1/3 flex-col items-center gap-1'>
      <div
        className='relative flex h-16 w-16 items-center justify-center rounded-full bg-white hover:cursor-pointer'
        onMouseEnter={toggleMenu}
        onMouseLeave={toggleMenu}
      >
        <FontAwesomeIcon icon={CategoryIcon.find((item) => item.name === category.icon)?.icon || faXmark} size='2x' />

        {/* Liquid wave effect */}
        <div className='absolute inset-0 flex items-end overflow-hidden rounded-full'>
          <div
            className={`absolute w-full ${progressColor}`}
            style={{
              height: `${usedPercentage}%`,
              opacity: 0.4
            }}
          />
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
        {isMenuOpen && (
          <div
            className='absolute right-0 top-5 z-10 mt-2 w-28 rounded-md bg-white p-2 shadow-lg'
            role='menu'
            tabIndex={0}
          >
            <ul>
              <li className='cursor-pointer p-2 hover:bg-gray-200'>
                <button
                  className='w-full cursor-pointer border-none bg-inherit text-left text-xl'
                  onClick={() => modalRef.current?.showModal()}
                >
                  Edit
                </button>
              </li>
              <li className='cursor-pointer p-2 hover:bg-gray-200'>
                <button className='cursor-pointer border-none bg-inherit text-xl'>Delete</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Category details */}
      <div className='flex flex-col items-center'>
        <span className='text-md font-bold'>{category.name}</span>
        <span className='text-md text-gray-500'>
          {parseFloat(spendingAmount.toFixed(2))}/{parseFloat(maxSpendingAmount.toFixed(2))}
        </span>
      </div>
    </div>
  )
}
