import { useState } from 'react'
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard, Users, Bookmark, FileText, User, LogOut, Menu, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeSwitch } from '../ThemeSwitch'

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
    { to: `${basePath}/dashboard`, icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: `${basePath}/members`, icon: <Users size={20} />, label: 'Members' },
  ]

  const memberLinks = [
    { to: `${basePath}/dashboard`, icon: <LayoutDashboard size={20} />, label: 'Workspace' },
    { to: `${basePath}/bookmarks`, icon: <Bookmark size={20} />, label: 'Bookmarks' },
    { to: `${basePath}/reports`, icon: <FileText size={20} />, label: 'Reports' },
  ]

  const navLinks = isCompany ? companyLinks : memberLinks

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-card border-b h-14 flex items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <div className="flex-1 flex items-center">
          <h1 className="text-xl font-bold">WealthMap</h1>
        </div>

        <ThemeSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={user?.profilePic} alt={user?.name || ''} />
                <AvatarFallback>
                  {user?.name ? getInitials(user.name) : user?.email.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate(`${basePath}/profile`)}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex-1 flex">
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-[70px]'
          } bg-card border-r sidebar-transition hidden md:block overflow-y-auto overflow-x-hidden`}
        >
          <nav className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                  location.pathname === link.to
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            ))}
            <Separator className="my-4" />
            <Link
              to={`${basePath}/profile`}
              className={`flex items-center py-2 px-3 rounded-md transition-colors ${
                location.pathname === `${basePath}/profile`
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <span className="mr-3">
                <User size={20} />
              </span>
              {sidebarOpen && <span>Your Profile</span>}
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start px-3 hover:bg-muted"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              {sidebarOpen && <span>Sign out</span>}
            </Button>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">
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
    </div>
  )
}

export default DashboardLayout
