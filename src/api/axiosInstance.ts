import axios from 'axios'
import Cookies from 'js-cookie'
const baseUrl = import.meta.env.VITE_BASE_URL

const token = Cookies.get('authToken')
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + token,
  },
})

export default api
