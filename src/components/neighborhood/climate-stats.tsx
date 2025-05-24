import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Thermometer, Cloud, Droplets, Snowflake, Sun } from 'lucide-react'

interface ClimateStatsProps {
  climate: any
}

export function ClimateStats({ climate }: ClimateStatsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Climate Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
            <Thermometer className="h-6 w-6 mb-2 text-amber-500" />
            <span className="text-lg font-bold">{climate?.annual_Avg_Temp || 'N/A'}°F</span>
            <span className="text-xs text-muted-foreground text-center">Average Temperature</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
            <Sun className="h-6 w-6 mb-2 text-yellow-500" />
            <span className="text-lg font-bold">{climate?.possible_Sunshine_Pct || 'N/A'}%</span>
            <span className="text-xs text-muted-foreground text-center">Sunshine</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
            <Cloud className="h-6 w-6 mb-2 text-blue-400" />
            <span className="text-lg font-bold">{climate?.sky_Cover_Mean || 'N/A'}/10</span>
            <span className="text-xs text-muted-foreground text-center">Cloud Cover</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
            <Droplets className="h-6 w-6 mb-2 text-blue-500" />
            <span className="text-lg font-bold">{climate?.annual_Precip_In || 'N/A'}</span>
            <span className="text-xs text-muted-foreground text-center">Annual Precipitation</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
            <Snowflake className="h-6 w-6 mb-2 text-sky-300" />
            <span className="text-lg font-bold">{climate?.annual_Snowfall_In || 'N/A'}</span>
            <span className="text-xs text-muted-foreground text-center">Annual Snowfall</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Clear Days</div>
            <div className="text-lg font-medium">{climate?.clear_Day_Mean || 'N/A'}</div>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Rainy Days</div>
            <div className="text-lg font-medium">{climate?.rainy_Day_Mean || 'N/A'}</div>
          </div>
          <div className="p-3 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Snowy Days</div>
            <div className="text-lg font-medium">{climate?.snow_Day_Mean || 'N/A'}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
