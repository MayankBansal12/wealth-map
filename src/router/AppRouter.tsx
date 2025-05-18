// import AuthGuard from '@/components/auth-protect/AuthGuard'
import CheckToken from '@/components/auth-protect/CheckToken'
import Auth from '@/pages/auth'
import PageNotFound from '@/pages/page-not-found'
import ResetPassword from '@/pages/ResetPassword'
import Analytics2 from '@/pages/v2/analytics2'
import Auth2 from '@/pages/v2/auth2'
import Dashboard2 from '@/pages/v2/dashboard2'
import Landing from '@/pages/v2/landing2'
import Members2 from '@/pages/v2/member2'
import Wrapper from '@/pages/v2/wrapper2'
import { createBrowserRouter } from 'react-router-dom'

export default createBrowserRouter([
  {
    element: <CheckToken />,
    children: [
      {
        path: '/auth',
        element: <Auth />,
      },
      {
        path: '/reset-pass',
        element: <ResetPassword />,
      },
    ],
  },
  {
    // uncomment this when authentication is connected and working to enable protected routes
    // element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/auth/:authType/:id?',
        element: <Auth2 />,
      },
      {
        path: '/dashboard',
        element: (
          <Wrapper>
            <Dashboard2 />
          </Wrapper>
        ),
      },
      {
        path: '/members',
        element: (
          <Wrapper>
            <Members2 />
          </Wrapper>
        ),
      },
      {
        path: '/analytics',
        element: (
          <Wrapper>
            <Analytics2 />
          </Wrapper>
        ),
      },
      // {
      //   path: '/home',
      //   element: <Home />,
      // },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])
