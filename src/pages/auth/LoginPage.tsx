import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { companyLoginSchema, loginSchema } from '@/lib/validations'
import { useAuth } from '@/contexts/AuthContext'
import { authApi } from '@/services/api'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'

type FormData = z.infer<typeof companyLoginSchema>

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [sentToEmail, setSentToEmail] = useState('')

  const form = useForm<FormData>({
    resolver: zodResolver(companyLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const memberForm = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await authApi.companyLogin(data)
      login(response.data.token, response.data.user)
      navigate('/company/dashboard')
    } catch (error: any) {
      toast.error('Signup failed', {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onMemberSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await authApi.memberLogin(data)
      if (response.data.token && response.data.user) {
        // User is verified, log in and navigate
        login(response.data.token, response.data.user)
        navigate('/member/dashboard')
      } else {
        // Not verified, magic link sent
        setEmailSent(true)
        setSentToEmail(data.email)
        toast.success('Magic link sent to email!', {
          description: 'Please check your email for the login link',
        })
      }
    } catch (error: any) {
      toast.error('Could not send the email!', {
        description: error?.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome to WealthMap</h1>
        <p className="text-muted-foreground">Login to access your account</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="member">Member</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-6 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@company.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            <p>
              Don&apos;t have a company account?{' '}
              <Link to="/signup" className="text-primary font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="member" className="mt-6">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Member Login</h1>
              <p className="text-muted-foreground">
                Login with your email to access your workspace
              </p>
            </div>

            {emailSent ? (
              <div className="space-y-4">
                <Alert variant="default" className="bg-muted">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Check your email</AlertTitle>
                  <AlertDescription>
                    We&apos;ve sent a magic link to <strong>{sentToEmail}</strong>. Click the link
                    in the email to log in.
                  </AlertDescription>
                </Alert>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEmailSent(false)
                    form.reset()
                  }}
                >
                  Use a different email
                </Button>
              </div>
            ) : (
              <Form {...memberForm}>
                <form onSubmit={memberForm.handleSubmit(onMemberSubmit)} className="space-y-4">
                  <FormField
                    control={memberForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@company.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                        Sending link...
                      </>
                    ) : (
                      'Send Login Link'
                    )}
                  </Button>
                </form>
              </Form>
            )}

            <div className="text-center text-xs text-muted-foreground">
              Members can&apos;t signup directly, they need to be invited by the company.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LoginPage
