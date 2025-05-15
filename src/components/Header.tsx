import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link, useLocation } from 'react-router-dom'
import { CircleUser, Menu, Package2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import useAuthStore from '@/store/useAuthStore'
import { ThemeSwitch } from './ThemeSwitch'

const Header = () => {
  const { logoutUser } = useAuthStore()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link to="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Wealth Map</span>
        </Link>
        <Link
          to="/home"
          className={
            'transition-colors hover:text-foreground ' +
            (pathname === '/home' ? 'text-foreground' : 'text-muted-foreground')
          }
        >
          Dashboard
        </Link>
        <Link
          to="/search"
          className={
            'transition-colors ' +
            (pathname === '/search' ? 'text-foreground' : 'text-muted-foreground')
          }
        >
          search
        </Link>
        <Link
          to="/reports"
          className={
            'transition-colors hover:text-foreground ' +
            (pathname === '/reports' ? 'text-foreground' : 'text-muted-foreground')
          }
        >
          reports
        </Link>
        <Link
          to="/members"
          className={
            'transition-colors hover:text-foreground ' +
            (pathname === '/members' ? 'text-foreground' : 'text-muted-foreground')
          }
        >
          Users
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              to="/home"
              className={
                'hover:text-foreground ' +
                (pathname === '/home' ? 'text-foreground' : 'text-muted-foreground')
              }
            >
              Dashboard
            </Link>
            <Link
              to="/search"
              className={
                'hover:text-foreground ' +
                (pathname === '/search' ? 'text-foreground' : 'text-muted-foreground')
              }
            >
              search
            </Link>
            <Link
              to="/reports"
              className={
                'hover:text-foreground ' +
                (pathname === '/reports' ? 'text-foreground' : 'text-muted-foreground')
              }
            >
              reports
            </Link>
            <Link
              to="/members"
              className={
                'hover:text-foreground ' +
                (pathname === '/members' ? 'text-foreground' : 'text-muted-foreground')
              }
            >
              Users
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <ThemeSwitch />
        </div>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>
                  <span>Logout</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Do you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                Your token will be removed and you will need to login again to access the panel.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => logoutUser()}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}

export default Header
