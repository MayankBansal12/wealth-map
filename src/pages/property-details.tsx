import { useParams, useSearchParams } from 'react-router-dom'
import { Bookmark as BookmarkIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PropertyInfoTab from '@/components/property-info-tab'
import AdvancedInfoTab from '@/components/advanced-property-tab'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchPropertyInfo } from '@/hooks/use-property-info'
import OwnershipDetailsTab from '@/components/ownership-tab-info'
import { useBookmarkStore } from '@/store/useBookmarkStore'
import { useAddBookmark, useRemoveBookmark } from '@/hooks/use-bookmarks'

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: property, isLoading } = useFetchPropertyInfo(id ?? '', !!id)
  const [searchParams] = useSearchParams()
  const addressLine1 = searchParams.get('line1') ?? ''
  const addressLine2 = searchParams.get('line2') ?? ''
  const isBookmarked = useBookmarkStore((s) => s.isBookmarked)
  const bookmarks = useBookmarkStore((s) => s.bookmarks)
  const addBookmark = useAddBookmark()
  const removeBookmark = useRemoveBookmark()

  if (isLoading) {
    return (
      <div className="mx-auto py-6 px-4 space-y-6">
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="mx-auto py-6 px-4 space-y-6 w-full md:w-[calc(100vw-8rem)]">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Property Details</h1>
        <button
          className="ml-2"
          onClick={async () => {
            if (!property?.propertyProfile) return
            const attomId = property.propertyProfile.identifier?.attomId
            const alreadyBookmarked = isBookmarked(attomId)
            if (alreadyBookmarked) {
              const bookmark = bookmarks.find((b) => b?.property?.attomId === attomId)
              if (bookmark) {
                await removeBookmark.mutateAsync(bookmark._id)
                toast.success('Bookmark removed!')
              }
            } else {
              await addBookmark.mutateAsync(property.propertyProfile)
              toast.success('Property bookmarked!')
            }
          }}
          aria-label={
            isBookmarked(property?.propertyProfile?.identifier?.attomId)
              ? 'Remove bookmark'
              : 'Add bookmark'
          }
        >
          <BookmarkIcon
            className={`h-7 w-7 ${isBookmarked(property?.propertyProfile?.identifier?.attomId) ? 'fill-blue-600 text-blue-600' : ''}`}
          />
        </button>
      </div>

      <Tabs defaultValue="property-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="property-info">Property Info</TabsTrigger>
          <TabsTrigger value="advanced-info">Advanced Info</TabsTrigger>
          <TabsTrigger value="ownership-details">Ownership and Financial Details</TabsTrigger>
        </TabsList>

        <TabsContent value="property-info">
          <PropertyInfoTab
            propertyId={id}
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            propertyData={property?.propertyProfile ?? null}
            transportationData={property?.transportationData ?? null}
            neighborhoodData={property?.neighborhoodData ?? null}
          />
        </TabsContent>

        <TabsContent value="advanced-info">
          <AdvancedInfoTab
            propertyId={id}
            propertyAddress={property?.propertyProfile?.address?.oneLine}
            propertyData={property?.advancedInfo ?? null}
          />
        </TabsContent>

        <TabsContent value="ownership-details">
          <OwnershipDetailsTab
            propertyId={id}
            property={property ?? null}
            zestimate={property?.advancedInfo?.zestimate}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyDetails
