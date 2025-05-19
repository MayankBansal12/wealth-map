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
import { useReverseGeocode } from '@/hooks/use-reverse-geocode'
import { Separator } from '@/components/ui/separator'
import { usePropertySearch } from '@/hooks/use-property-search'
import { useFetchPropertyAddress } from '@/hooks/use-attom-data'
import { SelectedLocationCard } from '@/components/selected-location-card'
import { PropertySearchResults } from '@/components/property-search-results'
import { propertyTypes } from '@/lib/constant'
import { AttomPropertyData } from '@/type/types'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const greenMarkerIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const US_BOUNDS = L.latLngBounds(L.latLng(24.396308, -125.0), L.latLng(49.384358, -66.93457))

function MapBounds() {
  const map = useMap()

  useEffect(() => {
    map.setMaxBounds(US_BOUNDS)
    map.setMinZoom(3)
    map.setMaxZoom(18)
  }, [map])

  return null
}

function MapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom, map])

  return null
}

function MapClickHandler({ onMapClick }: { onMapClick: (e: L.LeafletMouseEvent) => void }) {
  const map = useMap()

  useEffect(() => {
    map.on('click', onMapClick)
    return () => {
      map.off('click', onMapClick)
    }
  }, [map, onMapClick])

  return null
}

export default function SearchPlace() {
  const {
    userClickedLocation,
    setUserClickedLocation,
    selectedPropertyType,
    setSelectedPropertyType,
    searchQuery,
    setSearchQuery,
  } = usePropertySearch()

  const [mapView, setMapView] = useState<'street' | 'satellite'>('street')
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [accumulatedResults, setAccumulatedResults] = useState<AttomPropertyData[]>([])
  const mapRef = useRef<L.Map>(null)

  const {
    data: reverseGeocodeData,
    isLoading: isReverseGeocodeLoading,
    error: reverseGeocodeError,
  } = useReverseGeocode(
    userClickedLocation?.lat.toString() || '',
    userClickedLocation?.lng.toString() || '',
    !!(userClickedLocation?.lat && userClickedLocation?.lng)
  )

  const {
    data: propertyData,
    isLoading: isPropertyLoading,
    error: propertyError,
  } = useFetchPropertyAddress({
    postalcode: reverseGeocodeData?.components?.postcode || '',
    propertytype: selectedPropertyType === 'all' ? undefined : selectedPropertyType,
    page: currentPage.toString(),
    pagesize: '20',
  })

  useEffect(() => {
    if (propertyData?.property) {
      if (currentPage === 1) {
        setAccumulatedResults(propertyData.property)
      } else {
        setAccumulatedResults((prev) => [...prev, ...propertyData.property])
      }
    }
  }, [propertyData?.property, currentPage])

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const location = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    }
    setUserClickedLocation(location)
    setSelectedProperty(null)
    setCurrentPage(1)
    setAccumulatedResults([])
  }

  const handlePropertyClick = (property: any) => {
    setSelectedProperty(property)
    if (mapRef.current) {
      mapRef.current.setView(
        [parseFloat(property.location.latitude), parseFloat(property.location.longitude)],
        15
      )
    }
  }

  const handlePopularSearchClick = (lat: number, lng: number) => {
    setUserClickedLocation({ lat, lng })
    setCurrentPage(1)
    setAccumulatedResults([])
  }

  const handleLoadMore = () => {
    if (propertyData?.property?.length === 20) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const hasQueryParams = Boolean(userClickedLocation?.lat && userClickedLocation?.lng)
  const hasMore = propertyData?.property?.length === 20

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-2/3 h-1/2 lg:h-full relative">
        <MapContainer center={[39.8283, -98.5795]} zoom={4} className="w-full h-full" ref={mapRef}>
          <MapBounds />
          <MapClickHandler onMapClick={handleMapClick} />
          {selectedProperty && (
            <MapView
              center={[
                parseFloat(selectedProperty.location.latitude),
                parseFloat(selectedProperty.location.longitude),
              ]}
              zoom={15}
            />
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

          {userClickedLocation && (
            <Marker
              position={[userClickedLocation.lat, userClickedLocation.lng]}
              icon={greenMarkerIcon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">Selected Location</h3>
                  <p>
                    {reverseGeocodeData
                      ? `${reverseGeocodeData.formatted}`
                      : "can't track the location!"}
                  </p>
                  <span className="text-xs opacity-70">
                    lat: {userClickedLocation.lat.toFixed(2)}, long:{' '}
                    {userClickedLocation.lng.toFixed(2)}
                  </span>
                </div>
              </Popup>
            </Marker>
          )}

          {accumulatedResults.map((property) => (
            <Marker
              key={property.identifier.Id}
              position={[
                parseFloat(property.location.latitude),
                parseFloat(property.location.longitude),
              ]}
              eventHandlers={{
                click: () => handlePropertyClick(property),
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{property.address.line1}</h3>
                  <p>{property.address.line2}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="w-full lg:w-1/3 h-1/2 lg:h-full p-4 overflow-y-auto bg-opacity-500">
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={selectedPropertyType} onValueChange={setSelectedPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button
                variant={mapView === 'street' ? 'default' : 'outline'}
                onClick={() => setMapView('street')}
              >
                Standard View
              </Button>
              <Button
                variant={mapView === 'satellite' ? 'default' : 'outline'}
                onClick={() => setMapView('satellite')}
              >
                Satellite View
              </Button>
            </div>
          </div>

          {userClickedLocation && (
            <>
              <SelectedLocationCard
                reverseGeocodeData={reverseGeocodeData}
                userClickedLocation={userClickedLocation}
                isLoading={isReverseGeocodeLoading}
                error={reverseGeocodeError}
              />
              <Separator />
            </>
          )}

          <PropertySearchResults
            data={propertyData ? { ...propertyData, property: accumulatedResults } : undefined}
            isLoading={isPropertyLoading}
            error={propertyError}
            onPropertyClick={handlePropertyClick}
            selectedPropertyId={selectedProperty?.identifier?.Id}
            onPopularSearchClick={handlePopularSearchClick}
            hasQueryParams={hasQueryParams}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  )
}
