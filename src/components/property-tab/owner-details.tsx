import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail } from 'lucide-react'

interface OwnerDetailsProps {
  owner: any
}

export function OwnerDetails({ owner }: OwnerDetailsProps) {
  const coOwners = Object.entries(owner || {}) // @ts-expect-error - type owner is not defined
    .filter(([key, value]) => key.startsWith('owner') && key !== 'owner1' && value?.fullName) // @ts-expect-error - type owner is not defined
    .map(([, value]) => value?.fullName)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Owner Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Owner Details</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Owner Type:</span>
                <span className="font-medium">{owner?.description}</span>
              </li>
              {owner?.owner1?.fullName && (
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Primary Owner:</span>
                  <span className="font-medium">{owner.owner1.fullName}</span>
                </li>
              )}
              {coOwners.length > 0 && (
                <li className="flex justify-between items-start">
                  <span className="text-muted-foreground">
                    Co-Owner{coOwners.length > 1 ? 's' : ''}:
                  </span>
                  <span className="font-medium flex flex-col text-right space-y-1">
                    {coOwners.map((name, idx) => (
                      <span key={idx}>{name}</span>
                    ))}
                  </span>
                </li>
              )}
              <li className="flex justify-between">
                <span className="text-muted-foreground">Occupancy Status:</span>
                <span className="font-medium">
                  {owner?.absenteeOwnerStatus === 'O' ? 'Owner Occupied' : 'Non-Owner Occupied'}
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Mailing Address
            </h4>
            <div className="p-3 bg-muted/30 rounded-lg text-sm">{owner?.mailingAddressOneLine}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
