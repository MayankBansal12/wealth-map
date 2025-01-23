import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Link, useLocation } from 'react-router-dom'
import { useLoginUser } from '@/hooks/api/useAuth'
import { useState } from 'react'
import { AlertCircle } from 'lucide-react'

const LoginForm = ({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) => {
  const [userData, setUserData] = useState({
    email: '',
    passwd: '',
  })
  const location = useLocation()
  const state = location.search?.split('?state=')

  const { mutate, isPending, error } = useLoginUser(!state || !state[1] ? '/home' : state[1])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ username: userData.email, password: userData.passwd })
  }

  return (
    <>
      {error && (
        <Alert variant="destructive" className="w-fit md:max-w-1/4 absolute top-14 right-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <form
        className={cn('flex flex-col gap-6', className)}
        {...props}
        onSubmit={(e) => handleLogin(e)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to wealth map</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your details below to login to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email/Username</Label>
            <Input
              id="email"
              placeholder="mayank@gmail.com"
              name="email"
              value={userData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/reset-pass" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              name="passwd"
              value={userData.passwd}
              onChange={handleFormChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {!isPending ? 'Login' : 'Logging in...'}
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account? Contact support team for new signups.
        </div>
      </form>
    </>
  )
}

export default LoginForm
