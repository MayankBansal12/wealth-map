import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
const geoCodeApiKey = import.meta.env.VITE_GEOCODE_API_KEY

interface GeocodeFeature {
  type: string
  geometry: {
    type: string
    coordinates: [number, number]
  }
  properties: {
    id: string
    name: string
    country: string
    country_code: string
    region: string
    label: string
    layer: string
  }
  bbox: [number, number, number, number]
}

interface GeocodeResponse {
  features: GeocodeFeature[]
}

interface UseGeocodeSearchProps {
  debounceMs?: number
}

export function useGeocodeSearch({ debounceMs = 300 }: UseGeocodeSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeocodeFeature[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debouncedQuery = useDebounce(query, debounceMs)

  const searchPlaces = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.geocode.earth/v1/autocomplete?api_key=${geoCodeApiKey}&text=${encodeURIComponent(
            searchQuery
          )}&boundary.country=US%2CCA%2CMX&size=7`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch geocoding results')
        }

        const data: GeocodeResponse = await response.json()
        setResults(data.features)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [geoCodeApiKey]
  )

  useEffect(() => {
    searchPlaces(debouncedQuery)
  }, [debouncedQuery, searchPlaces])

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  }
}
