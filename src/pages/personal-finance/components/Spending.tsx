import { faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import { SpendingDetail } from 'src/types/spending.type'
import { convertCurrencyToSymbol, formatNumberWithLocale } from 'src/utils/tools'
import { IFormModalRef } from 'src/components/common/FormModal'
import { Form, FormInstance } from 'antd/lib'
import { CategoryIcon } from 'src/shared/constant'
import SpendingForm from './SpendingForm'

interface Props {
  spending: SpendingDetail
  onDeleteSpending: (spending: SpendingDetail) => void
  onUpdateSpending: (id: number, spending: SpendingDetail) => void
}

export default function Spending({ spending, onDeleteSpending, onUpdateSpending }: Props) {
  const [form] = Form.useForm()
  const modalRef = useRef<IFormModalRef>(null)

  const useFieldValue = (fieldName: string, form: FormInstance) => {
    return Form.useWatch(fieldName, form)
  }

  const newSpending = {
    id: Date.now(),
    name: useFieldValue('name', form),
    amount: useFieldValue('amount', form),
    currency: useFieldValue('currency', form),
    time: useFieldValue('time', form)?.format('YYYY-MM-DD'),
    type: useFieldValue('type', form),
    category_id: useFieldValue('category', form)
  }

  const handleUpdateSpending = () => {
    onUpdateSpending(spending.id, newSpending)
  }

  return (
    <li className='relative my-3 grid grid-cols-9 items-center rounded-2xl border-none bg-[#6ac6ff] p-5 text-lg'>
      <FontAwesomeIcon
        icon={CategoryIcon.find((item) => item.name === spending.category_icon)?.icon || faXmark}
        size='2x'
      />
      <span className='col-span-3 truncate text-xl font-bold'>{spending.name}</span>
      <span className='col-span-2 truncate text-center italic text-gray-500'>{spending.time.toLocaleString()}</span>
      <span className='col-span-2 truncate text-center font-bold'>
        {spending.type === 'INCOME' ? '+' : '-'}
        {`${formatNumberWithLocale(spending.amount)}${convertCurrencyToSymbol(spending.currency)}`}
      </span>
      <div className='flex items-center gap-4'>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className='hover:cursor-pointer'
          onClick={() => modalRef.current?.showModal()}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className='hover:cursor-pointer'
          onClick={() => onDeleteSpending(spending)}
        />
      </div>
      <SpendingForm
        title='Edit transaction'
        modalRef={modalRef}
        form={form}
        formData={spending}
        handleCancel={modalRef.current?.closeModal}
        handleSubmit={handleUpdateSpending}
      />
    </li>
  )
}
