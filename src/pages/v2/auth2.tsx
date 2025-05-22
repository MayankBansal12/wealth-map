import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const Auth2 = () => {
  const { authType, id } = useParams()
  const navigate = useNavigate()
  const [OpenModel, setOpenModel] = useState(false)
  const [Loading, setLoading] = useState(false)
  const emailRef = useRef<any>(null)

  const handeSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const url = import.meta.env.VITE_BACKEND + '/user' + `/${authType}`
    const data = {
      name: e.target.name.value, // server will ignore this if not signup
      email: e.target.email.value,
      password: e.target.password.value,
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      console.log(result)

      if (res.status === 200) {
        localStorage.setItem('token', result.token)
        if (authType === 'signup') {
          const user_id = result?.user?.id
          navigate(`/auth/signup/${user_id}`)
        } else {
          navigate('/dashboard')
        }
        return
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleAddBusiness = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const url = import.meta.env.VITE_BACKEND + '/company' + `/create`
    const data = {
      name: e.target.companyName.value,
      description: e.target.companyDescription.value,
      user_id: id,
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      console.log(result)
      if (res.status === 200) {
        localStorage.setItem('company', JSON.stringify(result))
        navigate('/dashboard')
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleDataFetch() {
    const url = import.meta.env.VITE_BACKEND + '/user' + `/${id}`
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await res.json()
      if (res.status === 200) {
        if (result?.user?.email) {
          emailRef.current.value = result?.user?.email
        }
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong')
    }
  }

  useEffect(() => {
    if (id && authType === 'signup') {
      setOpenModel(true)
    }
    if (id && authType === 'login') {
      handleDataFetch()
    }
  }, [id])

  if (authType !== 'login' && authType !== 'signup') {
    return <Navigate to="/auth/signup" replace />
  }

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100svh]">
      <div className="flex flex-col gap-2 p-4 border rounded-md">
        <h1 className="w-full font-semibold text-xl text-center capitalize">{authType}</h1>

        <form onSubmit={handeSubmit} className="flex flex-col gap-4 px-6 py-4">
          {authType === 'signup' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input name="name" id="name" className="p-1 rounded-sm min-w-64" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              className="p-1 rounded-sm min-w-64"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-1 rounded-sm min-w-64"
            />
          </div>

          <button
            className="bg-blue-700 hover:bg-slate-300 mt-2 p-1 rounded-md hover:text-black capitalize"
            type="submit"
          >
            {Loading ? 'Loading...' : authType}
          </button>
        </form>
      </div>

      {OpenModel && (
        <div className="top-0 left-0 fixed flex justify-center items-center bg-black/50 w-full h-full">
          <div className="bg-white p-10 px-11 rounded-md text-black">
            <h1 className="font-semibold text-lg">Setup company Details</h1>
            <form onSubmit={handleAddBusiness} className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="companyName">Company Name</label>
                <input
                  name="companyName"
                  id="companyName"
                  className="bg-slate-300 p-1 rounded-sm min-w-64"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="companyDescription">Description</label>
                <textarea
                  name="companyDescription"
                  id="companyDescription"
                  className="bg-slate-300 p-1 rounded-sm min-w-64"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-slate-300 mt-2 p-1 rounded-md text-white hover:text-black capitalize"
              >
                {Loading ? 'Loading...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Auth2
