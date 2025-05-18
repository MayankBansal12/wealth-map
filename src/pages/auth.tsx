import LoginForm from '@/components/LoginForm'
import { GalleryVerticalEnd } from 'lucide-react'

const Auth = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-svh">
      <div className="hidden relative lg:flex justify-center items-center bg-muted">
        <img
          src="/assets/logo.png"
          alt="logo"
          className="inset-0 dark:brightness-[0.8] w-1/3 object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center md:justify-start gap-2">
          <div className="flex justify-center items-center bg-primary rounded-md w-6 h-6 text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Wealth Map
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
