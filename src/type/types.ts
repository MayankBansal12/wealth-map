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

export interface AttomPropertyFilters {
  postalcode: string
  propertytype?: string
  orderby?: string
  page: string
  pagesize: string
}

export interface AttomStatus {
  msg: string
  total: number
  page: number
  pagesize: number
  responseDateTime: Date
}

export interface AttomPropertyData {
  identifier: {
    Id: number
    attomId: number
    apn: string
    fips: string
  }
  address: {
    country: string
    countrySubd: string
    line1?: string
    line2?: string
    locality: string
    matchCode: string
    oneLine: string
    postal1: string
    postal2?: string
    postal3?: string
  }
  location: {
    accuracy: string
    latitude: string
    longitude: string
    geoid: string
    geoIdV4: {
      [key: string]: any
    }
  }
  vintage: {
    lastModified: string
    pubDate: string
  }
}

export interface AttomPropertyResponse {
  status: AttomStatus
  property: AttomPropertyData[]
}

export interface AttomPropertyDetailReqParam {
  address1?: string
  address2?: string
}

export interface AttomPropertyDetailResponse {
  status: AttomStatus
  property: [AttomPropertyExpandedProfile]
}

export interface AttomPropertyExpandedProfile {
  identifier: {
    Id: number
    attomId: number
    apn: string
    fips: string
  }
  lot: {
    [key: string]: any
  }
  area: {
    [key: string]: any
  }
  address: {
    [key: string]: any
  }
  location: {
    [key: string]: any
  }
  summary: {
    [key: string]: any
  }
  utilities?: {
    [key: string]: any
  }
  sale?: {
    [key: string]: any
  }
  building?: {
    [key: string]: any
  }
  assessment?: {
    [key: string]: any
  }
  vintage: {
    lastModified: string
    pubDate: string
  }
}

export interface AttomPropertyTransporationResponse {
  status: AttomStatus
  transportationNoise: {
    attomId: string
    lat: string
    lng: string
    road_noise: AttomNoiseSource
    aviation_noise: AttomNoiseSource
    emg_vehicle_noise: AttomNoiseSource
    rail_whistle_noise: AttomNoiseSource
    rail_noise: AttomNoiseSource
    overall_summary: string
    disclaimer_text: string
  }
}

interface AttomNoiseSource {
  level: number
  level_description: string
  noise_sources: {
    [key: string]: any
  }[]
}

export interface AttomPropertyCommunityResponse {
  status: AttomStatus
  community: {
    demographics: {
      [key: string]: any
    }
    crime: {
      [key: string]: any
    }
    airQuality: {
      [key: string]: any
    }
    climate: {
      [key: string]: any
    }
    naturalDisasters: {
      [key: string]: any
    }
  }
}
