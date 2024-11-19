import { faMinus, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputNumber, Select } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
import groupApi from 'src/apis/group.api'
import { useMembers } from 'src/contexts/member.context'
import { GroupSpending } from 'src/types/group.type'
import { Currency } from 'src/types/spending.type'
import { convertCurrencyToSymbol } from 'src/utils/tools'

interface Props {
  itemId: number
  spendings: GroupSpending[]
  canModified: boolean
  handleUpdateItemSpending: (id: number, updatedSpendings: GroupSpending[]) => void
}

interface SpendingError {
  member_id: string | null
  amount?: string | null
  price?: string | null
}

export default function ItemSpending({ itemId, spendings, canModified, handleUpdateItemSpending }: Props) {
  const { members } = useMembers()
  const [isEditing, setIsEditing] = useState(false)
  const [draftSpendings, setDraftSpendings] = useState([...spendings])
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isClickOnCreateText, setIsClickOnCreateText] = useState(false)
  const [errors, setErrors] = useState<SpendingError[]>([])

  const handleClickCreateText = () => {
    setIsClickOnCreateText(true)
    setDraftSpendings([...draftSpendings, { id: Date.now(), amount: 0, price: 0, currency: Currency.VND }])
    setIsEditing(true)
  }

  const handleClickUpdateButton = () => {
    setIsClickOnCreateText(false)
    setIsEditing(true)
  }

  const handleAddRow = () => {
    setDraftSpendings([...draftSpendings, { id: Date.now(), amount: 0, price: 0, currency: Currency.VND }])
  }

  const handleDeleteRow = (index: number) => {
    const updatedSpendings = draftSpendings.filter((_, i) => i !== index)
    setDraftSpendings(updatedSpendings)
  }

  const handleChangeCell = (index: number, key: string, value: any) => {
    const updatedSpendings = draftSpendings.map((spending, i) =>
      i === index ? { ...spending, [key]: value } : spending
    )

    setDraftSpendings(updatedSpendings)
  }

  const handleSubmit = () => {
    const newErrors = draftSpendings.map((spending) => ({
      member_id: spending.member_id ? null : 'Member is required'
    }))

    setErrors(newErrors)

    const isValid = newErrors.every((error) => Object.values(error).every((fieldError) => !fieldError))

    if (!isValid) {
      throw Error('Invalid fields')
    }

    const totalAmount = draftSpendings.reduce((acc, spending) => acc + (spending.amount || 0), 0)
    const totalPrice = draftSpendings.reduce((acc, spending) => acc + (spending.price || 0), 0)

    if (totalAmount !== totalPrice) {
      setGlobalError('Total paid amount must be equal to used amount')
      throw Error('Total paid amount must be equal to used amount')
    }
  }

  const handleCreateSubmit = async () => {
    try {
      if (draftSpendings.length === 0) {
        setGlobalError('Spending list must have at least 1 item')
        return
      }

      handleSubmit()

      const res = await groupApi.createItemSpending(itemId, draftSpendings)
      const data = res.data

      setDraftSpendings(data)
      setGlobalError(null)
      setIsEditing(false)
      handleUpdateItemSpending(itemId, data)
      toast.success('Create a spending list successfully')
    } catch (e: any) {
      //
    }
  }

  const handleUpdateSubmit = async () => {
    try {
      handleSubmit()

      const res = await groupApi.updateItemSpending(itemId, draftSpendings)
      const data = res.data

      setDraftSpendings(data)
      setGlobalError(null)
      setIsEditing(false)
      handleUpdateItemSpending(itemId, data)
      toast.success('Update a spending list successfully')
    } catch (e: any) {
      //
    }
  }

  const handleCancel = () => {
    setDraftSpendings([...spendings])
    setIsClickOnCreateText(false)
    setErrors([])
    setGlobalError(null)
    setIsEditing(false)
  }

  return (
    <div className='-mt-2 rounded-b-lg bg-blue-300 p-4 shadow-md'>
      {spendings.length > 0 || isClickOnCreateText ? (
        <>
          <div className='mb-3 flex items-center justify-between px-2'>
            <h2 className='text-xl font-bold text-gray-800'>Spending List</h2>
            {globalError && <span className='font-bold italic text-red-500'>{globalError}</span>}
            {!isEditing && (
              <button
                className='flex items-center gap-1 rounded border-none bg-blue-500 px-3 py-1 text-lg text-white shadow hover:cursor-pointer hover:bg-blue-600'
                onClick={handleClickUpdateButton}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>Update</span>
              </button>
            )}
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full table-auto border-collapse bg-white text-left text-sm text-gray-700 shadow-md'>
              <thead className='bg-blue-500 text-white'>
                <tr>
                  <th className='px-4 py-2'>#</th>
                  <th className='px-4 py-2'>Member</th>
                  <th className='px-4 py-2'>Paid amount</th>
                  <th className='px-4 py-2'>Used amount</th>
                  {isEditing && <th className='px-4 py-2'>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {draftSpendings.map((spending, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'} hover:bg-blue-200`}>
                    {/* Row Number */}
                    <td className='border px-4 py-2'>
                      <div>{index + 1}</div>
                    </td>

                    {/* Member Select */}
                    <td className='border px-4 py-2'>
                      <div className='flex items-center gap-3'>
                        {isEditing ? (
                          <>
                            <div className='flex flex-col'>
                              <Select
                                value={spending.member_id ? +spending.member_id : null}
                                style={{
                                  width: '100%',
                                  minWidth: 160,
                                  borderColor: errors[index]?.member_id ? 'red' : undefined
                                }}
                                options={members.map((member) => ({
                                  value: member.id,
                                  label: <span>{member.full_name}</span>
                                }))}
                                onChange={(value) => handleChangeCell(index, 'member_id', value)}
                              />
                              {errors[index]?.member_id && (
                                <span className='mt-1 text-xs text-red-500'>Member is required</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={spending.avatar}
                              alt={`${spending.full_name}'s avatar`}
                              className='h-10 w-10 rounded-full object-cover'
                            />
                            <span className='font-bold'>{spending.full_name}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Paid Amount */}
                    <td className='border px-4 py-2'>
                      <div className='flex flex-col'>
                        {isEditing ? (
                          <>
                            <InputNumber
                              value={spending.amount}
                              style={{
                                width: '100%'
                              }}
                              onChange={(value) => handleChangeCell(index, 'amount', value)}
                            />
                          </>
                        ) : (
                          <>
                            {spending.amount.toLocaleString()}
                            {convertCurrencyToSymbol(spending.currency)}
                          </>
                        )}
                      </div>
                    </td>

                    {/* Used Amount */}
                    <td className='border px-4 py-2'>
                      <div className='flex flex-col'>
                        {isEditing ? (
                          <>
                            <InputNumber
                              value={spending.price}
                              style={{
                                width: '100%'
                              }}
                              onChange={(value) => handleChangeCell(index, 'price', value)}
                            />
                          </>
                        ) : (
                          <>
                            {spending.price.toLocaleString()}
                            {convertCurrencyToSymbol(spending.currency)}
                          </>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    {isEditing && (
                      <td className='border px-4 py-2'>
                        <div className='flex justify-center '>
                          <button
                            className='flex h-6 w-6 items-center justify-center rounded-full border-none bg-red-500 text-white hover:cursor-pointer'
                            onClick={() => handleDeleteRow(index)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {isEditing && (
              <div className='mt-4 flex justify-between'>
                <button
                  className='rounded border-none bg-blue-500 px-4 py-2 text-white shadow hover:cursor-pointer hover:bg-blue-600'
                  onClick={handleAddRow}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add Row
                </button>
                <div className='flex gap-3'>
                  <button
                    className='rounded border-none bg-gray-500 px-4 py-2 text-white shadow hover:cursor-pointer hover:bg-gray-600'
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className='rounded border-none bg-blue-500 px-4 py-2 text-white shadow hover:cursor-pointer hover:bg-blue-600'
                    onClick={isClickOnCreateText ? handleCreateSubmit : handleUpdateSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <p className='p-2 text-lg'>
          No spending available.{' '}
          <button
            className='border-none bg-transparent p-0 text-lg font-bold italic text-blue-700 hover:cursor-pointer'
            onClick={handleClickCreateText}
          >
            Let&apos;s create a spending list!
          </button>
        </p>
      )}
    </div>
  )
}
