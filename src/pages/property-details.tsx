import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PropertyInfoTab from '@/components/property-info-tab'
import { propertyData } from '@/mockProperty'
import { transportationData } from '@/mockTransportation'
import AdvancedInfoTab from '@/components/advanced-property-tab'
import { advancedPropertyData } from '@/mockZillowData'

const PropertyDetails = () => {
  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Property Details</h1>

      <Tabs defaultValue="property-info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="property-info">Property Info</TabsTrigger>
          <TabsTrigger value="advanced-info">Advanced Info</TabsTrigger>
          <TabsTrigger value="ownership-details">Ownership Details</TabsTrigger>
        </TabsList>

        <TabsContent value="property-info">
          <PropertyInfoTab
            propertyData={propertyData.property[0]}
            transportationData={transportationData.transportationNoise}
          />
        </TabsContent>

        <TabsContent value="advanced-info">
          <AdvancedInfoTab propertyData={advancedPropertyData} />
        </TabsContent>

        <TabsContent value="ownership-details">
          <div className="rounded-lg border p-8 text-center">
            Ownership details will be displayed here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyDetails
