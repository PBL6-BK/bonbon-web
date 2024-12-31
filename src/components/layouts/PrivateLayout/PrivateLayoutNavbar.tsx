import { Button, Image } from 'antd'
import { FC, useContext } from 'react'
import { Icon } from '@iconify/react'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'
import { USER_DROPDOWN_OPTIONS, UserOptions } from 'src/shared/constant'
import { useNavigate } from 'react-router-dom'
import { PATH_URL } from 'src/constants/path'

const PrivateLayoutNavbar = () => {
  // get user from context
  const { user } = useContext<AppContextType>(AppContext)

  return (
    <>
      <div className='flex w-full justify-between bg-[#48baff] px-8 py-5'>
        <div></div>
        <UserAvatar
          fullName={user?.fullName || user?.email || 'Guest'}
          avatar={user?.avatar || 'https://placehold.co/400x400?text=Guest'}
        />
      </div>
    </>
  )
}

type UserAvatarProps = {
  fullName: string
  avatar: string
}

const UserAvatar: FC<UserAvatarProps> = ({ fullName, avatar }) => {
  const { setIsAuthenticated, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  const handleUserDropdownClick = (title: string) => {
    if (title === 'Logout') {
      handleLogout()
    } else if (title === 'Settings') {
      navigate(PATH_URL.settings)
    } else if (title === 'Q&A') {
      navigate(PATH_URL.faq)
    }
  }

  const handleLogout = () => {
    clearLS()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <div className='group relative z-50'>
      <div className='flex items-center justify-center gap-3'>
        <p className='avatar-greet'>
          <span className='text-lg'>Hello, </span>
          <span className='text-lg font-semibold'>{fullName}</span>
        </p>
        <div className='avatar-wrapper h-12 w-12 overflow-hidden rounded-full'>
          <Image
            width={'100%'}
            height={'100%'}
            className='cursor-pointer object-cover transition-all ease-in hover:scale-[120%]'
            src={avatar}
            alt='#'
            preview={false}
          />
        </div>
      </div>

      <div className='avatar-menu pointer-events-none absolute right-0 bg-white p-4 opacity-0 shadow-lg group-hover:pointer-events-auto group-hover:opacity-100'>
        <ul>
          {USER_DROPDOWN_OPTIONS.map((option: UserOptions) => (
            <li key={option.title} className='flex gap-2 p-2 hover:bg-gray-100'>
              <Button onClick={() => handleUserDropdownClick(option.title)} className='w-full text-start'>
                <Icon icon={option.icon} />
                {option.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PrivateLayoutNavbar
