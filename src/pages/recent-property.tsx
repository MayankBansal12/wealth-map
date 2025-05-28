import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  Bookmark,
  ExternalLink,
  Car,
} from 'lucide-react'

const sampleProperties = [
  {
    propertyProfile: {
      identifier: { Id: 22299, fips: '42043', apn: '35-104-153', attomId: 22299 },
      address: {
        line1: '1165 WINTERTIDE DR',
        locality: 'HARRISBURG',
        countrySubd: 'PA',
        postal1: '17111',
        oneLine: '1165 WINTERTIDE DR, HARRISBURG, PA 17111',
      },
      summary: {
        archStyle: 'TOWNHOUSE',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1986,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 1662,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 2, bathsPartial: 1, bathsTotal: 3, beds: 3 },
        parking: { parkingSpaces: 2 },
      },
      assessment: {
        market: {
          mktTtlValue: 89800,
        },
      },
      vintage: { lastModified: '2025-03-06' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: 'https://photos.zillowstatic.com/fp/223d2b9c2aa0d9ebe9aa9f6ed88540a2-d_d.jpg',
                width: 800,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 712000,
      zestimate: 714300,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 111904 },
      address: {
        line1: '502 N ALTA DR',
        locality: 'BEVERLY HILLS',
        countrySubd: 'CA',
        postal1: '90210',
        oneLine: '502 N ALTA DR, BEVERLY HILLS, CA 90210',
      },
      summary: {
        archStyle: 'CONTEMPORARY',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1995,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 3200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 3, bathsPartial: 1, bathsTotal: 4, beds: 4 },
        parking: { parkingSpaces: 3 },
      },
      assessment: {
        market: {
          mktTtlValue: 2500000,
        },
      },
      vintage: { lastModified: '2024-10-02' },
    },
    advancedInfo: {
      originalPhotos: null,
      lastSoldPrice: 2400000,
      zestimate: 2550000,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 533478 },
      address: {
        line1: '124 W 81ST ST',
        locality: 'NEW YORK',
        countrySubd: 'NY',
        postal1: '10024',
        oneLine: '124 W 81ST ST, NEW YORK, NY 10024',
      },
      summary: {
        archStyle: 'APARTMENT',
        propertyType: 'CONDOMINIUM',
        yearBuilt: 1920,
        propType: 'CONDO',
      },
      building: {
        size: {
          livingSize: 1200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 1, bathsPartial: 1, bathsTotal: 2, beds: 2 },
        parking: { parkingSpaces: 0 },
      },
      assessment: {
        market: {
          mktTtlValue: 1200000,
        },
      },
      vintage: { lastModified: '2024-06-17' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: '/placeholder.svg?height=300&width=400',
                width: 400,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 1150000,
      zestimate: 1225000,
    },
  },

  {
    propertyProfile: {
      identifier: { Id: 22299, fips: '42043', apn: '35-104-153', attomId: 22299 },
      address: {
        line1: '1165 WINTERTIDE DR',
        locality: 'HARRISBURG',
        countrySubd: 'PA',
        postal1: '17111',
        oneLine: '1165 WINTERTIDE DR, HARRISBURG, PA 17111',
      },
      summary: {
        archStyle: 'TOWNHOUSE',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1986,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 1662,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 2, bathsPartial: 1, bathsTotal: 3, beds: 3 },
        parking: { parkingSpaces: 2 },
      },
      assessment: {
        market: {
          mktTtlValue: 89800,
        },
      },
      vintage: { lastModified: '2025-03-06' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: 'https://photos.zillowstatic.com/fp/223d2b9c2aa0d9ebe9aa9f6ed88540a2-d_d.jpg',
                width: 800,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 712000,
      zestimate: 714300,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 111904 },
      address: {
        line1: '502 N ALTA DR',
        locality: 'BEVERLY HILLS',
        countrySubd: 'CA',
        postal1: '90210',
        oneLine: '502 N ALTA DR, BEVERLY HILLS, CA 90210',
      },
      summary: {
        archStyle: 'CONTEMPORARY',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1995,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 3200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 3, bathsPartial: 1, bathsTotal: 4, beds: 4 },
        parking: { parkingSpaces: 3 },
      },
      assessment: {
        market: {
          mktTtlValue: 2500000,
        },
      },
      vintage: { lastModified: '2024-10-02' },
    },
    advancedInfo: {
      originalPhotos: null,
      lastSoldPrice: 2400000,
      zestimate: 2550000,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 533478 },
      address: {
        line1: '124 W 81ST ST',
        locality: 'NEW YORK',
        countrySubd: 'NY',
        postal1: '10024',
        oneLine: '124 W 81ST ST, NEW YORK, NY 10024',
      },
      summary: {
        archStyle: 'APARTMENT',
        propertyType: 'CONDOMINIUM',
        yearBuilt: 1920,
        propType: 'CONDO',
      },
      building: {
        size: {
          livingSize: 1200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 1, bathsPartial: 1, bathsTotal: 2, beds: 2 },
        parking: { parkingSpaces: 0 },
      },
      assessment: {
        market: {
          mktTtlValue: 1200000,
        },
      },
      vintage: { lastModified: '2024-06-17' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: '/placeholder.svg?height=300&width=400',
                width: 400,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 1150000,
      zestimate: 1225000,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 22299, fips: '42043', apn: '35-104-153', attomId: 22299 },
      address: {
        line1: '1165 WINTERTIDE DR',
        locality: 'HARRISBURG',
        countrySubd: 'PA',
        postal1: '17111',
        oneLine: '1165 WINTERTIDE DR, HARRISBURG, PA 17111',
      },
      summary: {
        archStyle: 'TOWNHOUSE',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1986,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 1662,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 2, bathsPartial: 1, bathsTotal: 3, beds: 3 },
        parking: { parkingSpaces: 2 },
      },
      assessment: {
        market: {
          mktTtlValue: 89800,
        },
      },
      vintage: { lastModified: '2025-03-06' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: 'https://photos.zillowstatic.com/fp/223d2b9c2aa0d9ebe9aa9f6ed88540a2-d_d.jpg',
                width: 800,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 712000,
      zestimate: 714300,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 111904 },
      address: {
        line1: '502 N ALTA DR',
        locality: 'BEVERLY HILLS',
        countrySubd: 'CA',
        postal1: '90210',
        oneLine: '502 N ALTA DR, BEVERLY HILLS, CA 90210',
      },
      summary: {
        archStyle: 'CONTEMPORARY',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1995,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 3200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 3, bathsPartial: 1, bathsTotal: 4, beds: 4 },
        parking: { parkingSpaces: 3 },
      },
      assessment: {
        market: {
          mktTtlValue: 2500000,
        },
      },
      vintage: { lastModified: '2024-10-02' },
    },
    advancedInfo: {
      originalPhotos: null,
      lastSoldPrice: 2400000,
      zestimate: 2550000,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 533478 },
      address: {
        line1: '124 W 81ST ST',
        locality: 'NEW YORK',
        countrySubd: 'NY',
        postal1: '10024',
        oneLine: '124 W 81ST ST, NEW YORK, NY 10024',
      },
      summary: {
        archStyle: 'APARTMENT',
        propertyType: 'CONDOMINIUM',
        yearBuilt: 1920,
        propType: 'CONDO',
      },
      building: {
        size: {
          livingSize: 1200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 1, bathsPartial: 1, bathsTotal: 2, beds: 2 },
        parking: { parkingSpaces: 0 },
      },
      assessment: {
        market: {
          mktTtlValue: 1200000,
        },
      },
      vintage: { lastModified: '2024-06-17' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: '/placeholder.svg?height=300&width=400',
                width: 400,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 1150000,
      zestimate: 1225000,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 22299, fips: '42043', apn: '35-104-153', attomId: 22299 },
      address: {
        line1: '1165 WINTERTIDE DR',
        locality: 'HARRISBURG',
        countrySubd: 'PA',
        postal1: '17111',
        oneLine: '1165 WINTERTIDE DR, HARRISBURG, PA 17111',
      },
      summary: {
        archStyle: 'TOWNHOUSE',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1986,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 1662,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 2, bathsPartial: 1, bathsTotal: 3, beds: 3 },
        parking: { parkingSpaces: 2 },
      },
      assessment: {
        market: {
          mktTtlValue: 89800,
        },
      },
      vintage: { lastModified: '2025-03-06' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: 'https://photos.zillowstatic.com/fp/223d2b9c2aa0d9ebe9aa9f6ed88540a2-d_d.jpg',
                width: 800,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 712000,
      zestimate: 714300,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 111904 },
      address: {
        line1: '502 N ALTA DR',
        locality: 'BEVERLY HILLS',
        countrySubd: 'CA',
        postal1: '90210',
        oneLine: '502 N ALTA DR, BEVERLY HILLS, CA 90210',
      },
      summary: {
        archStyle: 'CONTEMPORARY',
        propertyType: 'SINGLE FAMILY RESIDENCE',
        yearBuilt: 1995,
        propType: 'SFR',
      },
      building: {
        size: {
          livingSize: 3200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 3, bathsPartial: 1, bathsTotal: 4, beds: 4 },
        parking: { parkingSpaces: 3 },
      },
      assessment: {
        market: {
          mktTtlValue: 2500000,
        },
      },
      vintage: { lastModified: '2024-10-02' },
    },
    advancedInfo: {
      originalPhotos: null,
      lastSoldPrice: 2400000,
      zestimate: 2550000,
    },
  },
  {
    propertyProfile: {
      identifier: { Id: 533478 },
      address: {
        line1: '124 W 81ST ST',
        locality: 'NEW YORK',
        countrySubd: 'NY',
        postal1: '10024',
        oneLine: '124 W 81ST ST, NEW YORK, NY 10024',
      },
      summary: {
        archStyle: 'APARTMENT',
        propertyType: 'CONDOMINIUM',
        yearBuilt: 1920,
        propType: 'CONDO',
      },
      building: {
        size: {
          livingSize: 1200,
          sizeInd: 'LIVING SQFT',
        },
        rooms: { bathsFull: 1, bathsPartial: 1, bathsTotal: 2, beds: 2 },
        parking: { parkingSpaces: 0 },
      },
      assessment: {
        market: {
          mktTtlValue: 1200000,
        },
      },
      vintage: { lastModified: '2024-06-17' },
    },
    advancedInfo: {
      originalPhotos: [
        {
          mixedSources: {
            jpeg: [
              {
                url: '/placeholder.svg?height=300&width=400',
                width: 400,
              },
            ],
          },
        },
      ],
      lastSoldPrice: 1150000,
      zestimate: 1225000,
    },
  },
]

