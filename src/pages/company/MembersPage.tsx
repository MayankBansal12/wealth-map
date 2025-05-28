import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { memberApi } from '@/services/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { inviteMemberSchema } from '@/lib/validations'
import { formatDistanceToNow } from 'date-fns'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Mail, UserPlus, XCircle, Clock } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Member } from '@/type/types'
import { toast } from 'sonner'

type FormData = z.infer<typeof inviteMemberSchema>

const MembersPage = () => {
  const queryClient = useQueryClient()
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    data: members,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const response = await memberApi.getCompanyMembers()
      return response.data as Member[]
    },
  })

  const inviteMutation = useMutation({
    mutationFn: (data: FormData) => memberApi.inviteMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
      toast.success('Invitation sent', {
        description: 'Member has been invited successfully',
      })
      form.reset()
      setDialogOpen(false)
    },
    onError: (error: any) => {
      toast.error('Invitation Failed', {
        description: error?.message,
      })
    },
  })

  const cancelInvitationMutation = useMutation({
    mutationFn: (memberId: string) => memberApi.cancelInvitation(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] })
      toast.error('Invitation cancelled', {
        description: 'Member invitation has been cancelled',
      })
    },
    onError: (error: any) => {
      toast.error('Operation failed', {
        description: error?.message,
      })
    },
  })

  const onSubmit = (data: FormData) => {
    inviteMutation.mutate(data)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case 'accepted':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case 'expired':
        return (
          <Badge variant="outline" className="bg-gray-50 text-muted-foreground border-gray-200">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : ''
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
              <DialogDescription>
                Send an invitation email to add a new team member.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="name@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={inviteMutation.isPending} className="w-full">
                    {inviteMutation.isPending ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members and their access</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load members. Please try again later.</AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : members && members.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.profilePic} />
                            <AvatarFallback>
                              {member.name
                                ? getInitials(member.name)
                                : member.email.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name || 'Unnamed'}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(member.invitationStatus.status)}</TableCell>
                      <TableCell>
                        {member.isVerified
                          ? formatDistanceToNow(new Date(member.createdAt), { addSuffix: true })
                          : 'Not joined yet'}
                      </TableCell>
                      <TableCell className="text-right">
                        {member.invitationStatus.status === 'pending' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelInvitationMutation.mutate(member._id)}
                            disabled={cancelInvitationMutation.isPending}
                            className="text-destructive hover:text-destructive"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Invite
                          </Button>
                        ) : (
                          member.invitationStatus.status === 'accepted' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => cancelInvitationMutation.mutate(member._id)}
                              disabled={cancelInvitationMutation.isPending}
                              className="text-destructive hover:text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Revoke Access
                            </Button>
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">No members yet</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                You haven&apos;t added any team members yet. Click the &apos;Invite Member&apos;
                button above to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MembersPage
