import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { set } from 'lodash'
import { useContext, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import groupApi from 'src/apis/group.api'
import ConfirmModal, { IConfirmModalRef } from 'src/components/common/ConfirmModal'
import { AppContextType, AppContext } from 'src/contexts/app.context'
import type { Refund } from 'src/types/group.type'
import { convertCurrencyToSymbol } from 'src/utils/tools'

interface Props {
  refund: Refund
}

export default function RefundDetail({ refund }: Props) {
  const { user } = useContext<AppContextType>(AppContext)

  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false)
  const [isTranfered, setIsTranfered] = useState(refund.is_transferred)
  const [isReceived, setIsReceived] = useState(refund.is_received)

  const confirmTransferModalRef = useRef<IConfirmModalRef>(null)
  const confirmReceiveModalRef = useRef<IConfirmModalRef>(null)

  const canClickTransfer = user?.id === refund.from_member.user_id && !isTranfered
  const canClickReceive = user?.id === refund.to_member.user_id && !isReceived

  const handleClickTransfer = async () => {
    if (!canClickTransfer) return

    await groupApi.updateTransfer(refund.id)
    setIsTranfered(true)
    toast.success('Transfer successfully')
  }

  const handleClickReceive = async () => {
    if (!canClickReceive) return
    await groupApi.confirmReceive(refund.id)
    setIsReceived(true)
    toast.success('Receive successfully')
  }

  return (
    <div className='mx-auto mb-5 max-w-lg rounded-lg bg-[#dde9ff] p-6 shadow-lg'>
      {/* Top Section */}
      <div className='mb-2 grid grid-cols-2 gap-4 border-b pb-4'>
        <div>
          <h3 className='mb-1 text-sm text-gray-500'>From</h3>
          <div className='flex items-center gap-2'>
            <img
              src={refund.from_member.avatar}
              alt={`${refund.from_member.full_name}'s avatar`}
              className='h-10 w-10 rounded-full object-cover'
            />
            <span className='truncate font-bold'>{refund.from_member.full_name}</span>
          </div>
        </div>
        <div>
          <h3 className='mb-1 text-sm text-gray-500'>To</h3>
          <div className='flex items-center gap-2'>
            <img
              src={refund.to_member.avatar}
              alt={`${refund.to_member.full_name}'s avatar`}
              className='h-10 w-10 rounded-full object-cover'
            />
            <span className='truncate font-bold'>{refund.to_member.full_name}</span>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className='mb-5 grid grid-cols-2 gap-4'>
        <div>
          <h3 className='text-sm text-gray-500'>Amount</h3>
          <p className='truncate text-lg font-semibold text-[#0040ff]'>
            {refund.amount.toLocaleString()}
            {convertCurrencyToSymbol(refund.currency)}
          </p>
        </div>
        <div>
          <h3 className='text-sm text-gray-500'>Date</h3>
          <p className='truncate text-lg font-semibold'>{new Date(refund.created_at).toLocaleString()}</p>
        </div>
      </div>

      {/* Status Section */}
      <div className='grid grid-cols-2 gap-4'>
        {/* Transferred */}
        <div className='flex items-center space-x-3'>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              canClickTransfer ? 'hover:cursor-pointer' : ''
            }
              ${isTranfered ? 'bg-[#48baff] text-white' : 'bg-[#e6f4ff] text-gray-500'}`}
            role='button'
            tabIndex={0}
            onClick={() => {
              if (canClickTransfer) {
                confirmTransferModalRef.current?.showModal()
              } else {
                toast.warning('You cannot transfer this refund')
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (canClickTransfer) {
                  confirmTransferModalRef.current?.showModal()
                } else {
                  toast.warning('You cannot transfer this refund')
                }
              }
            }}
          >
            {isTranfered && <FontAwesomeIcon icon={faCheck} size='lg' />}
          </div>
          <p className='truncate text-sm'>Transferred</p>
          <ConfirmModal title='Confirm transfer' ref={confirmTransferModalRef} onOk={handleClickTransfer} />
        </div>

        {/* Received */}
        <div className='flex items-center space-x-3'>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              canClickReceive ? 'hover:cursor-pointer' : ''
            }
              ${isReceived ? 'bg-[#4e9cff] text-white' : 'bg-[#e6f4ff] text-gray-500'}`}
            role='button'
            tabIndex={0}
            onClick={() => {
              if (canClickReceive) {
                confirmReceiveModalRef.current?.showModal()
              } else {
                toast.warning('You cannot receive this refund')
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (canClickReceive) {
                  confirmReceiveModalRef.current?.showModal()
                } else {
                  toast.warning('You cannot receive this refund')
                }
              }
            }}
          >
            {isReceived && <FontAwesomeIcon icon={faCheck} size='lg' />}
          </div>
          <p className='truncate text-sm'>Received</p>
          <ConfirmModal title='Confirm receive' ref={confirmReceiveModalRef} onOk={handleClickReceive} />
        </div>
      </div>
      <div className='mt-6'>
        <button
          onClick={() => setIsQRCodeVisible(!isQRCodeVisible)}
          className='w-full rounded-lg border-none bg-[#4e9cff] py-2 text-white hover:cursor-pointer hover:bg-blue-600'
        >
          {isQRCodeVisible ? 'Hide QR Code' : 'Show QR Code'}
        </button>

        {isQRCodeVisible && (
          <div className='mt-4 flex justify-center'>
            <img
              src={`https://img.vietqr.io/image/${refund.to_member.bank_name}-${refund.to_member.bank_account}-print.jpg?amount=${refund.amount}`}
              alt='your QR'
              className='h-90 w-80'
            ></img>
          </div>
        )}
      </div>
    </div>
  )
}
