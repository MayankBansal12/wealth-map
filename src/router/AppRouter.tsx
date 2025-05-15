// import AuthGuard from '@/components/auth-protect/AuthGuard'
import CheckToken from '@/components/auth-protect/CheckToken'
import Auth from '@/pages/auth'
import Home from '@/pages/home'
import PageNotFound from '@/pages/page-not-found'
import ResetPassword from '@/pages/ResetPassword'
import { createBrowserRouter, Navigate } from 'react-router-dom'

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
        element: <Navigate to="/home" replace />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])
