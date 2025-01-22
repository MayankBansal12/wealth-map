import { LoginRequest, LoginResponse } from '@/type/types'
import api from './axiosInstance'

export const loginUser = async (loginUser: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>('/admin/auth/login', loginUser)
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error logging in, try again!')
  }
}
