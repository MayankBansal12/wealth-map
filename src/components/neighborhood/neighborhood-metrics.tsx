import { Card, CardContent } from '@/components/ui/card'
import { Users, Home, DollarSign, Calendar } from 'lucide-react'

interface NeighborhoodMetricsProps {
  demographics: any
}

export function NeighborhoodMetrics({ demographics }: NeighborhoodMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Population</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                {demographics?.population ? demographics?.population?.toLocaleString() : 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground">
                {demographics?.population_Density_Sq_Mi
                  ? `${demographics?.population_Density_Sq_Mi?.toLocaleString()} per sq mi`
                  : ''}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Median Age</span>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                {demographics?.median_Age ? demographics?.median_Age : 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground">
                M: {demographics?.male_Median_Age || 'N/A'} | F:{' '}
                {demographics?.female_Median_Age || 'N/A'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Median Income</span>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                $
                {demographics?.median_Household_Income
                  ? demographics?.median_Household_Income?.toLocaleString()
                  : 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground">
                Per capita: $
                {demographics?.household_Income_Per_Capita
                  ? demographics?.household_Income_Per_Capita?.toLocaleString()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Median Rent</span>
              <Home className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                $
                {demographics?.housing_Median_Rent
                  ? demographics?.housing_Median_Rent?.toLocaleString()
                  : 'N/A'}
              </span>
              <span className="text-xs text-muted-foreground">
                Home value: $
                {demographics?.housing_Owner_Households_Median_Value
                  ? demographics?.housing_Owner_Households_Median_Value?.toLocaleString()
                  : 'N/A'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
