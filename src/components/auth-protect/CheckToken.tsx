import Cookies from 'js-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const CheckToken = () => {
  const token = Cookies.get('authToken')
  const location = useLocation()
  const search = location.search
  const state = search?.split('?state=')

  if (!token) {
    return <Outlet />
  } else {
    return <Navigate to={!state || !state[1] ? '/home' : state[1]} replace={true} />
  }
}

export default CheckToken
