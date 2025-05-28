import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, MapPin, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface OwnerDetailsProps {
  owner: any
}

export function OwnerDetails({ owner }: OwnerDetailsProps) {
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
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          Owner Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Owner Type</h4>
            <Badge variant="default" className="text-sm">
              {owner.description || owner.type || 'Unknown'}
            </Badge>
          </div>
          <div className="text-right">
            <h4 className="font-medium text-sm text-muted-foreground mb-1">Occupancy</h4>
            <Badge
              variant={owner.absenteeOwnerStatus === 'O' ? 'default' : 'secondary'}
              className="text-sm"
            >
              {owner.absenteeOwnerStatus === 'O' ? 'Owner Occupied' : 'Non-Owner Occupied'}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Primary Owner
          </h4>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="font-medium">{allOwners[0]?.fullName || 'Not specified'}</div>
            {allOwners[0]?.firstName && allOwners[0]?.lastName && (
              <div className="text-sm text-muted-foreground mt-1">
                {allOwners[0].firstName} {allOwners[0].lastName}
              </div>
            )}
          </div>
        </div>

        {allOwners.length > 1 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Co-Owners ({allOwners.length - 1})
            </h4>
            <div className="space-y-2">
              {allOwners.slice(1).map((ownerItem, index) => (
                <div key={index} className="p-2 bg-muted/20 rounded-md">
                  <div className="text-sm font-medium">{ownerItem.fullName}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Mailing Address
          </h4>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm leading-relaxed">
              {owner.mailingAddressOneLine || 'Not available'}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {owner.absenteeOwnerStatus === 'O'
                ? 'Mailing address matches property address'
                : 'Mailing address differs from property address'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
