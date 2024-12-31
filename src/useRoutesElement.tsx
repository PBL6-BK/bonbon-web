import { RouteObject, useRoutes } from 'react-router-dom'
import { AUTH_ROUTES, PRIVATE_ROUTES, DEFAULT_ROUTE } from './shared/path'

// component
import { Row, Spin } from 'antd'
import { Suspense, lazy } from 'react'
import { Route } from './interface/app'
import NotFoundPage from './pages/not-found'
import PrivateRoutes from './routes/PrivateRoutes'
import DefaultRoute from './routes/DefaultRoutes'
import { PATH_URL } from './constants/path'
import AuthRoutes from './routes/AuthRoutes'

interface RouteElement {
  routeElement: () => Promise<any>
  isPrivate?: boolean
}
interface LazyRouteProps {
  routes: Route[]
}
function LazyElement({ routeElement }: RouteElement) {
  const LazyComponent = lazy(routeElement)
  return (
    <Suspense
      fallback={
        <Row className='h-screen w-full'>
          <Spin size='large' className='m-auto' />
        </Row>
      }
    >
      <LazyComponent />
    </Suspense>
  )
}
function wrapRoutesWithLazy({ routes }: LazyRouteProps): RouteObject[] {
  return routes?.map((route: Route) => ({
    path: route.path,
    element: <LazyElement routeElement={route.element} />,
    ...(route.children && { children: wrapRoutesWithLazy({ routes: route.children }) })
  }))
}
export default function useRouteElements() {
  const routeElements = [
    {
      path: '*',
      element: <NotFoundPage />
    },
    {
      path: PATH_URL.home,
      element: <PrivateRoutes />,
      children: wrapRoutesWithLazy({ routes: PRIVATE_ROUTES })
    },
    {
      path: PATH_URL.auth,
      element: <AuthRoutes />,
      children: wrapRoutesWithLazy({ routes: AUTH_ROUTES })
    },
    {
      path: PATH_URL.faq,
      element: <DefaultRoute />,
      children: wrapRoutesWithLazy({ routes: DEFAULT_ROUTE })
    }
  ]
  return useRoutes(routeElements)
}
