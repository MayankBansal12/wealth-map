import { useFetchUser } from '@/hooks/api/useAuth'
import useAuthStore from '@/store/useAuthStore'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Loader } from '../ui/loader'

const AuthGuard = () => {
  const { user, setLoginUser, logoutUser } = useAuthStore()
  const token = Cookies.get('authToken')
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname
  const search = location.search

  // if token is not present, remove user data in state and redirect to auth
  useEffect(() => {
    if (!token || token === undefined) {
      logoutUser()
      navigate('/auth?state=' + pathName + search)
    }
  }, [token, logoutUser, navigate, pathName, search])

  // custom hook for fetching user details
  const { data: fetchedUser, isLoading, error } = useFetchUser(user === null && token != null)

  // when user details and token are present, navigate to original path
  useEffect(() => {
    if (!user && fetchedUser) {
      setLoginUser(fetchedUser)
      navigate(pathName + search)
    }
  }, [user, fetchedUser, setLoginUser, navigate, pathName, search])

  // in case of error while fetching user with token, remove the token and navigate to auth
  useEffect(() => {
    if (error) {
      Cookies.remove('authToken')
      navigate('/auth')
    }
  }, [error, navigate])

  if (isLoading) {
    return <Loader />
  }
  return <Outlet />
}

export default AuthGuard
