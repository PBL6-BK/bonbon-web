import { DollarSignImg } from 'src/assets/images'
import { formatNumberWithLocale } from 'src/utils/tools'

export default function Balance({ balance }: { balance: number }) {
  return (
    <div className='group relative flex w-6/12 items-center justify-center rounded-2xl text-center'>
      <div className='relative'>
        <img src={DollarSignImg} alt='Balance' className='h-40 opacity-50' />
        <span className='absolute inset-0 flex items-center justify-center text-lg font-semibold text-black'>
          {formatNumberWithLocale(balance)}đ
        </span>
      </div>
      <div className='absolute bottom-3 mb-2 hidden w-max rounded-md bg-black px-3 py-1 text-xs font-medium text-white opacity-75 group-hover:flex'>
        Your balance
      </div>
    </div>
  )
}
