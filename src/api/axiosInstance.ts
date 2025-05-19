import axios, { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'
const baseUrl = import.meta.env.VITE_BASE_URL
const attomUrl = import.meta.env.VITE_ATTOM_API_URL
const attomApiKey = import.meta.env.VITE_ATTOM_API_KEY

const createInstance = (apiURL: string) => {
  const apiInstance = axios.create({
    baseURL: apiURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  apiInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('auth-token')
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  return apiInstance
}

const createAttomInstance = (apiURL: string) => {
  const apiInstance = axios.create({
    baseURL: apiURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  apiInstance.interceptors.request.use(
    (config) => {
      config.headers.apikey = attomApiKey
      return config
    },
    (error) => Promise.reject(error)
  )

  return apiInstance
}

export const mainApi: AxiosInstance = createInstance(baseUrl)
export const attomApi: AxiosInstance = createAttomInstance(attomUrl)
