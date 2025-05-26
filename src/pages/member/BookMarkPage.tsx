import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { mockBookmarks } from '@/mockBookmarks'
import { Bookmark, ExternalLink, Filter, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BookMarkPage = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto space-y-6 my-4">
      <div className="flex items-center gap-3">
        <Bookmark className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight">Bookmarked Properties</h1>
      </div>

      <div className="text-right">
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="">
        <p className="text-gray-600">
          {mockBookmarks.length} bookmarked {mockBookmarks.length === 1 ? 'property' : 'properties'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBookmarks.map((property) => (
          <Card
            key={property.attomId}
            className="group hover:shadow-lg transition-all duration-200 border-0 shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      ID: {property.attomId}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                    {property.address.line1}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{property.address.line2}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">{property.address.oneLine}</p>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {/* <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>Added {property.vintage.pubDate}</span>
                                    </div> */}
                  <div className="flex items-center gap-1">
                    <span>Last Modified {property.vintage.lastModified}</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate(`/member/property/${property.attomId}`)}
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

      {mockBookmarks.length === 0 && (
        <div className="text-center py-12">
          <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks found</h3>
          <p className="text-gray-500">Start bookmarking properties to see them here.</p>
        </div>
      )}
    </div>
  )
}

export default BookMarkPage
