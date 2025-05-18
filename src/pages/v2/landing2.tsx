import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-[100svh]">
      <h1 className="font-bold text-white text-4xl">
        Welcome to the <span className="text-green-400">Wealth Map</span>
      </h1>
      <p>Plan your real estate strategy and stay light years ahead.</p>
      <img src="https://picsum.photos/id/870/500/300" alt="Logo" className="mt-4 rounded-md" />
      <div className="flex flex-row gap-4 mt-4">
        <Link
          to={'/auth/signup'}
          className="bg-blue-700 bg-blue800 hover:bg-slate-100 px-8 py-2 rounded-md text-white hover:text-black"
        >
          Signup
        </Link>
        <Link
          to={'/auth/login'}
          className="bg-blue800 bg-purple-700 hover:bg-slate-100 px-8 py-2 rounded-md text-white hover:text-black"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Landing