function formatPrice(price: number): string {
  if (price === 0) return 'N/A'
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(0)}K`
  }
  return `$${price.toLocaleString()}`
}

function getPropertyPrice(property: any): number {
  return (
    property.advancedInfo?.zestimate ||
    property.advancedInfo?.lastSoldPrice ||
    property.propertyProfile?.assessment?.market?.mktTtlValue ||
    0
  )
}

function getPropertyImage(property: any): string | null {
  const photos = property.advancedInfo?.originalPhotos
  if (photos && photos.length > 0 && photos[0]?.mixedSources?.jpeg?.length > 0) {
    return photos[0].mixedSources.jpeg[0].url
  }
  return null
}

function PropertyCard({ property }: { property: any }) {
  const profile = property.propertyProfile
  const price = getPropertyPrice(property)
  const imageUrl = getPropertyImage(property)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-0 relative">
        <div className="relative h-48 bg-muted overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Property at ${profile.address.line1}`}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <Home className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {price > 0 && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-background/90 backdrop-blur-sm text-foreground font-semibold"
              >
                {formatPrice(price)}
              </Badge>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background"
          >
            <Bookmark className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
              {profile.summary?.archStyle || profile.summary?.propertyType || 'Property'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>ID: {profile.identifier?.Id || 'N/A'}</span>
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">
            {profile.address?.line1}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{profile.address?.line2}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.building?.rooms?.beds && (
            <div className="flex items-center gap-1 text-sm">
              <Bed className="h-3 w-3 text-muted-foreground" />
              <span>
                {profile.building.rooms.beds} bed{profile.building.rooms.beds !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {profile.building?.rooms?.bathsTotal && (
            <div className="flex items-center gap-1 text-sm">
              <Bath className="h-3 w-3 text-muted-foreground" />
              <span>
                {profile.building.rooms.bathsTotal} bath
                {profile.building.rooms.bathsTotal !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {profile.building?.size?.livingSize && (
            <div className="flex items-center gap-1 text-sm">
              <Square className="h-3 w-3 text-muted-foreground" />
              <span>{profile.building.size.livingSize.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {profile.summary?.yearBuilt && (
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Built {profile.summary.yearBuilt}
            </Badge>
          )}

          {profile.building?.parking?.parkingSpaces > 0 && (
            <Badge variant="outline" className="text-xs">
              <Car className="h-3 w-3 mr-1" />
              {profile.building.parking.parkingSpaces} parking
            </Badge>
          )}
        </div>

        {profile.vintage?.lastModified && (
          <p className="text-xs text-muted-foreground">
            Last Modified: {new Date(profile.vintage.lastModified).toLocaleDateString()}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="default">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Property Details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function RecentProperty() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Trending Properties</h1>
        <p className="text-muted-foreground">
          Showing {sampleProperties?.length} properties from recent searches on the app
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProperties?.map((property, index) => (
          <PropertyCard key={property.propertyProfile.identifier.Id || index} property={property} />
        ))}
      </div>
    </div>
  )
}
