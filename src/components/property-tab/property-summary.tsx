import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, MapPin } from 'lucide-react'

interface PropertySummaryProps {
  summary: any
  address: any
  vintage: any
}

export function PropertySummary({ summary, address, vintage }: PropertySummaryProps) {
  return (
    <Card>
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{address?.oneLine}</CardTitle>
          <Badge className="ml-2">{summary?.propClass}</Badge>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {address?.locality}, {address?.countrySubd} {address?.postal1}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Property Summary</span>
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Property Type:</span>
                <span className="font-medium">{summary?.propertyType}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year Built:</span>
                <span className="font-medium">{summary?.yearBuilt}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Occupancy:</span>
                <span className="font-medium">{summary?.absenteeInd}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Architectural Style:</span>
                <span className="font-medium">{summary?.archStyle}</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <h4 className="font-medium mb-2">Legal Description</h4>
              <p className="text-sm text-muted-foreground">{summary?.legal1}</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="font-medium mb-2">Published Date</h4>
                <p className="text-sm text-muted-foreground">{vintage?.pubDate}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Last Modified</h4>
                <p className="text-sm text-muted-foreground">{vintage?.lastModified}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
