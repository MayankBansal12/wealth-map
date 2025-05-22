import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, Bed, Bath, Maximize, Flame, Car, Map } from 'lucide-react'

interface PropertyDetailsProps {
  building: any
  lot: any
  utilities: any
}

export function PropertyDetails({ building, lot, utilities }: PropertyDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Basic Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Bed className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-xl font-bold">{building?.rooms?.beds}</span>
            <span className="text-xs text-muted-foreground">Bedrooms</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Bath className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-xl font-bold">{building?.rooms?.bathsTotal}</span>
            <span className="text-xs text-muted-foreground">Bathrooms</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Maximize className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-xl font-bold">
              {building?.size?.livingSize?.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground">Sq Ft Living</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
            <Map className="h-5 w-5 mb-1 text-muted-foreground" />
            <span className="text-xl font-bold">{lot?.lotSize2?.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Sq Ft Lot</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Building Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stories:</span>
              <span>{building?.summary?.levels}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Condition:</span>
              <span>{building?.construction?.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wall Type:</span>
              <span>{building?.construction?.wallType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Improved:</span>
              <span>{building?.construction?.propertyStructureMajorImprovementsYear}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Basement:</span>
              <span>{building?.interior?.bsmtSize} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fireplace:</span>
              <Badge variant="outline" className="h-5 px-2 text-xs">
                <Flame className="h-3 w-3 mr-1" />
                {building?.interior?.fplcCount}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Parking & Utilities</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Parking:</span>
              <div className="flex items-center">
                <Car className="h-3 w-3 mr-1" />
                <span>{building?.parking?.garageType}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Garage Size:</span>
              <span>{building?.parking?.prkgSize} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heating Type:</span>
              <span>{utilities?.heatingType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heating Fuel:</span>
              <span>{utilities?.heatingFuel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Zoning:</span>
              <span>{lot?.siteZoningIdent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pool:</span>
              <span>{lot?.poolType}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
