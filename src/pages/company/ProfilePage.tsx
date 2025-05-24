import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { profileUpdateSchema } from '@/lib/validations'
import { profileApi } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Building } from 'lucide-react'
import { toast } from 'sonner'

type FormData = z.infer<typeof profileUpdateSchema>

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(user?.profilePic || '')

  const form = useForm<FormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name || '',
      profilePic: user?.profilePic || '',
    },
  })

  // Placeholder for image upload handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        form.setValue('profilePic', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!user) return

    setIsLoading(true)
    try {
      const response = await profileApi.updateProfile(data)
      updateUser(response.data)

      toast.success('Profile updated', {
        description: 'Your profile has been updated successfully',
      })
    } catch (error: any) {
      toast.error('Update failed', {
        description: error?.message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={previewImage} />
                      <AvatarFallback className="text-lg">
                        {form.watch('name')
                          ? getInitials(form.watch('name'))
                          : user?.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="profilePic"
                      className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer"
                    >
                      {/* <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg> */}
                      <input
                        id="profilePic"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>View your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Email</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Role</p>
              <p className="flex items-center text-sm text-muted-foreground">
                <Building className="mr-2 h-4 w-4" />
                Company Admin
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Account Created</p>
              <p className="text-sm text-muted-foreground">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Account Status</p>
              <p className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                <span className="text-sm">Active</span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
