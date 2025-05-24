import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js'
import { Badge } from '@/components/ui/badge'
import { Home, Building, Calendar } from 'lucide-react'

ChartJS.register(ArcElement, ChartTooltip, ChartLegend)

interface HousingStatsProps {
  demographics: any
}

export function HousingStats({ demographics }: HousingStatsProps) {
  const housingTenureData = {
    labels: ['Owner Occupied', 'Renter Occupied', 'Vacant'],
    datasets: [
      {
        data: [
          demographics?.housing_Owner_Households_With_Mortgage_Pct || 0,
          100 -
            (demographics?.housing_Owner_Households_With_Mortgage_Pct || 0) -
            (demographics?.housing_Units_Vacant_Pct || 0),
          demographics?.housing_Units_Vacant_Pct || 0,
        ],
        backgroundColor: ['#3b82f6', '#f97316', '#d1d5db'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  }

  const housingAgeData = {
    labels: [
      '2010 or Later',
      '2000-2009',
      '1990-1999',
      '1980-1989',
      '1970-1979',
      '1960-1969',
      '1950-1959',
      '1940-1949',
      'Before 1939',
    ],
    datasets: [
      {
        data: [
          demographics?.housing_Built_2010_Or_Later_Pct || 0,
          demographics?.housing_Built_2000_2009_Pct || 0,
          demographics?.housing_Built_1990_1999_Pct || 0,
          demographics?.housing_Built_1980_1989_Pct || 0,
          demographics?.housing_Built_1970_1979_Pct || 0,
          demographics?.housing_Built_1960_1969_Pct || 0,
          demographics?.housing_Built_1950_1959_Pct || 0,
          demographics?.housing_Built_1940_1949_Pct || 0,
          demographics?.housing_Built_1939_Or_Earlier_Pct || 0,
        ],
        backgroundColor: [
          '#3b82f6',
          '#60a5fa',
          '#93c5fd',
          '#bfdbfe',
          '#dbeafe',
          '#f0f9ff',
          '#e0f2fe',
          '#bae6fd',
          '#7dd3fc',
        ],
        borderColor: [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Home className="h-5 w-5" />
            Housing Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Units</p>
                <p className="text-xl font-bold">
                  {demographics?.housing_Units?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Median Built Year</p>
                <p className="text-xl font-bold">
                  {demographics?.housing_Median_Built_Yr || 'N/A'}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Median Home Value</p>
              <p className="text-xl font-bold">
                ${demographics?.housing_Owner_Households_Median_Value?.toLocaleString() || 'N/A'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Household Size</p>
              <div className="flex gap-2">
                <Badge variant="outline">Avg: {demographics?.household_Size_Avg || 'N/A'}</Badge>
                <Badge variant="outline">
                  Median: {demographics?.median_Household_Size || 'N/A'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Building className="h-5 w-5" />
            Housing Tenure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <Doughnut
              data={housingTenureData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 15,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context?.label}: ${context?.raw}%`,
                    },
                  },
                },
                cutout: '60%',
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Housing Age
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <Doughnut
              data={housingAgeData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 15,
                      font: {
                        size: 10,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context?.label}: ${context?.raw}%`,
                    },
                  },
                },
                cutout: '60%',
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
