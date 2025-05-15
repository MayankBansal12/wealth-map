import axios from 'axios'
import Cookies from 'js-cookie'
const baseUrl = import.meta.env.VITE_BASE_URL

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken')
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
