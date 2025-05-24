import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useLocation, useNavigate } from 'react-router-dom'
import { verifyEmailSchema } from '@/lib/validations'
import { authApi } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'

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
import { toast } from 'sonner'

type FormData = z.infer<typeof verifyEmailSchema>

const VerifyEmailPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    // Get email from location state
    const stateEmail = location.state?.email
    if (stateEmail) {
      setEmail(stateEmail)
    } else {
      navigate('/login')
    }
  }, [location.state, navigate])

  const form = useForm<FormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    if (!email) {
      toast.error('Email not found. Please try logging in again.')
      return
    }

    setIsLoading(true)
    try {
      const response = await authApi.verifyEmail({
        email,
        token: data.token,
      })

      login(response.data.token, response.data.user)

      toast.success('Email verified', {
        description: 'Your account is now active',
      })

      navigate('/company/dashboard')
    } catch (error: any) {
      toast.error('Verification failed', {
        description: error.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Verify Your Email</h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification code to <span className="font-medium">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter verification code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                Verifying...
              </>
            ) : (
              'Verify Email'
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Didn&apos;t receive a code?{' '}
          <Button variant="link" className="p-0 h-auto">
            Resend Code
          </Button>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmailPage
