import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Mock data for locations
const mockLocations = [
  {
    id: 1,
    name: 'Golden Gate Bridge',
    description: 'Iconic suspension bridge in San Francisco',
    lat: 37.8199,
    lng: -122.4783,
    type: 'landmark',
  },
  {
    id: 2,
    name: 'Central Park',
    description: 'Urban park in New York City',
    lat: 40.7829,
    lng: -73.9654,
    type: 'park',
  },
  {
    id: 3,
    name: 'Grand Canyon',
    description: 'Steep-sided canyon carved by the Colorado River',
    lat: 36.0544,
    lng: -112.1401,
    type: 'natural',
  },
  // Add more mock locations as needed
]

// Map bounds for US
const US_BOUNDS = L.latLngBounds(
  L.latLng(24.396308, -125.0), // Southwest
  L.latLng(49.384358, -66.93457) // Northeast
)

// Component to handle map bounds
function MapBounds() {
  const map = useMap()

  useEffect(() => {
    map.setMaxBounds(US_BOUNDS)
    map.setMinZoom(3)
    map.setMaxZoom(18)
  }, [map])

  return null
}

// Component to handle map view changes
function MapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null
}

export default function SearchPlace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [mapView, setMapView] = useState<'street' | 'satellite'>('street')
  const [selectedLocation, setSelectedLocation] = useState<(typeof mockLocations)[0] | null>(null)
  const [filteredLocations, setFilteredLocations] = useState(mockLocations)
  const mapRef = useRef<L.Map>(null)

  // Filter locations based on search query and type
  useEffect(() => {
    const filtered = mockLocations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || location.type === selectedType
      return matchesSearch && matchesType
    })
    setFilteredLocations(filtered)
  }, [searchQuery, selectedType])

  // Handle location card click
  const handleLocationClick = (location: (typeof mockLocations)[0]) => {
    setSelectedLocation(location)
    if (mapRef.current) {
      mapRef.current.setView([location.lat, location.lng], 13)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Map Container */}
      <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative">
        <MapContainer
          center={[39.8283, -98.5795]} // Center of US
          zoom={4}
          className="w-full h-full"
          ref={mapRef}
        >
          <MapBounds />
          {selectedLocation && (
            <MapView center={[selectedLocation.lat, selectedLocation.lng]} zoom={13} />
          )}

          <TileLayer
            url={
              mapView === 'street'
                ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            }
            attribution={
              mapView === 'street'
                ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                : '&copy; <a href="https://www.esri.com/">Esri</a>'
            }
          />

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{location.name}</h3>
                  <p>{location.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Side Panel */}
      <div className="w-full lg:w-1/3 h-1/2 lg:h-full p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {/* Search and Filter Controls */}
          <div className="space-y-2">
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="landmark">Landmarks</SelectItem>
                <SelectItem value="park">Parks</SelectItem>
                <SelectItem value="natural">Natural</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={mapView === 'street' ? 'default' : 'outline'}
                onClick={() => setMapView('street')}
              >
                Street View
              </Button>
              <Button
                variant={mapView === 'satellite' ? 'default' : 'outline'}
                onClick={() => setMapView('satellite')}
              >
                Satellite View
              </Button>
            </div>
          </div>

          {/* Location Cards */}
          <div className="space-y-4">
            {filteredLocations.map((location) => (
              <Card
                key={location.id}
                className={`cursor-pointer transition-all ${
                  selectedLocation?.id === location.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleLocationClick(location)}
              >
                <CardHeader>
                  <CardTitle>{location.name}</CardTitle>
                  <CardDescription>{location.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{location.description}</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLocationClick(location)
                    }}
                  >
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
