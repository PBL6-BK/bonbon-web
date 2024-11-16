import { useNavigate } from 'react-router-dom'
import { PATH_URL } from 'src/constants/path'
import { Group } from 'src/types/group.type'
import { convertCurrencyToSymbol } from 'src/utils/tools'

interface Props {
  group: Group
  backgroundColor: string
}

export default function GroupItem({ group, backgroundColor }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(PATH_URL.groups + '/' + group.id, { state: { name: group.name, currency: group.currency } })
  }

  return (
    <div
      role='button'
      tabIndex={0}
      className={`flex h-36 w-[calc(25%-1rem)] flex-col items-center rounded-2xl bg-gray-300 p-4 hover:cursor-pointer ${backgroundColor}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      <h2 className='mb-2 text-xl'>{group.name}</h2>
      <div className='flex w-full items-center justify-between gap-5'>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-1 text-sm'>
            <p className='grow'>Total spend:</p>
            <p>
              {group.total_spent} {convertCurrencyToSymbol(group.currency)}
            </p>
          </div>
          <div className='flex gap-1 text-sm'>
            <p className='grow'>Total members:</p>
            <p>{group.total_members}</p>
          </div>
          <div className='flex items-center gap-3'>
            <p>Created by: </p>
            <div
              className='h-8 w-8 rounded-full bg-green-400'
              style={{
                backgroundImage: `url(${group.members[0].avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
        </div>
        <div className='flex justify-center'>
          {group.members && group.members.length <= 4 ? (
            group.members.map((mem) => (
              <div
                key={mem.id}
                className='-ml-3 h-9 w-9 rounded-full bg-green-400'
                style={{
                  backgroundImage: `url(${mem.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            ))
          ) : (
            <>
              {group.members.slice(0, 3).map((mem) => (
                <div
                  key={mem.id}
                  className='-ml-3 h-9 w-9 rounded-full bg-green-400'
                  style={{
                    backgroundImage: `url(${mem.avatar})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              ))}
              <div className='-ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-gray-400 text-sm text-white'>
                +{group.members.length - 3}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
