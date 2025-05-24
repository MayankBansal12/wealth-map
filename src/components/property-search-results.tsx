import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AttomPropertyResponse } from '@/type/types'
import { popularSearches } from '@/lib/mock-data'
import { useInView } from 'react-intersection-observer'
import { useEffect, useRef } from 'react'
import { BookmarkIcon, SquareArrowUpRight } from 'lucide-react'

interface PropertySearchResultsProps {
  data: AttomPropertyResponse | undefined
  isLoading: boolean
  error: Error | null
  onPropertyClick: (property: AttomPropertyResponse['property'][0]) => void
  onViewDetails?: (property: AttomPropertyResponse['property'][0]) => void
  selectedPropertyId?: number
  onPopularSearchClick?: (lat: number, lng: number) => void
  hasQueryParams: boolean
  onLoadMore: () => void
  hasMore: boolean
  isFetchingNextPage?: boolean
}

export function PropertySearchResults({
  data,
  isLoading,
  error,
  onPropertyClick,
  onViewDetails,
  selectedPropertyId,
  onPopularSearchClick,
  hasQueryParams,
  onLoadMore,
  hasMore,
  isFetchingNextPage,
}: PropertySearchResultsProps) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })
  const fetchingRef = useRef(false)

  useEffect(() => {
    if (inView && hasMore && !isLoading && !isFetchingNextPage && !fetchingRef.current) {
      fetchingRef.current = true
      onLoadMore()

      setTimeout(() => {
        fetchingRef.current = false
      }, 1000)
    }
  }, [inView, hasMore, isLoading, onLoadMore, isFetchingNextPage])

  if (!hasQueryParams) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Popular Searches</h2>
        {popularSearches.map((location) => (
          <Card
            key={location.id}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => onPopularSearchClick?.(location.lat, location.lng)}
          >
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
              <CardDescription>{location.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    )
  }

  if (isLoading && !data?.property?.length) {
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
    return (
      <div className="text-gray-500 h-1/4 flex items-center justify-center">
        No properties found for that postal area/code
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Search Results ({data?.status?.total ?? 0})</h2>
      {data.property.map((property) => (
        <Card
          key={property.identifier.Id}
          className={`cursor-pointer transition-all ${selectedPropertyId === property.identifier.Id ? 'ring-2 ring-primary' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onPropertyClick(property)
          }}
        >
          <CardHeader>
            <CardTitle>{property.address.line1}</CardTitle>
            <CardDescription>{property.address.line2}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Published: {new Date(property.vintage.pubDate).toLocaleDateString()} | Last
                Modified: {new Date(property.vintage.lastModified).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onViewDetails) {
                      onViewDetails(property)
                    } else {
                      onPropertyClick(property)
                    }
                  }}
                >
                  View Details
                  <SquareArrowUpRight />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Bookmark property!')
                  }}
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {hasMore && (
        <div ref={ref} className="my-2">
          {isFetchingNextPage && (
            <Card>
              <CardHeader>
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-2/3 mt-2" />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
