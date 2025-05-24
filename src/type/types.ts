export type UserRole = 'company' | 'member'

export interface User {
  _id: string
  email: string
  name?: string
  role: UserRole
  profilePic?: string
  companyId?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface InvitationStatus {
  status: 'pending' | 'accepted' | 'expired'
  expiresAt: string
}

export interface Member {
  _id: string
  email: string
  name?: string
  role: 'member'
  profilePic?: string
  companyId: string
  isVerified: boolean
  invitationStatus: InvitationStatus
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password?: string
}

export interface CompanySignupRequest {
  email: string
  password: string
  name: string
}

export interface MemberSetupRequest {
  name: string
  profilePic?: string
  token: string
}

export interface InviteMemberRequest {
  email: string
}

export interface VerifyEmailRequest {
  email: string
  token: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ApiError {
  message: string
  status: number
}

export interface LoginToken {
  _id: string
  userId: string
  token: string
  type: 'magic-link' | 'otp'
  expiresAt: string
  isUsed: boolean
}

export interface Invitation {
  _id: string
  email: string
  companyId: string
  token: string
  status: 'pending' | 'accepted' | 'expired'
  expiresAt: string
  createdAt: string
  updatedAt: string
}
