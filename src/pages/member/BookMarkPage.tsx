import { useNavigate } from 'react-router-dom'
import { Bookmark, ExternalLink, Filter, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useBookmarks, useRemoveBookmark } from '@/hooks/use-bookmarks'
import { useBookmarkStore } from '@/store/useBookmarkStore'

const BookMarkPage = () => {
  const navigate = useNavigate()
  const { isLoading } = useBookmarks()
  const bookmarks = useBookmarkStore((s) => s.bookmarks)
  const removeBookmark = useRemoveBookmark()

  const handleViewDetails = (property: any) => {
    const params = new URLSearchParams({
      zip: property?.address?.postal1,
      oneLine: property?.address?.oneLine,
      line1: property?.address?.line1 ?? '',
      line2: property?.address?.line2 ?? '',
    })

    navigate(`/member/property/${property.attomId}?${params.toString()}`)
  }

  return (
    <div className="container mx-auto space-y-6 my-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Bookmarked Properties</h1>
          <Bookmark className="h-8 w-8 text-blue-600" />
        </div>
        <p className="text-muted-foreground">Manage your property bookmarks</p>
      </div>

      <div className="text-right">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div>
        <p className="text-muted-foreground">
          {bookmarks.length} bookmarked {bookmarks.length === 1 ? 'property' : 'properties'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarks?.map((bookmark) => (
          <Card
            key={bookmark?._id}
            className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      ID: {bookmark?.property.attomId}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg leading-tight">
                    {bookmark?.property.address.line1}
                  </h3>
                  <p className="text-sm mt-1">{bookmark?.property.address.line2}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={async () => {
                    await removeBookmark.mutateAsync(bookmark?._id)
                    toast.success('Bookmark removed!')
                  }}
                  aria-label="Remove bookmark"
                >
                  <Bookmark className="text-blue-600 fill-blue-600" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-secondary">
                  <p className="text-sm font-medium">{bookmark?.property.address.oneLine}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <span>Property Last Modified: {bookmark?.property.vintage?.lastModified}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewDetails(bookmark?.property)}
                  className="w-full group-hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Property Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {bookmarks.length === 0 && !isLoading && (
        <div className="text-center py-12 text-muted-foreground">
          <Bookmark className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
          <p>Start bookmarking properties to see them here.</p>
        </div>
      )}
    </div>
  )
}

export default BookMarkPage
