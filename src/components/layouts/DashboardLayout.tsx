import { useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard, Users, Bookmark, FileText, LogOut, Menu } from 'lucide-react'
import { ThemeSwitch } from '../ThemeSwitch'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarHover, setSidebarHover] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const isCompany = user?.role === 'company'
  const basePath = isCompany ? '/company' : '/member'

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const companyLinks = [
    { to: `${basePath}/dashboard`, icon: <LayoutDashboard size={20} />, label: 'Workspace' },
    { to: `${basePath}/members`, icon: <Users size={20} />, label: 'Members' },
  ]

  const memberLinks = [
    { to: `${basePath}/dashboard`, icon: <LayoutDashboard size={20} />, label: 'Workspace' },
    { to: `${basePath}/bookmarks`, icon: <Bookmark size={20} />, label: 'Bookmarks' },
    { to: `${basePath}/reports`, icon: <FileText size={20} />, label: 'Reports' },
  ]

  const navLinks = isCompany ? companyLinks : memberLinks
  const expanded = sidebarHover || sidebarOpen

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }
  const confirmLogout = () => {
    setShowLogoutDialog(false)
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ease-in-out
          ${expanded ? 'w-64' : 'w-16'}
          bg-card border-r
          hidden md:flex flex-col justify-between
        `}
        onMouseEnter={() => setSidebarHover(true)}
        onMouseLeave={() => setSidebarHover(false)}
      >
        <div className="flex flex-col items-center py-6">
          <span
            className={`font-bold text-2xl transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            WealthMap
          </span>
          <span
            className={`font-bold text-2xl transition-opacity duration-200 ${!expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            WM
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`group flex w-full rounded-md transition-colors px-2 py-2 my-1
                ${location.pathname === link.to ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}
                ${expanded ? 'justify-start' : 'justify-center'}
                items-center gap-x-3
              `}
            >
              <span className="flex items-center justify-center min-w-[32px]">{link.icon}</span>
              {expanded && <span className="truncate">{link.label}</span>}
            </Link>
          ))}
        </nav>
        <Separator className="my-2" />

        <div className="flex flex-col gap-2 pb-6">
          <Button
            variant="ghost"
            className={`flex w-full items-center gap-x-3 p-3 rounded-md transition-colors ${expanded ? 'justify-start' : 'justify-center'} `}
            onClick={() => navigate(`${basePath}/profile`)}
          >
            <span className="flex items-center justify-center min-w-[32px]">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profilePic} alt={user?.name || ''} />
                <AvatarFallback>
                  {user?.name ? getInitials(user.name) : user?.email.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </span>
            {expanded && <span className="truncate">Profile</span>}
          </Button>
          <Button
            variant="ghost"
            className={`flex w-full items-center gap-x-3 p-3 ${expanded ? 'justify-start' : 'justify-center'}`}
          >
            <span className="flex items-center justify-center min-w-[32px]">
              <ThemeSwitch />
            </span>
            {expanded && <span className="truncate">Theme</span>}
          </Button>
          <Button
            variant="ghost"
            className={`flex w-full items-center gap-x-3 p-3 rounded-md transition-colors hover:bg-destructive/10 ${expanded ? 'justify-start' : 'justify-center'}`}
            onClick={handleLogout}
          >
            <span className="flex items-center justify-center min-w-[32px]">
              <LogOut size={20} />
            </span>
            {expanded && <span className="truncate">Sign out</span>}
          </Button>
        </div>
      </aside>

      <div className="md:hidden fixed top-4 left-4 z-40">
        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </Button>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setSidebarOpen(false)}>
          <aside
            className="fixed top-0 left-0 h-full w-64 bg-card border-r flex flex-col justify-between z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center py-6">
              <span className="font-bold text-2xl">WealthMap</span>
            </div>
            <nav className="flex-1 flex flex-col gap-1 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`group flex w-full rounded-md transition-colors px-2 py-2 my-1
                    ${location.pathname === link.to ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}
                    justify-start items-center gap-x-3
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="flex items-center justify-center min-w-[32px]">{link.icon}</span>
                  <span className="truncate">{link.label}</span>
                </Link>
              ))}
            </nav>
            <Separator className="my-2" />
            <div className="flex flex-col gap-1 pb-6">
              <Button
                variant="ghost"
                className="flex w-full items-center gap-x-3 px-2 py-2 rounded-md justify-start"
                onClick={() => {
                  navigate(`${basePath}/profile`)
                  setSidebarOpen(false)
                }}
              >
                <span className="flex items-center justify-center min-w-[32px]">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profilePic} alt={user?.name || ''} />
                    <AvatarFallback>
                      {user?.name
                        ? getInitials(user.name)
                        : user?.email.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </span>
                <span className="truncate">Profile</span>
              </Button>
              <div className="flex w-full items-center gap-x-3 px-2 py-2 justify-start">
                <span className="flex items-center justify-center min-w-[32px]">
                  <ThemeSwitch />
                  <span className="truncate">Theme</span>
                </span>
              </div>
              <Button
                variant="ghost"
                className="flex w-full items-center gap-x-3 px-2 py-2 rounded-md hover:bg-destructive/10 justify-start"
                onClick={handleLogout}
              >
                <span className="flex items-center justify-center min-w-[32px]">
                  <LogOut size={20} />
                </span>
                <span className="truncate">Sign out</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to sign out? You will need to log in again to access your
              workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={confirmLogout}>
                Sign out
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <main className="flex-1 ml-0 md:ml-16 transition-all duration-300 ease-in-out">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default DashboardLayout
