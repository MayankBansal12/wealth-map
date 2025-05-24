import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Home,
  Calendar,
  Ruler,
  Thermometer,
  Droplets,
  Warehouse,
  Hammer,
  Car,
  Trees,
  Lightbulb,
} from 'lucide-react'

interface PropertyFactsProps {
  propertyData: any
}

export function PropertyFacts({ propertyData }: PropertyFactsProps) {
  const resoFacts = propertyData.resoFacts || {}
  const description = propertyData.description || ''

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Home className="h-5 w-5" />
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {description && (
          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{description}</p>
          </div>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="py-2">
              Overview
            </TabsTrigger>
            <TabsTrigger value="interior" className="py-2">
              Interior
            </TabsTrigger>
            <TabsTrigger value="exterior" className="py-2">
              Exterior
            </TabsTrigger>
            <TabsTrigger value="systems" className="py-2">
              Systems
            </TabsTrigger>
            <TabsTrigger value="other" className="py-2">
              Other
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Basic Information</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Type</div>
                      <div>{resoFacts.propertySubType?.[0] || 'Single Family'}</div>
                      <div className="text-muted-foreground">Year Built</div>
                      <div>{resoFacts.yearBuilt || propertyData.yearBuilt || 'N/A'}</div>
                      <div className="text-muted-foreground">Stories</div>
                      <div>{resoFacts.stories || 'N/A'}</div>
                      <div className="text-muted-foreground">Style</div>
                      <div>{resoFacts.architecturalStyle || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Ruler className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Size & Layout</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Living Area</div>
                      <div>
                        {resoFacts.livingArea || propertyData.livingArea + ' sqft' || 'N/A'}
                      </div>
                      <div className="text-muted-foreground">Lot Size</div>
                      <div>{resoFacts.lotSize || propertyData.lotSize + ' sqft' || 'N/A'}</div>
                      <div className="text-muted-foreground">Bedrooms</div>
                      <div>{resoFacts.bedrooms || propertyData.bedrooms || 'N/A'}</div>
                      <div className="text-muted-foreground">Bathrooms</div>
                      <div>
                        {resoFacts.bathroomsFull || propertyData.bathrooms || 'N/A'}
                        {resoFacts.bathroomsHalf > 0 && ` + ${resoFacts.bathroomsHalf} half`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Parking</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Garage Spaces</div>
                      <div>{resoFacts.garageParkingCapacity || 'N/A'}</div>
                      <div className="text-muted-foreground">Total Spaces</div>
                      <div>{resoFacts.parkingCapacity || 'N/A'}</div>
                      <div className="text-muted-foreground">Garage Type</div>
                      <div>{resoFacts.hasAttachedGarage ? 'Attached' : 'Detached'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trees className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Lot Features</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.lotFeatures?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {feature}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">No lot features listed</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interior" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Warehouse className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Interior Features</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.interiorFeatures?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {feature}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">
                          No interior features listed
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hammer className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Construction</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Materials</div>
                      <div>{resoFacts.constructionMaterials?.join(', ') || 'N/A'}</div>
                      <div className="text-muted-foreground">Roof</div>
                      <div>{resoFacts.roofType || 'N/A'}</div>
                      <div className="text-muted-foreground">Foundation</div>
                      <div>{resoFacts.foundationDetails?.join(', ') || 'N/A'}</div>
                      <div className="text-muted-foreground">Flooring</div>
                      <div>{resoFacts.flooring?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Heating & Cooling</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Heating</div>
                      <div>{resoFacts.heating?.join(', ') || 'N/A'}</div>
                      <div className="text-muted-foreground">Cooling</div>
                      <div>{resoFacts.cooling?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Appliances</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.appliances?.map((appliance: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {appliance}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">No appliances listed</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="exterior" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Trees className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Exterior Features</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.exteriorFeatures?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {feature}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">
                          No exterior features listed
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Patio & Porch</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.patioAndPorchFeatures?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {feature}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">
                          No patio/porch features listed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Water & Sewer</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Water Source</div>
                      <div>{resoFacts.waterSource?.join(', ') || 'N/A'}</div>
                      <div className="text-muted-foreground">Sewer</div>
                      <div>{resoFacts.sewer?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Parking Features</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.parkingFeatures?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {feature}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">
                          No parking features listed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="systems" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Heating System</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Type</div>
                      <div>{resoFacts.heating?.join(', ') || 'N/A'}</div>
                      <div className="text-muted-foreground">Has Fireplace</div>
                      <div>{resoFacts.hasFireplace ? 'Yes' : 'No'}</div>
                      {resoFacts.hasFireplace && (
                        <>
                          <div className="text-muted-foreground">Fireplace Features</div>
                          <div>{resoFacts.fireplaceFeatures?.join(', ') || 'N/A'}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Windows</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resoFacts.windowFeatures?.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="font-normal">
                          {feature}
                        </Badge>
                      )) || (
                        <div className="text-sm text-muted-foreground">
                          No window features listed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Utilities</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Water</div>
                      <div>{resoFacts.waterSource?.join(', ') || 'N/A'}</div>
                      <div className="text-muted-foreground">Sewer</div>
                      <div>{resoFacts.sewer?.join(', ') || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Warehouse className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Basement</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Has Basement</div>
                      <div>{resoFacts.basementYN ? 'Yes' : 'No'}</div>
                      <div className="text-muted-foreground">Basement Type</div>
                      <div>{resoFacts.basement || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="other" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Listing Information</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">MLS ID</div>
                      <div>{propertyData.mlsid || 'N/A'}</div>
                      <div className="text-muted-foreground">Days on Market</div>
                      <div>{propertyData.daysOnZillow || 'N/A'}</div>
                      <div className="text-muted-foreground">Date Posted</div>
                      <div>{propertyData.datePostedString || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Property Condition</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Condition</div>
                      <div>{resoFacts.propertyCondition || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Hammer className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Zoning</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Zoning</div>
                      <div>{resoFacts.zoning || 'N/A'}</div>
                      <div className="text-muted-foreground">Parcel Number</div>
                      <div>{resoFacts.parcelNumber || propertyData.parcelId || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Tax Information</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                      <div className="text-muted-foreground">Annual Tax</div>
                      <div>${resoFacts.taxAnnualAmount?.toLocaleString() || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
