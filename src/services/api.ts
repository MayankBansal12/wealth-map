import axios from 'axios'
import Cookies from 'js-cookie'
import {
  LoginRequest,
  CompanySignupRequest,
  VerifyEmailRequest,
  MemberSetupRequest,
  InviteMemberRequest,
} from '@/type/types'

const API_URL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ?? error?.message ?? 'Something went wrong'

    return Promise.reject({ message, status: error.response?.status })
  }
)

export const authApi = {
  companyLogin: (data: LoginRequest) => api.post('/auth/company/login', data),

  companySignup: (data: CompanySignupRequest) => api.post('/auth/company/signup', data),

  verifyEmail: (data: VerifyEmailRequest) => api.post('/auth/verify-email', data),

  memberLogin: (data: LoginRequest) => api.post('/auth/member/login', data),

  memberSetup: (data: MemberSetupRequest) => api.post('/auth/member/setup', data),

  getCurrentUser: () => api.get('/auth/me'),

  logout: () => api.post('/auth/logout'),
}

export const memberApi = {
  inviteMember: (data: InviteMemberRequest) => api.post('/members/invite', data),

  getCompanyMembers: () => api.get('/members'),

  cancelInvitation: (memberId: string) => api.patch(`/members/revoke/${memberId}`),
}

export const propertyApi = {
  getProperties: async (params?: { next?: string; pageSize?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.next) queryParams.append('next', params.next)
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString())

    return api.get(`/property?${queryParams.toString()}`)
  },

  getPropertyDetails: async (id: string) => {
    return api.get(`/property/${id}`)
  },

  updateProperty: async (id: string, data: any) => {
    return api.put(`/property/${id}`, data)
  },
}

export const profileApi = {
  updateProfile: (data: Partial<MemberSetupRequest>) => api.put('/profile', data),
}

export default api
