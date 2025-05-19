import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AttomPropertyResponse } from '@/type/types'

interface PropertySearchResultsProps {
  data: AttomPropertyResponse | undefined
  isLoading: boolean
  error: Error | null
  onPropertyClick: (property: AttomPropertyResponse['property'][0]) => void
  selectedPropertyId?: number
}

export function PropertySearchResults({
  data,
  isLoading,
  error,
  onPropertyClick,
  selectedPropertyId,
}: PropertySearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>
  }

  if (data?.status?.msg === 'SuccessWithoutResult' || !data?.property?.length) {
    return <div className="text-gray-500">No properties found for that postal area/code</div>
  }

  return (
    <div className="space-y-4">
      {data.property.map((property) => (
        <Card
          key={property.identifier.Id}
          className={`cursor-pointer transition-all ${
            selectedPropertyId === property.identifier.Id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => onPropertyClick(property)}
        >
          <CardHeader>
            <CardTitle>{property.address.line1}</CardTitle>
            <CardDescription>{property.address.line2}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{property.location.accuracy}</Badge>
                <Badge variant="outline">{property.identifier.fips}</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Last Modified: {new Date(property.vintage.lastModified).toLocaleDateString()}
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onPropertyClick(property)
                }}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
