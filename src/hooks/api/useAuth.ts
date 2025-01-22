import { loginUser } from '@/api/authApi'
import { LoginRequest, LoginResponse } from '@/type/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from '../use-toast'
import useAuthStore from '@/store/useAuthStore'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

export const useLoginUser = () => {
  const { setLoginUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Cookies.set('authToken', data?.data?.jwt, { expires: 7, secure: true, sameSite: 'Strict' })
      setLoginUser(data?.data?.user)
      toast({
        description: 'Login Successful!',
      })
      navigate('/home')
    },
    onError: (error) => {
      console.log('error logging in : ', error)
    },
  })
}
