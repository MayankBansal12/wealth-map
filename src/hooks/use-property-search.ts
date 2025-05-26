import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePropertySearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [userClickedLocation, setUserClickedLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const propType = searchParams.get('propType')
    const query = searchParams.get('q')

    if (lat && lng) {
      setUserClickedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) })
    }
    if (propType) setSelectedPropertyType(propType)
    if (query) setSearchQuery(query)
  }, [searchParams])

  useEffect(() => {
    if (userClickedLocation) {
      searchParams.set('lat', userClickedLocation.lat.toString())
      searchParams.set('lng', userClickedLocation.lng.toString())
    }
    if (selectedPropertyType !== 'all') searchParams.set('propType', selectedPropertyType)
    else searchParams.delete('propType')
    if (searchQuery) searchParams.set('q', searchQuery)

    setSearchParams(searchParams)
  }, [userClickedLocation, selectedPropertyType, searchQuery])

  return {
    userClickedLocation,
    setUserClickedLocation,
    selectedPropertyType,
    setSelectedPropertyType,
    searchQuery,
    setSearchQuery,
  }
}
