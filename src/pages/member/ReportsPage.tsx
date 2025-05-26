import { ClipboardCheck } from 'lucide-react'

const ReportsPage = () => {
  return (
    <div className="container mx-auto space-y-6 my-4">
      <div className="flex items-center gap-3">
        <ClipboardCheck className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      </div>

      <div className="h-[75vh] flex justify-center items-center text-muted-foreground">
        Reports are a work in progress...
      </div>
    </div>
  )
}

export default ReportsPage
