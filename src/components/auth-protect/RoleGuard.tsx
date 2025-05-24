import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/type/types'

interface RoleGuardProps {
  children: ReactNode
  allowedRole: UserRole
}

export const RoleGuard = ({ children, allowedRole }: RoleGuardProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== allowedRole) {
    return (
      <Navigate to={user.role === 'company' ? '/company/dashboard' : '/member/dashboard'} replace />
    )
  }

  return <>{children}</>
}
