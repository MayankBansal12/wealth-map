import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PropertyInfoTab from '@/components/property-info-tab'
import AdvancedInfoTab from '@/components/advanced-property-tab'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams, useSearchParams } from 'react-router-dom'
import { useFetchPropertyInfo } from '@/hooks/use-property-info'
import { useEffect } from 'react'

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { data: property, isLoading, error } = useFetchPropertyInfo(id ?? '', !!id)
  const [searchParams] = useSearchParams()
  const addressLine1 = searchParams.get('line1') ?? ''
  const addressLine2 = searchParams.get('line2') ?? ''

  useEffect(() => {
    console.log(
      'data and error: ',
      property,
      error,
      ' address deetails: ',
      addressLine1,
      addressLine2,
      ' id:',
      id
    )
  }, [property, error])

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
      <h1 className="text-3xl font-bold tracking-tight">Property Details</h1>

      <Tabs defaultValue="property-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="property-info">Property Info</TabsTrigger>
          <TabsTrigger value="advanced-info">Advanced Info</TabsTrigger>
          <TabsTrigger value="ownership-details">Ownership Details</TabsTrigger>
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
          <AdvancedInfoTab propertyId={id} propertyData={property?.advancedInfo ?? null} />
        </TabsContent>

        <TabsContent value="ownership-details">
          <div className="rounded-lg border p-8 text-center">
            Ownership details will be displayed here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyDetails
