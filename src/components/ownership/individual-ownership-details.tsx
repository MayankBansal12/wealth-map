import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Phone, Mail, MapPin, Users, ChevronDown, ChevronUp, Calendar } from 'lucide-react'

interface IndividualOwnerDetailsProps {
  owner: any
  ownerDetailsData?: any
}

export function IndividualOwnerDetails({ owner, ownerDetailsData }: IndividualOwnerDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const personDetails = ownerDetailsData['Person Details']?.[0] || {}
  const currentAddress = ownerDetailsData['Current Address Details List']?.[0] || {}
  const phoneDetails = ownerDetailsData['All Phone Details'] || []
  const emailAddresses = ownerDetailsData['Email Addresses'] || []
  const previousAddresses = ownerDetailsData['Previous Address Details'] || []
  const relatives = ownerDetailsData['All Relatives'] || []
  const associates = ownerDetailsData['All Associates'] || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5" />
          Primary Owner Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Personal Information</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">
                  {owner.owner1?.fullName || personDetails?.Person_name || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Age:</span>
                <span className="font-medium">{personDetails?.Age || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Born:</span>
                <span className="font-medium">{personDetails?.Born || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Location:</span>
                <span className="font-medium">{personDetails['Lives in'] || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Contact Information</h4>
            <div className="space-y-2">
              {phoneDetails.length > 0 && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{phoneDetails[0]?.phone_number}</span>
                  <Badge variant="outline" className="text-xs">
                    {phoneDetails[0]?.phone_type}
                  </Badge>
                </div>
              )}
              {emailAddresses.length > 0 && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{emailAddresses[0]}</span>
                </div>
              )}
              {currentAddress?.street_address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <div>{currentAddress?.street_address}</div>
                    <div className="text-muted-foreground">
                      {currentAddress?.address_locality}, {currentAddress?.address_region}{' '}
                      {currentAddress?.postal_code}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {currentAddress?.date_range}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              View Detailed Information
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {previousAddresses.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Address History
                </h4>
                <div className="space-y-2">
                  {previousAddresses.map((address: any, index: number) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-md">
                      <div className="text-sm font-medium">{address?.streetAddress}</div>
                      <div className="text-sm text-muted-foreground">
                        {address?.addressLocality}, {address?.addressRegion} {address?.postalCode}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {address?.county} • {address?.timespan}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {phoneDetails.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Numbers
                </h4>
                <div className="space-y-2">
                  {phoneDetails.map((phone: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                    >
                      <div>
                        <div className="text-sm font-medium">{phone?.phone_number}</div>
                        <div className="text-xs text-muted-foreground">{phone?.provider}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {phone?.phone_type}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {phone?.last_reported}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {relatives.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Relatives
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {relatives.map((relative: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                    >
                      <div>
                        <div className="text-sm font-medium">{relative?.Name}</div>
                        <div className="text-xs text-muted-foreground">Age: {relative?.Age}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {associates.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Associates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {associates.map((associate: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                    >
                      <div>
                        <div className="text-sm font-medium">{associate?.Name}</div>
                        <div className="text-xs text-muted-foreground">Age: {associate?.Age}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
