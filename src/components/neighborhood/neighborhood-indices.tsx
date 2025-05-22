import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ShieldAlert, Wind, CloudRain } from 'lucide-react'

interface NeighborhoodIndicesProps {
  crime: any
  airQuality: any
  naturalDisasters: any
}

export function NeighborhoodIndices({
  crime,
  airQuality,
  naturalDisasters,
}: NeighborhoodIndicesProps) {
  const getColorForIndex = (index: number): string => {
    if (index <= 50) return 'bg-green-500'
    if (index <= 80) return 'bg-green-400'
    if (index <= 100) return 'bg-yellow-400'
    if (index <= 150) return 'bg-orange-400'
    return 'bg-red-500'
  }

  const getRiskLevel = (index: number) => {
    if (index <= 50) return 'Very Low'
    if (index <= 80) return 'Low'
    if (index <= 100) return 'Average'
    if (index <= 150) return 'Above Average'
    return 'High'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Crime Indices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Crime</span>
              <span className="font-medium">{Number(crime?.crime_Index) || 'N/A'}</span>
            </div>
            <Progress
              value={Number(crime?.crime_Index)}
              max={200}
              className={`h-2 ${getColorForIndex(Number(crime?.crime_Index) || 0)}`}
            />
            <div className="text-xs text-muted-foreground text-right">
              Risk Level: {getRiskLevel(Number(crime?.crime_Index) || 0)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Violent</span>
                <span className="font-medium">{crime?.aggravated_Assault_Index || 'N/A'}</span>
              </div>
              <Progress
                value={crime?.aggravated_Assault_Index}
                max={200}
                className={`h-2 ${getColorForIndex(crime?.aggravated_Assault_Index || 0)}`}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Property</span>
                <span className="font-medium">{crime?.burglary_Index || 'N/A'}</span>
              </div>
              <Progress
                value={crime?.burglary_Index}
                max={200}
                className={`h-2 ${getColorForIndex(crime?.burglary_Index || 0)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wind className="h-5 w-5" />
            Air Quality
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Air Quality</span>
              <span className="font-medium">{airQuality?.air_Pollution_Index || 'N/A'}</span>
            </div>
            <Progress
              value={airQuality?.air_Pollution_Index}
              max={200}
              className={`h-2 ${getColorForIndex(airQuality?.air_Pollution_Index || 0)}`}
            />
            <div className="text-xs text-muted-foreground text-right">
              Risk Level: {getRiskLevel(airQuality?.air_Pollution_Index || 0)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Ozone</span>
                <span className="font-medium">{airQuality?.ozone_Index || 'N/A'}</span>
              </div>
              <Progress
                value={airQuality?.ozone_Index}
                max={200}
                className={`h-2 ${getColorForIndex(airQuality?.ozone_Index || 0)}`}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Particulate</span>
                <span className="font-medium">{airQuality?.particulate_Matter_Index || 'N/A'}</span>
              </div>
              <Progress
                value={airQuality?.particulate_Matter_Index}
                max={200}
                className={`h-2 ${getColorForIndex(airQuality?.particulate_Matter_Index || 0)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CloudRain className="h-5 w-5" />
            Natural Disaster Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Weather Risk</span>
              <span className="font-medium">{naturalDisasters?.weather_Index || 'N/A'}</span>
            </div>
            <Progress
              value={naturalDisasters?.weather_Index}
              max={200}
              className={`h-2 ${getColorForIndex(naturalDisasters?.weather_Index || 0)}`}
            />
            <div className="text-xs text-muted-foreground text-right">
              Risk Level: {getRiskLevel(naturalDisasters?.weather_Index || 0)}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Tornado</span>
                <span className="font-medium">{naturalDisasters?.tornado_Index || 'N/A'}</span>
              </div>
              <Progress
                value={Math.min(naturalDisasters?.tornado_Index || 0, 200)}
                max={200}
                className={`h-2 ${getColorForIndex(naturalDisasters?.tornado_Index || 0)}`}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Hail</span>
                <span className="font-medium">{naturalDisasters?.hail_Index || 'N/A'}</span>
              </div>
              <Progress
                value={Math.min(naturalDisasters?.hail_Index || 0, 200)}
                max={200}
                className={`h-2 ${getColorForIndex(naturalDisasters?.hail_Index || 0)}`}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Earthquake</span>
                <span className="font-medium">{naturalDisasters?.earthquake_Index || 'N/A'}</span>
              </div>
              <Progress
                value={naturalDisasters?.earthquake_Index}
                max={200}
                className={`h-2 ${getColorForIndex(naturalDisasters?.hail_Index || 0)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
