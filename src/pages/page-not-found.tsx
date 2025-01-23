import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-svh w-full flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold leading-tight">404</h1>
      <span className="font-medium">Page Not Found</span>
      <p className="text-center text-muted-foreground">
        It seems like the page you&apos;re looking for <br />
        does not exist or might have been removed.
      </p>
      <div className="mt-6 flex gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button onClick={() => navigate('/home')}>Back to Home</Button>
      </div>
    </div>
  )
}

export default PageNotFound
