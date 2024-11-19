import { Image, Menu, MenuRef } from 'antd'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import Logo from 'public/logo.png'
import { SIDEBAR_OPTIONS } from 'src/shared/constant'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { PATH_URL } from 'src/constants/path'

interface PrivateLayoutSidebarProps {
  isCollapsed?: boolean
}

const PrivateLayoutSidebar: FC<PrivateLayoutSidebarProps> = ({ isCollapsed = false }) => {
  const [selectedKey, setSelectedKey] = useState<string>(
    (SIDEBAR_OPTIONS.find((_item) => location.pathname.startsWith(_item.path))?.key as string) || 'members'
  )

  const inputRef = useRef<MenuRef>(null)

  useEffect(() => {
    const input = inputRef.current
    if (input) {
      input.focus()
    }
    return () => {
      //
    }
  }, [])

  return (
    <>
      <div className='logo-container bg-white' style={{ textAlign: 'center', padding: isCollapsed ? '5px' : '9px' }}>
        {/* <Link to={PATH_URL.home}> */}
        <Link to={PATH_URL.personalFinance}>
          {!isCollapsed ? (
            <Image src={Logo} preview={false} />
          ) : (
            <div className='flex h-8 items-center justify-center'>
              <Icon icon='fa:bars' />
            </div>
          )}
        </Link>
      </div>
      <Menu
        className='flex w-full flex-col pt-12'
        ref={inputRef}
        mode='inline'
        defaultSelectedKeys={['members']}
        selectedKeys={[selectedKey]}
        style={{ height: '100%', borderRight: 0 }}
        items={SIDEBAR_OPTIONS.map((item) => ({
          ...item,
          label: <Link to={item.path}>{item.label}</Link>,
          icon: <Icon icon={item.icon} />
        }))}
      />
      {isCollapsed ? 'true' : 'false'}
    </>
  )
}

export default PrivateLayoutSidebar
