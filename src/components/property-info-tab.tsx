import { AlertTriangle } from 'lucide-react'
import { PropertyDetails } from '@/components/property-tab/basic-details'
import { OwnerDetails } from '@/components/property-tab/owner-details'
import { PropertySummary } from '@/components/property-tab/property-summary'
import { SalesDetails } from '@/components/property-tab/sales-details'
import { TransportationAccordion } from '@/components/property-tab/transport-accordian'
import { NeighborhoodAccordion } from '@/components/neighborhood-accordion'
import { neighborhoodData } from '@/mockPopulation'

interface PropertyInfoTabProps {
  propertyData: any
  transportationData: any
}

export default function PropertyInfoTab({
  propertyData,
  transportationData,
}: PropertyInfoTabProps) {
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
        summary={propertyData?.summary}
        address={propertyData?.address}
        vintage={propertyData?.vintage}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyDetails
          building={propertyData?.building}
          lot={propertyData?.lot}
          utilities={propertyData?.utilities}
        />
        <SalesDetails sale={propertyData?.sale} assessment={propertyData?.assessment} />
      </div>

      <OwnerDetails owner={propertyData?.assessment?.owner} />

      <div className="text-muted-foreground">
        View more sales transaction, financial and owner related details on &quot;Finance &
        Ownership Details&quot; Tab...
      </div>

      <NeighborhoodAccordion neighborhoodData={neighborhoodData.community} />

      <TransportationAccordion transportationData={transportationData} />
    </div>
  )
}
