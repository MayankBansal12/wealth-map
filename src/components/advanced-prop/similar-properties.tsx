import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Home, MapPin, Ruler, Bed, Bath } from 'lucide-react'

interface SimilarPropertiesProps {
  propertyData: any
}

export function SimilarProperties({ propertyData }: SimilarPropertiesProps) {
  const similarProperties =
    propertyData.collections?.modules?.find((module: any) => module.name === 'Similar homes')
      ?.propertyDetails || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Home className="h-5 w-5" />
          Similar Properties
        </CardTitle>
      </CardHeader>
      <CardContent>
        {similarProperties.length > 0 ? (
          <ScrollArea className="w-full">
            <div className="space-y-4 pb-2">
              {similarProperties.map((property: any, index: number) => (
                <div key={index} className="flex flex-col border rounded-md overflow-hidden">
                  <div className="relative h-40 w-full bg-muted">
                    {property.miniCardPhotos && property.miniCardPhotos[0] ? (
                      <img
                        src={property.miniCardPhotos[0].url || '/placeholder.svg'}
                        alt={property.address.streetAddress}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg?height=160&width=320'
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full">
                        <Home className="h-10 w-10 text-muted-foreground opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                        ${property.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{property.address.streetAddress}</div>
                        <div className="text-xs text-muted-foreground">
                          {property.address.city}, {property.address.state}{' '}
                          {property.address.zipcode}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{property.bedrooms} bd</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{property.bathrooms} ba</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{property.livingArea.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No similar properties available.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
