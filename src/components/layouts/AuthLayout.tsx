import { Navigate, Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'

const AuthLayout = () => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated && user) {
    if (user.role === 'company') {
      return <Navigate to="/company/dashboard" replace />
    } else {
      return <Navigate to="/member/dashboard" replace />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key="auth-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="bg-card rounded-lg shadow-lg border overflow-hidden">
              <div className="p-6">
                <Outlet />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} WealthMap. All rights reserved.
      </footer>
    </div>
  )
}

export default AuthLayout
