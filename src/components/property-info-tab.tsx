import { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { PropertyDetails } from '@/components/property-tab/basic-details'
import { OwnerDetails } from '@/components/property-tab/owner-details'
import { PropertySummary } from '@/components/property-tab/property-summary'
import { SalesDetails } from '@/components/property-tab/sales-details'
import { MortgageDetails } from '@/components/property-tab/mortgage-details'
import { TransportationAccordion } from '@/components/transport-accordian'
import { NeighborhoodAccordion } from '@/components/neighborhood-accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  useFetchPropertyDetail,
  useFetchPropertyTransportationDetail,
  useFetchPropertyCommunityDetail,
} from '@/hooks/use-attom-data'
import { useUpdatePropertyInfo } from '@/hooks/use-property-info'

interface PropertyInfoTabProps {
  propertyId?: string
  addressLine1?: string
  addressLine2?: string
  propertyData: any
  transportationData: any
  neighborhoodData: any
}

export default function PropertyInfoTab({
  propertyId,
  addressLine1,
  addressLine2,
  propertyData,
  transportationData,
  neighborhoodData,
}: PropertyInfoTabProps) {
  const [isTransportOpen, setIsTransportOpen] = useState(false)
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false)

  const shouldFetchProfile = !propertyData && !!propertyId && !!addressLine1 && !!addressLine2
  const {
    data: propertyDetails,
    isLoading: loadingProfile,
    error: errorProfile,
  } = useFetchPropertyDetail({ address1: addressLine1, address2: addressLine2 }, shouldFetchProfile)
  const fetchedProfile = propertyDetails?.property?.[0] ?? null
  const updateProperty = useUpdatePropertyInfo()

  useEffect(() => {
    if (fetchedProfile && shouldFetchProfile && propertyId) {
      updateProperty.mutate({ id: propertyId, update: { propertyProfile: fetchedProfile } })
    }
  }, [fetchedProfile, shouldFetchProfile, propertyId])

  const address = propertyData?.address?.oneLine || fetchedProfile?.address?.oneLine
  const shouldFetchTransport = isTransportOpen && !transportationData && !!propertyId && !!address
  const {
    data: transportDetails,
    isLoading: loadingTransport,
    error: errorTransport,
  } = useFetchPropertyTransportationDetail(address, shouldFetchTransport)
  const fetchedTransport = transportDetails?.transportationNoise

  useEffect(() => {
    if (fetchedTransport && shouldFetchTransport && propertyId) {
      updateProperty.mutate({ id: propertyId, update: { transportationData: fetchedTransport } })
    }
  }, [fetchedTransport, shouldFetchTransport, propertyId])

  const geoIdV4 = propertyData?.location?.geoIdV4?.N1 || fetchedProfile?.location?.geoIdV4?.N1
  const shouldFetchNeighborhood =
    isNeighborhoodOpen && !neighborhoodData && !!propertyId && !!geoIdV4
  const {
    data: neighborhoodDetails,
    isLoading: loadingNeighborhood,
    error: errorNeighborhood,
  } = useFetchPropertyCommunityDetail(geoIdV4, shouldFetchNeighborhood)
  const fetchedNeighborhood = neighborhoodDetails?.community

  useEffect(() => {
    if (fetchedNeighborhood && shouldFetchNeighborhood && propertyId) {
      updateProperty.mutate({ id: propertyId, update: { neighborhoodData: fetchedNeighborhood } })
    }
  }, [fetchedNeighborhood, shouldFetchNeighborhood, propertyId])

  const finalProfile = propertyData ?? fetchedProfile
  const finalTransport = transportationData ?? fetchedTransport
  const finalNeighborhood = neighborhoodData ?? fetchedNeighborhood

  if (loadingProfile) {
    return <Skeleton className="h-96 w-full" />
  } else if (errorProfile || !finalProfile) {
    return (
      <Alert variant="destructive" className="bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Property Details Unavailable</AlertTitle>
        <AlertDescription className="text-amber-700 text-sm">
          We are unable to fetch the details for this property, either try again or wait till we
          find a solution to display info for this property. We apologize for any inconvenience
          caused.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-muted/30 rounded-lg flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        <p className="text-sm">
          This data is provided by our trusted third-party vendor - ATTOM. We don&apos;t own any
          piece of property information in any way.
        </p>
      </div>

      <PropertySummary
        summary={finalProfile?.summary}
        address={finalProfile?.address}
        vintage={finalProfile?.vintage}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyDetails
          building={finalProfile?.building}
          lot={finalProfile?.lot}
          utilities={finalProfile?.utilities}
        />
        <SalesDetails sale={finalProfile?.sale} assessment={finalProfile?.assessment} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OwnerDetails owner={finalProfile?.assessment?.owner} />
        <MortgageDetails mortgage={propertyData.assessment.mortgage} />
      </div>

      <div className="text-muted-foreground">
        View more financial and owner related details on &quot;Finance & Ownership Details&quot;
        Tab...
      </div>

      <NeighborhoodAccordion
        neighborhoodData={finalNeighborhood}
        isOpen={isNeighborhoodOpen}
        onOpen={() => setIsNeighborhoodOpen(true)}
        onClose={() => setIsNeighborhoodOpen(false)}
        isLoading={loadingNeighborhood}
        error={errorNeighborhood}
      />

      <TransportationAccordion
        transportationData={finalTransport}
        isOpen={isTransportOpen}
        onOpen={() => setIsTransportOpen(true)}
        onClose={() => setIsTransportOpen(false)}
        isLoading={loadingTransport}
        error={errorTransport}
      />
    </div>
  )
}
