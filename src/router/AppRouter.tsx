import Auth from '@/pages/auth'
import Home from '@/pages/home'
import PageNotFound from '@/pages/page-not-found'
import ResetPassword from '@/pages/ResetPassword'
import { createBrowserRouter } from 'react-router-dom'

export default createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/reset-pass',
    element: <ResetPassword />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
])
