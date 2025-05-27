import { PropertyMediaGallery } from '@/components/advanced-prop/property-media-gallery'
import { PropertyFacts } from '@/components/advanced-prop/property-facts'
import { ZestimateInfo } from '@/components/advanced-prop/zestimate-info'
import { PriceHistory } from '@/components/advanced-prop/price-history'
import { SimilarProperties } from '@/components/advanced-prop/similar-properties'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { useEffect } from 'react'
import { useFetchAdvancedPropertyInfo } from '@/hooks/use-attom-data'
import { useUpdatePropertyInfo } from '@/hooks/use-property-info'
import { Skeleton } from '@/components/ui/skeleton'

interface AdvancedInfoTabProps {
  propertyId?: string
  propertyAddress: string
  propertyData: any
}

export default function AdvancedInfoTab({
  propertyId,
  propertyAddress,
  propertyData,
}: AdvancedInfoTabProps) {
  const shouldFetch = !propertyData && !!propertyAddress
  const {
    data: fetchedAdvanced,
    isLoading,
    error,
  } = useFetchAdvancedPropertyInfo(propertyAddress ?? '', shouldFetch)
  const updateProperty = useUpdatePropertyInfo()

  useEffect(() => {
    if (fetchedAdvanced && shouldFetch && propertyId) {
      updateProperty.mutate({ id: propertyId, update: { advancedInfo: fetchedAdvanced } })
    }
  }, [fetchedAdvanced, shouldFetch, propertyId, propertyAddress])

  const finalAdvanced = propertyData || fetchedAdvanced

  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Data Source Information</AlertTitle>
        <AlertDescription className="text-amber-700 text-sm">
          This information is scrapped from third-party data providers. It might be slow and
          unreliable and data may not be completely accurate or up-to-date. Please verify all
          information independently before making any decisions.
        </AlertDescription>
      </Alert>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          <h2>Fetching advanced data...it may take time and might be unreliable</h2>
          <Skeleton className="h-40 w-full my-4" />
        </div>
      ) : error || (!isLoading && !finalAdvanced) ? (
        <div className="text-center p-4 my-4 text-muted-foreground">
          Advanced property details are not available for this property yet, we are working on
          getting this data, sorry for the inconvenience!
        </div>
      ) : (
        <>
          <PropertyMediaGallery propertyData={finalAdvanced} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PropertyFacts propertyData={finalAdvanced} />
              <PriceHistory propertyData={finalAdvanced} />
            </div>
            <div className="space-y-6">
              <ZestimateInfo propertyData={finalAdvanced} />
              <SimilarProperties propertyData={finalAdvanced} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
