import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatAliasToNormal } from '@/lib/format'

interface SelectedLocationCardProps {
  reverseGeocodeData: any
  onCardClick: (lat: number, lng: number) => void
  userClickedLocation: { lat: number; lng: number }
  isLoading: boolean
  error: Error | null
}

export function SelectedLocationCard({
  reverseGeocodeData,
  onCardClick,
  userClickedLocation,
  isLoading,
  error,
}: SelectedLocationCardProps) {
  return (
    <Card
      className="mb-4 cursor-pointer"
      onClick={() => onCardClick(userClickedLocation.lat, userClickedLocation.lng)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {reverseGeocodeData?.components?.suburb ??
            reverseGeocodeData?.formatted?.split(',')?.[0] ??
            'Finding out Location...'}
        </CardTitle>
        <CardDescription>
          lat: {userClickedLocation.lat.toFixed(3)}, long: {userClickedLocation.lng.toFixed(3)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-gray-600">Loading location details...</p>}
        {error && (
          <p className="text-sm text-gray-600">
            {error?.message ?? 'Unable to get results for the location!'}
          </p>
        )}
        {reverseGeocodeData && (
          <div className="space-y-2">
            {reverseGeocodeData?.components?._category && (
              <Badge className="mr-2">
                {formatAliasToNormal(reverseGeocodeData.components._category)}
              </Badge>
            )}
            {reverseGeocodeData?.components?._type &&
              reverseGeocodeData?.components?._category !=
                reverseGeocodeData?.components?._type && (
                <Badge>{formatAliasToNormal(reverseGeocodeData.components._type)}</Badge>
              )}
            <p className="text-sm text-gray-600">{reverseGeocodeData.formatted}</p>
            {reverseGeocodeData.components && (
              <div className="text-sm text-gray-600">
                <p>
                  {[
                    reverseGeocodeData.components.city,
                    reverseGeocodeData.components.state,
                    reverseGeocodeData.components.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
