import { LoginRequest, LoginResponse, User } from '@/type/types'
import { mainApi } from './axiosInstance'
import Cookies from 'js-cookie'

export const loginUser = async (loginUser: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await mainApi.post<LoginResponse>('/admin/auth/login', loginUser)
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error logging in, try again!')
  }
}

export const fetchUser = async (): Promise<User> => {
  try {
    const { data } = await mainApi.get<User>('/admin')
    return data
  } catch (error: any) {
    if (error?.response?.status === 401) {
      Cookies.remove('authToken')
    }
    throw new Error(error?.response?.data?.message || 'Error fetching user, try again!')
  }
}
