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
