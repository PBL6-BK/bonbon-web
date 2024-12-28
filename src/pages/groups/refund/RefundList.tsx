import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import groupApi from 'src/apis/group.api'
import type { Refund } from 'src/types/group.type'
import RefundDetail from './Refund'
import { toast } from 'react-toastify'
import { OrbitProgress } from 'react-loading-indicators'

interface Props {
  eventId: number
}
export default function RefundList({ eventId }: Props) {
  const [refundList, setRefundList] = useState<Refund[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const hanldeUpdateRefund = async () => {
    const res = await groupApi.createRefundList(eventId)
    const data = res.data
    setRefundList(data)
    toast.success('Update refund list successfully')
  }

  useEffect(() => {
    const getRefunds = async () => {
      setIsLoading(true)
      try {
        const res = await groupApi.getRefundList(eventId)
        const data = res.data
        setRefundList(data['results'])
      } finally {
        setIsLoading(false)
      }
    }
    getRefunds()
  }, [eventId])

  return (
    <div className='h-full min-h-fit w-full bg-white p-4'>
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <OrbitProgress color='#1da1f2' size='medium' text='' textColor='' />
        </div>
      ) : refundList.length > 0 ? (
        <>
          <div className='mb-3 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-800'>Refund list</h2>
            <button
              className='flex items-center gap-1 rounded border-none bg-[#4e9cff] px-3 py-1 text-lg text-white shadow hover:cursor-pointer hover:bg-blue-600'
              onClick={hanldeUpdateRefund}
            >
              <FontAwesomeIcon icon={faRetweet} />
              <span>Update</span>
            </button>
          </div>
          <div className='overflow-x-auto'>
            {refundList.map((refund) => (
              <RefundDetail key={refund.id} refund={refund} />
            ))}
          </div>
        </>
      ) : (
        <p className='p-2 text-center text-lg '>
          No refund available.{' '}
          <button
            className='border-none bg-transparent p-0 text-lg font-bold italic text-blue-700 hover:cursor-pointer'
            onClick={hanldeUpdateRefund}
          >
            Let&apos;s create a refund list!
          </button>
        </p>
      )}
    </div>
  )
}
