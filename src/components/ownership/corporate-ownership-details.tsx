import { Building, MapPin, Mail, Users, DollarSign, Globe, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface CorporateOwnerDetailsProps {
  owner: any
  companyDetailsData?: any
}

export function CorporateOwnerDetails({ owner, companyDetailsData }: CorporateOwnerDetailsProps) {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Details
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Detailed company data will be available soon for this property</p>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {companyDetailsData?.logo ? (
                <img
                  src={companyDetailsData?.logo || '/placeholder.svg'}
                  alt={companyDetailsData?.company_name}
                  className="w-full h-full object-contain blur-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <Building className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">
                {owner?.owner1?.fullName || companyDetailsData?.company_name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 blur-sm">
                {companyDetailsData?.description?.substring(0, 150)}...
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="blur-sm">
                  {companyDetailsData?.industry}
                </Badge>
                <Badge variant="outline" className="blur-sm">
                  {companyDetailsData?.type}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Information
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded:</span>
                    <span className="font-medium blur-sm">
                      {companyDetailsData?.year_founded || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span className="font-medium blur-sm">
                      {companyDetailsData?.industry || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium capitalize blur-sm">
                      {companyDetailsData?.type || 'N/A'}
                    </span>
                  </div>
                  {companyDetailsData?.ticker && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ticker:</span>
                      <span className="font-medium blur-sm">
                        {companyDetailsData?.ticker} ({companyDetailsData?.exchange})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address Information
                </h4>
                <div className="text-sm">
                  <div className="font-medium">Registered Address:</div>
                  <div className="text-muted-foreground blur-sm">
                    {owner?.mailingAddressOneLine || 'Not available'}
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-medium">Corporate Headquarters:</div>
                  <div className="text-muted-foreground blur-sm">
                    {companyDetailsData?.street_address}
                    <br />
                    {companyDetailsData?.city}, {companyDetailsData?.state}{' '}
                    {companyDetailsData?.postal_code}
                    <br />
                    {companyDetailsData?.country}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Company Size
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Employees:</span>
                    <span className="font-medium blur-sm">
                      {companyDetailsData?.employee_count?.toLocaleString() || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Range:</span>
                    <span className="font-medium blur-sm">
                      {companyDetailsData?.employee_range || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Financial Information
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Revenue:</span>
                    <span className="font-medium blur-sm">
                      $
                      {(Number.parseInt(companyDetailsData?.annual_revenue) / 1000000000).toFixed(
                        1
                      )}
                      B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue Range:</span>
                    <span className="font-medium blur-sm">
                      {companyDetailsData?.revenue_range || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Information
                </h4>
                <div className="space-y-1 text-sm">
                  {companyDetailsData?.phone_numbers?.[0] && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium blur-sm">
                        {companyDetailsData?.phone_numbers[0]}
                      </span>
                    </div>
                  )}
                  {companyDetailsData?.email_addresses?.[0] && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium blur-sm">
                        {companyDetailsData?.email_addresses[0]}
                      </span>
                    </div>
                  )}
                  {companyDetailsData?.domain && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Website:</span>
                      <span className="font-medium blur-sm">{companyDetailsData?.domain}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {companyDetailsData?.tags && companyDetailsData?.tags.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Industry Tags</h4>
              <div className="flex flex-wrap gap-2">
                {companyDetailsData?.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Online Presence
            </h4>
            <div className="flex flex-wrap gap-2">
              {companyDetailsData?.linkedin_url && (
                <Badge variant="outline" className="text-xs blur-sm">
                  LinkedIn
                </Badge>
              )}
              {companyDetailsData?.facebook_url && (
                <Badge variant="outline" className="text-xs blur-sm">
                  Facebook
                </Badge>
              )}
              {companyDetailsData?.twitter_url && (
                <Badge variant="outline" className="text-xs blur-sm">
                  Twitter
                </Badge>
              )}
              {companyDetailsData?.instagram_url && (
                <Badge variant="outline" className="text-xs blur-sm">
                  Instagram
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
