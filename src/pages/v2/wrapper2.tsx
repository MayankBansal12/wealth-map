import useAuthStore from '@/store/useAuthStore'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Wrapper = ({ children }: any) => {
  const route = window.location.pathname
  const navigate = useNavigate()
  const { user, setLoginUser } = useAuthStore()
  const [Loading, setLoading] = useState(false)

  const isDashboard = route.includes('dashboard')
  const isMamber = route.includes('members')
  const isAuth = route.includes('auth')

  async function handleUserCheck() {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/auth/login')
        return
      }
      const res = await fetch(import.meta.env.VITE_BACKEND + '/user/me', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = (await res.json())?.user
      if (res.status !== 200) {
        localStorage.removeItem('token')
        navigate('/auth/login')
        return
      } else {
        console.log('data', data)
        setLoginUser({
          id: data.id,
          name: data.name,
          email: data.email,
          type: data.type,
          company: {
            id: data?.company?.id,
            name: data?.company?.name,
          },
        })
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleSignout() {
    localStorage.removeItem('token')
    setLoginUser(null)
    navigate('/auth/login')
  }

  useEffect(() => {
    handleUserCheck()
  }, [])

  if (Loading) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-[100svh]">
        <h1 className="font-semibold text-lg">Loading...</h1>
      </div>
    )
  }
  if (!user) {
    return <></>
  }

  return (
    <div className="flex flex-row w-full h-[100svh]">
      {/* Sidebar */}
      <div className="flex flex-col items-center gap-4 p-4 border-slate-800 border-r w-64">
        <img
          src="https://picsum.photos/id/870/200/300"
          alt="Logo"
          className="mt-4 rounded-full w-24 h-24"
        />
        <h1 className="mb-2 font-semibold text-lg">Wealth Map</h1>

        {user?.type == 'owner' ? (
          <>
            <Link
              to={'/dashboard'}
              className={`${isDashboard ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Home
            </Link>
            <Link
              to={'/members'}
              className={`${isMamber ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Members
            </Link>
            <Link
              to={'/analytics'}
              className={`${isAuth ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Analytics
            </Link>
          </>
        ) : (
          <>
            <Link
              to={'/dashboard'}
              className={`${isDashboard ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Search
            </Link>
            <Link
              to={'/members'}
              className={`${isMamber ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Bookmark
            </Link>
            <Link
              to={'/analytics'}
              className={`${isAuth ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Reports
            </Link>
            <Link
              to={'/analytics'}
              className={`${isAuth ? 'bg-slate-800' : ''} hover:bg-slate-700 w-full text-center py-2 rounded-md`}
            >
              Export Data
            </Link>
          </>
        )}

        <button onClick={handleSignout} className="mt-auto p-2 rounded-md">
          Signout
        </button>
      </div>
      {/* Main Content */}

      <div className="p-4 w-full h-full">{children}</div>
    </div>
  )
}

export default Wrapper
