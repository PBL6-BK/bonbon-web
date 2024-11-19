import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { PATH_URL } from 'src/constants/path'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import DefaultLayout from 'src/components/layouts/DefaultLayout'

function AuthRoutes() {
  console.log('Render AuthRoutes')
  const { isAuthenticated } = useContext<AppContextType>(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATH_URL.personalFinance)
    }
  }, [isAuthenticated])

  if (isAuthenticated) {
    return null
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default AuthRoutes
