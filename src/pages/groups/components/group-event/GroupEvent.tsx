import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EventGroup } from 'src/types/group.type'

interface Props {
  event: EventGroup
  handleClick: () => void
}

export default function GroupEvent({ event, handleClick }: Props) {
  return (
    <div
      role='button'
      tabIndex={0}
      className='flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-indigo-100 to-blue-100 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-2xl'
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      <div>
        <h2 className='mb-4 text-2xl font-bold tracking-tight text-gray-800'>{event.name}</h2>
        <div className='flex gap-5'>
          <p className='italic text-gray-500'>Created at: {new Date(event.created_at).toLocaleString()}</p>
          {/* {event.updated_at && (
            <p className='italic text-gray-500'>Updated at: {new Date(event.updated_at).toLocaleString()}</p>
          )} */}
        </div>
      </div>
      <FontAwesomeIcon icon={faAngleRight} size='2x' />
    </div>
  )
}

// useEffect(() => {
//   const getItems = async () => {
//     const res = await groupApi.getAllItemsOfEvent(event.id)
//     const data = res.data
//     setItems(data['results'])
//     console.log(data['results'])
//   }
//   getItems()
// }, [event.id])
