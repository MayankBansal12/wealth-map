export interface User {
  id: string
  name: string
  email: string
  type: string
  company: {
    id: string
    name: string
  }
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
