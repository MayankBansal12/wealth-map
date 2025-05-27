import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Calendar,
  ExternalLink,
} from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

interface IndividualOwnerProfileProps {
  isLoading?: any
  error?: any
  ownerDetailsData?: any
}

export function IndividualOwnerProfile({
  isLoading,
  error,
  ownerDetailsData,
}: IndividualOwnerProfileProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const personDetails = ownerDetailsData?.['Person Details']?.[0] || {}
  const currentAddress = ownerDetailsData?.['Current Address Details List']?.[0] || {}
  const phoneDetails = ownerDetailsData?.['All Phone Details'] || []
  const emailAddresses = ownerDetailsData?.['Email Addresses'] || []
  const previousAddresses = ownerDetailsData?.['Previous Address Details'] || []
  const relatives = ownerDetailsData?.['All Relatives'] || []
  const associates = ownerDetailsData?.['All Associates'] || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5" />
          Primary Owner Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex gap-2">
            <h2>Fetching advanced data...it may time and might be unreliable</h2>
            <Skeleton className="h-40 w-full my-4" />
          </div>
        ) : error || (!isLoading && !ownerDetailsData) ? (
          <div className="text-center p-4 my-4 text-muted-foreground">
            Owner Details are not available for this property! We are working on it, sorry for the
            inconvience!
          </div>
        ) : (
          <>
            <div className="p-4 bg-gradient-to-r light:from-blue-50 to-indigo-50 dark:bg-secondary rounded-lg border">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{personDetails.Person_name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Age: {personDetails.Age}</span>
                    <span>•</span>
                    <span>{personDetails['Lives in']}</span>
                  </div>
                  {personDetails.Born && (
                    <div className="text-sm text-muted-foreground">Born: {personDetails.Born}</div>
                  )}
                </div>
                {personDetails.Link && (
                  <Button variant="outline" size="sm" className="shrink-0">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Profile
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contact Information
                </h4>
                <div className="space-y-3">
                  {phoneDetails.map((phone: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                    >
                      <div>
                        <div className="font-medium">{phone?.phone_number}</div>
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

                  {emailAddresses.map((email: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{email}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Current Address
                </h4>
                {currentAddress?.street_address && (
                  <div className="p-3 bg-muted/30 rounded-md">
                    <div className="font-medium">{currentAddress?.street_address}</div>
                    <div className="text-sm text-muted-foreground">
                      {currentAddress?.address_locality}, {currentAddress?.address_region}{' '}
                      {currentAddress?.postal_code}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {currentAddress?.county} • {currentAddress?.date_range}
                    </div>
                  </div>
                )}

                {/* <div className="space-y-2">
                            <h5 className="text-sm font-medium">Previous Locations</h5>
                            <div className="text-sm text-muted-foreground">
                                {searchResult["Used to live in"]}
                            </div>
                        </div> */}
              </div>
            </div>

            <Separator />

            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  View Detailed Background Information
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-6 mt-6">
                {previousAddresses.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Complete Address History
                    </h4>
                    <div className="space-y-3">
                      {previousAddresses.map((address: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="font-medium">{address?.streetAddress}</div>
                          <div className="text-sm text-muted-foreground">
                            {address?.addressLocality}, {address?.addressRegion}{' '}
                            {address?.postalCode}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant="outline" className="text-xs">
                              {address?.county}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {address?.timespan}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatives.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Family Members ({relatives.length})
                      </h4>
                      <div className="space-y-2">
                        {relatives.map((relative: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md"
                          >
                            <div>
                              <div className="font-medium">{relative?.Name}</div>
                              <div className="text-xs text-muted-foreground">
                                Age: {relative?.Age}
                              </div>
                            </div>
                            {relative?.['Person Link'] && (
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {associates.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Known Associates ({associates.length})
                      </h4>
                      <div className="space-y-2">
                        {associates.map((associate: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md"
                          >
                            <div>
                              <div className="font-medium">{associate?.Name}</div>
                              <div className="text-xs text-muted-foreground">
                                Age: {associate?.Age}
                              </div>
                            </div>
                            {associate?.['Person Link'] && (
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data Sources:</strong> Third party scrappers •
                    {/* Last Updated: {new Date().toLocaleDateString()} */}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}
      </CardContent>
    </Card>
  )
}
