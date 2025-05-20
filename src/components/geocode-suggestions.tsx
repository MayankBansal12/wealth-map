import { Loader2 } from 'lucide-react'

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

interface GeocodeSuggestionsProps {
  results: GeocodeFeature[]
  isLoading: boolean
  error: string | null
  onSelect: (feature: GeocodeFeature) => void
}

export function GeocodeSuggestions({
  results,
  isLoading,
  error,
  onSelect,
}: GeocodeSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Searching...
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-sm text-destructive">Error: {error}</div>
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Try using longer queries for better results
      </div>
    )
  }

  return (
    <div className="absolute z-50 w-full mt-1 bg-popover rounded-md shadow-md">
      <div className="max-h-[300px] overflow-y-auto">
        {results.map((feature) => (
          <button
            key={feature.properties.id}
            className="w-full px-4 py-2 text-left hover:bg-accent hover:text-accent-foreground focus:outline-none focus:bg-accent focus:text-accent-foreground"
            onClick={() => onSelect(feature)}
          >
            <div className="font-medium">{feature.properties.name}</div>
            <div className="text-sm text-muted-foreground">{feature.properties.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
