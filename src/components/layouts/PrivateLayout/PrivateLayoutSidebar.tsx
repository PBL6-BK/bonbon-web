import { Menu } from 'antd'
import { FC } from 'react'
import { SIDEBAR_OPTIONS } from 'src/shared/constant'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { PATH_URL } from 'src/constants/path'
import { LogoImg } from 'src/assets/images'

interface PrivateLayoutSidebarProps {
  isCollapsed?: boolean
}

const PrivateLayoutSidebar: FC<PrivateLayoutSidebarProps> = ({ isCollapsed = false }) => {
  return (
    <>
      <div className='logo-container bg-black' style={{ textAlign: 'center', padding: isCollapsed ? '5px' : '9px' }}>
        <Link to={PATH_URL.personalFinance}>
          <img src={LogoImg} alt='Bonni' className='h-20 w-20 rounded-full' />

          {/* {!isCollapsed ? (
            <Image src={LoginImg} preview={false} />
          ) : (
            <div className='flex h-8 items-center justify-center'>
              <Icon icon='fa:bars' />
            </div>
          )} */}
        </Link>
      </div>
      <Menu className='flex w-full flex-col pt-12' mode='inline' style={{ height: '100%', borderRight: 0 }}>
        {SIDEBAR_OPTIONS.map((item) => (
          <Menu.Item key={item.key} icon={<Icon icon={item.icon} />}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
      {isCollapsed ? 'true' : 'false'}
    </>
  )
}

export default PrivateLayoutSidebar
