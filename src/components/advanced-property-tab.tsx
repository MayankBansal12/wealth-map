import { PropertyMediaGallery } from '@/components/advanced-prop/property-media-gallery'
import { PropertyFacts } from '@/components/advanced-prop/property-facts'
import { ZestimateInfo } from '@/components/advanced-prop/zestimate-info'
import { PriceHistory } from '@/components/advanced-prop/price-history'
import { SimilarProperties } from '@/components/advanced-prop/similar-properties'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'

interface AdvancedInfoTabProps {
  propertyData: any
}

export default function AdvancedInfoTab({ propertyData }: AdvancedInfoTabProps) {
  return (
    <div className="space-y-6">
      <Alert variant="destructive" className="bg-amber-50 border-amber-200">
        <Info className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Data Source Information</AlertTitle>
        <AlertDescription className="text-amber-700 text-sm">
          This information is sourced from third-party data providers and may not be completely
          accurate or up-to-date. Please verify all information independently before making any
          decisions.
        </AlertDescription>
      </Alert>

      <PropertyMediaGallery propertyData={propertyData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PropertyFacts propertyData={propertyData} />
          <PriceHistory propertyData={propertyData} />
        </div>
        <div className="space-y-6">
          <ZestimateInfo propertyData={propertyData} />
          <SimilarProperties propertyData={propertyData} />
        </div>
      </div>
    </div>
  )
}
