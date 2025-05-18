import useAuthStore from '@/store/useAuthStore'
import { Unlink2 } from 'lucide-react'
import { useEffect, useState } from 'react'
const Members2 = () => {
  const [MemberList, setMemberList] = useState<any[]>([])
  const { user } = useAuthStore()
  const [IsModalOpen, setIsModalOpen] = useState(false)
  const [InviteeUrl, setInviteeUrl] = useState(null)

  async function handleInvite(e: any) {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    const url = import.meta.env.VITE_BACKEND + '/company/invite'

    const data = {
      company_id: user?.company?.id,
      user: {
        name,
        email,
        password,
      },
    }
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login again')
      return
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.status === 200) {
        alert('User invited successfully')
        const url = result?.url
        if (url) {
          setInviteeUrl(url)
          await navigator.clipboard.writeText(url)
        }
        // setIsModalOpen(false)
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong')
    }
  }

  async function getMembers() {
    const url = `${import.meta.env.VITE_BACKEND}/company/members`
    const data = {
      id: user?.company?.id,
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const res = await response.json()
      console.log('res', res)
      if (response.status == 200) {
        setMemberList(res?.users)
      } else {
        alert('Error fetching members')
      }
    } catch (error) {
      console.error('Error fetching members:', error)
      alert('Error fetching members')
    }
  }

  async function handleRevoke(id: string, status: string) {
    const toStatus = status == 'revoked' ? 'verified' : 'revoked'
    const url = `${import.meta.env.VITE_BACKEND}/user/edit`
    const data = {
      id: id,
      status: toStatus,
    }
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const res = await response.json()
      console.log('res', res)
      if (response.status == 200) {
        // alert('Member revoked successfully')
        getMembers()
      } else {
        alert('Error revoking member')
      }
    } catch (error) {
      console.error('Error revoking member:', error)
      alert('Error revoking member')
    }
  }

  useEffect(() => {
    if (user?.id && user?.company?.id) {
      getMembers()
    }
  }, [user])

  return (
    <div className="flex flex-col gap-4 mt-2 w-full h-full">
      <h1 className="font-semibold text-2xl">Dashboard</h1>
      <div className="flex flex-row justify-end w-full">
        <button
          onClick={() => {
            setInviteeUrl(null)
            setIsModalOpen(true)
          }}
          className="bg-sky-700 px-4 py-2 rounded-md"
        >
          Invite
        </button>
      </div>

      <div className="flex flex-row gap-6 mt-4">
        {MemberList.map((user) => (
          <div key={user.id} className="flex flex-col gap-2 p-4 border rounded-md w-1/4">
            <h1 className="font-semibold text-lg">{user.name}</h1>
            <p className="text-sm">Email: {user.email}</p>
            <button
              onClick={() => handleRevoke(user.id, user.status)}
              className={`${user.status == 'revoked' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'}  mt-2 px-4 py-2 rounded-md hover:font-semibold`}
            >
              {user.status == 'revoked' ? 'Activate' : 'Revoke'}
            </button>
          </div>
        ))}
      </div>

      {IsModalOpen && (
        <div className="top-0 left-0 fixed flex justify-center items-center bg-black/50 w-full h-full">
          <div className="relative bg-white px-11 py-6 rounded-md text-black">
            <div className="flex flex-row justify-between">
              <h1 className="font-semibold text-xl">Invite User</h1>

              {InviteeUrl && (
                <Unlink2
                  onClick={() => navigator.clipboard.writeText(InviteeUrl)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <form onSubmit={handleInvite} className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-slate-300 p-1 rounded-sm min-w-72"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-slate-300 p-1 rounded-sm min-w-72"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-slate-300 p-1 rounded-sm min-w-72"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-slate-300 mt-2 p-1 rounded-md hover:text-black capitalize"
              >
                Invite
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="top-0 right-0 absolute bg-red-400 hover:bg-red-500 px-3 py-1 rounded-full hover:font-semibold -translate-y-3 translate-x-3"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Members2
