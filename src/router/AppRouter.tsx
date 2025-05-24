import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '@/components/layouts/AuthLayout'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ProtectedRoute from '@/components/auth-protect/ProtectedRoute'
import { RoleGuard } from '@/components/auth-protect/RoleGuard'

import LoginPage from '@/pages/auth/LoginPage'
import CompanySignupPage from '@/pages/auth/CompanySignupPage'
import VerifyEmailPage from '@/pages/auth/VerifyEmailPage'
import MemberLoginPage from '@/pages/auth/MemberLoginPage'
import MemberSetupPage from '@/pages/auth/MemberSetupPage'

import CompanyDashboardPage from '@/pages/company/DashboardPage'
import CompanyMembersPage from '@/pages/company/MembersPage'
import CompanyProfilePage from '@/pages/company/ProfilePage'

import MemberDashboardPage from '@/pages/member/DashboardPage'
import MemberProfilePage from '@/pages/member/ProfilePage'

import NotFoundPage from '@/pages/page-not-found'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" replace /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <CompanySignupPage /> },
      { path: '/verify-email', element: <VerifyEmailPage /> },
      { path: '/member-login', element: <MemberLoginPage /> },
      { path: '/member-setup', element: <MemberSetupPage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="company">
          <DashboardLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { path: '/company', element: <Navigate to="/company/dashboard" replace /> },
      { path: '/company/dashboard', element: <CompanyDashboardPage /> },
      { path: '/company/members', element: <CompanyMembersPage /> },
      { path: '/company/profile', element: <CompanyProfilePage /> },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRole="member">
          <DashboardLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { path: '/member', element: <Navigate to="/member/dashboard" replace /> },
      { path: '/member/dashboard', element: <MemberDashboardPage /> },
      { path: '/member/profile', element: <MemberProfilePage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
