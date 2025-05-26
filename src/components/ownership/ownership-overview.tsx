import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Building, MapPin, Mail } from 'lucide-react'

interface OwnershipOverviewProps {
  owner: any
  propertyData: any
  isCorporateOwned: boolean
}

export function OwnershipOverview({ owner, isCorporateOwned }: OwnershipOverviewProps) {
  const allOwners = []
  for (let i = 1; i <= 4; i++) {
    const ownerKey = `owner${i}`
    if (owner[ownerKey] && owner[ownerKey].fullName) {
      allOwners.push({
        ...owner[ownerKey],
        isPrimary: i === 1,
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          {!isCorporateOwned ? <User className="h-5 w-5" /> : <Building className="h-5 w-5" />}
          Property Ownership
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-2">Owner Type</h4>
              <Badge variant={!isCorporateOwned ? 'default' : 'secondary'} className="text-sm">
                {owner?.description || owner?.type || 'Unknown'}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Primary Owner</h4>
              <p className="text-sm font-medium">{allOwners[0]?.fullName || 'Not specified'}</p>
            </div>

            {allOwners.length > 1 && (
              <div>
                <h4 className="font-medium mb-2">Co-Owners</h4>
                <div className="space-y-1">
                  {allOwners.slice(1).map((ownerItem, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {ownerItem.fullName}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Occupancy Status
              </h4>
              <Badge variant="outline">
                {owner?.absenteeOwnerStatus === 'O' ? 'Owner Occupied' : 'Non-Owner Occupied'}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Mailing Address
              </h4>
              <p className="text-sm text-muted-foreground">
                {owner?.mailingAddressOneLine ?? 'Not available'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
