import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

const MemberLoginPage = () => {
  const [searchParams] = useSearchParams()
  const { login } = useAuth()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  useEffect(() => {
    const verifyToken = () => {
      console.log('verify token callled', token)

      if (token === null) return

      if (!token) {
        toast.error("Couldn't verify, please login using a valid link!")
        navigate('/login')
      } else {
        login(token, null)
        setTimeout(() => navigate('/member/dashboard'), 3000)
      }
    }

    verifyToken()
  }, [token])

  return <div className="space-y-6">Verifying identity and logging you in...</div>
}

export default MemberLoginPage
