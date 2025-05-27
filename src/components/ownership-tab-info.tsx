import { ShieldCheck } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { OwnershipOverview } from '@/components/ownership/ownership-overview'
import { CorporateOwnerDetails } from '@/components/ownership/corporate-ownership-details'
import { mockOwnerDetails } from '@/mockOwnerDetails'
import { mockCompanyData } from '@/mockCompanyData'
import { IndividualOwnerProfile } from '@/components/ownership/primary-owner-profile'
import { WealthEstimateCard } from '@/components/ownership/wealth-estimate-card'

interface OwnershipDetailsTabProps {
  property: any
}

export default function OwnershipDetailsTab({ property }: OwnershipDetailsTabProps) {
  const propertyData = property?.propertyProfile ?? null
  const owner = propertyData?.assessment?.owner || {}
  const isIndividual = owner.corporateIndicator === 'N' || owner.type === 'INDIVIDUAL'
  const isCorporate = owner.corporateIndicator === 'Y' || owner.type === 'COMPANY'

  return (
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <ShieldCheck className="h-4 w-4 text-blue-900" />
        <AlertTitle className="text-blue-800">Ownership Information</AlertTitle>
        <AlertDescription className="text-sm text-blue-700">
          This information is compiled from public records and third-party sources. Data accuracy
          may vary.
        </AlertDescription>
      </Alert>

      <OwnershipOverview
        owner={owner}
        isCorporateOwned={!!isCorporate}
        propertyData={propertyData}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {isIndividual && (
          <>
            <div className="lg:col-span-2">
              <IndividualOwnerProfile ownerDetailsData={mockOwnerDetails} />
            </div>
            <div className="space-y-6">
              <WealthEstimateCard property={property} owner={owner} />
            </div>
          </>
        )}
      </div>
      {isCorporate && <CorporateOwnerDetails owner={owner} companyDetailsData={mockCompanyData} />}
    </div>
  )
}
