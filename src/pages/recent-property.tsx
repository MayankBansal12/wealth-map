import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  ExternalLink,
  Car,
  Loader2,
  TrendingUp,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useProperties } from '@/hooks/use-properties'

function formatPrice(price: number): string {
  if (price === 0) return 'N/A'
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`
  }
  return `$${price.toLocaleString()}`
}

function getPropertyPrice(property: any): number {
  return (
    property?.advancedInfo?.zestimate ||
    property?.advancedInfo?.lastSoldPrice ||
    property?.propertyProfile?.assessment?.market?.mktTtlValue ||
    0
  )
}

function getPropertyImage(property: any): string | null {
  const photos = property?.advancedInfo?.originalPhotos
  if (photos && photos.length > 0 && photos[0]?.mixedSources?.jpeg?.length > 0) {
    return photos[0].mixedSources.jpeg[0].url
  }
  return null
}

function PropertyCard({ property }: { property: any }) {
  const navigate = useNavigate()
  const profile = property?.propertyProfile
  const price = getPropertyPrice(property)
  const imageUrl = getPropertyImage(property)

  const handleViewDetails = () => {
    const params = new URLSearchParams({
      zip: profile?.address?.postal1,
      oneLine: profile?.address?.oneLine,
      line1: profile?.address?.line1 ?? '',
      line2: profile?.address?.line2 ?? '',
    })

    navigate(`/member/property/${property?._id}?${params.toString()}`)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 bg-muted overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Property at ${profile?.address?.line1}`}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Home className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {price > 0 && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm text-foreground font-semibold"
              >
                {formatPrice(price)}
              </Badge>
            </div>
          )}

          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
              {profile?.summary?.archStyle || profile?.summary?.propertyType || 'Property'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>ID: {profile?.identifier?.Id || 'N/A'}</span>
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">
            {profile?.address?.line1}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{profile?.address?.line2}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile?.building?.rooms?.beds && (
            <div className="flex items-center gap-1 text-sm">
              <Bed className="h-3 w-3 text-muted-foreground" />
              <span>
                {profile?.building.rooms.beds} bed{profile?.building.rooms.beds !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {profile?.building?.rooms?.bathsTotal && (
            <div className="flex items-center gap-1 text-sm">
              <Bath className="h-3 w-3 text-muted-foreground" />
              <span>
                {profile?.building.rooms.bathsTotal} bath
                {profile?.building.rooms.bathsTotal !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {profile?.building?.size?.livingSize && (
            <div className="flex items-center gap-1 text-sm">
              <Square className="h-3 w-3 text-muted-foreground" />
              <span>{profile?.building.size.livingSize.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {profile?.summary?.yearBuilt && (
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Built {profile?.summary.yearBuilt}
            </Badge>
          )}

          {profile?.building?.parking?.parkingSpaces > 0 && (
            <Badge variant="outline" className="text-xs">
              <Car className="h-3 w-3 mr-1" />
              {profile?.building.parking.parkingSpaces} parking
            </Badge>
          )}
        </div>

        {profile?.vintage?.lastModified && (
          <p className="text-xs text-muted-foreground">
            Last Modified: {new Date(profile?.vintage.lastModified).toLocaleDateString()}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="default" onClick={() => handleViewDetails()}>
          <ExternalLink className="h-4 w-4 mr-2" />
          View Property Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function RecentProperty() {
  const navigate = useNavigate()
  const { ref: loadMoreRef, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useProperties()

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const allProperties = data?.pages.flatMap((page) => page.properties) ?? []

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-destructive">Failed to load properties. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto h-[calc(100vh-4rem)] my-4 flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex gap-2 items-center">
            <TrendingUp /> Trending Properties
          </h1>
          <p className="text-muted-foreground">
            Showing properties from recent searches on the app
          </p>
        </div>
        <Button onClick={() => navigate('/member/searchplace')} variant="outline">
          Search and Explore Properties
        </Button>
      </div>

      <div className="flex-1 overflow-y-scroll pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProperties?.map((property, index) => (
            <PropertyCard key={property?._id ?? index} property={property} />
          ))}
        </div>

        {isFetchingNextPage && (
          <div className="flex justify-center my-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        <div ref={loadMoreRef} className="h-10" />

        {!hasNextPage && allProperties.length > 0 && (
          <div className="text-center my-8">
            <Button onClick={() => navigate('/member/searchplace')} variant="outline">
              Explore More Properties
            </Button>
          </div>
        )}

        {!isLoading && allProperties.length === 0 && (
          <div className="text-center py-12">
            <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">Try exploring more properties</p>
            <Button onClick={() => navigate('/member/searchplace')} variant="outline">
              Explore Properties
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
