import { Layout, Menu, MenuRef } from 'antd'
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactWithChild } from 'src/interface/app'
import { SIDEBAR_OPTIONS } from 'src/shared/constant'
import { useResponsive } from 'src/shared/hook'
import PrivateLayoutNavbar from './PrivateLayoutNavbar'
import { Icon } from '@iconify/react'
import { LogoImg } from 'src/assets/images'
import { PATH_URL } from 'src/constants/path'

export default function PrivateLayout({ children }: ReactWithChild) {
  const location = useLocation()
  const { isDesktop } = useResponsive()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string>(
    (SIDEBAR_OPTIONS.find((_item) => location.pathname.startsWith(_item.path))?.key as string) || 'personal-finance'
  )

  useEffect(() => {
    setIsCollapsed(!isDesktop)
  }, [isDesktop])

  useEffect(() => {
    const key = SIDEBAR_OPTIONS.find((_item) => location.pathname.startsWith(_item.path))?.key as string
    if (key) setSelectedKey(key)
  }, [location])

  const inputRef = useRef<MenuRef>(null)

  useEffect(() => {
    const input = inputRef.current
    if (input) {
      input.focus()
    }
  }, [])

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Layout.Sider width={260} collapsed={isCollapsed} collapsedWidth={60}>
          <div
            className='logo-container bg-white'
            style={{ textAlign: 'center', padding: isCollapsed ? '4px' : '8px' }}
          >
            <Link to={PATH_URL.personalFinance}>
              <img src={LogoImg} alt='BonBon logo' className='h-32 w-32' />

              {/* {!isCollapsed ? (
            <Image src={LoginImg} preview={false} />
          ) : (
            <div className='flex h-8 items-center justify-center'>
              <Icon icon='fa:bars' />
            </div>
          )} */}
            </Link>
          </div>
          <Menu
            className='pt-12'
            ref={inputRef}
            mode='inline'
            defaultSelectedKeys={['personal-finance']}
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0, fontSize: 20 }}
            items={SIDEBAR_OPTIONS.map((item) => ({
              ...item,
              label: <Link to={item.path}>{item.label}</Link>,
              icon: <Icon icon={item.icon} />
            }))}
          />
        </Layout.Sider>
        <Layout>
          <Layout.Content style={{ margin: 0, minHeight: 280 }}>
            <PrivateLayoutNavbar />
            <ContentWrapper>{children}</ContentWrapper>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className='p-4'>{children}</div>
}
