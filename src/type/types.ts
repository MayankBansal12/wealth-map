export interface User {
  name: string
  username: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  data: {
    jwt: string
    user: User
  }
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
    geoIdV4: object
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
