import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface IncomeDistributionProps {
  demographics: any
}

export function IncomeDistribution({ demographics }: IncomeDistributionProps) {
  const incomeGroups = [
    { name: '<$15K', value: demographics?.households_Income_Less_Than_15000_Pct || 0 },
    { name: '$15-25K', value: demographics?.households_Income_15000_24999_Pct || 0 },
    { name: '$25-35K', value: demographics?.households_Income_25000_34999_Pct || 0 },
    { name: '$35-50K', value: demographics?.households_Income_35000_49999_Pct || 0 },
    { name: '$50-75K', value: demographics?.households_Income_50000_74999_Pct || 0 },
    { name: '$75-100K', value: demographics?.households_Income_75000_99999_Pct || 0 },
    { name: '$100-125K', value: demographics?.households_Income_100000_124999_Pct || 0 },
    { name: '$125-150K', value: demographics?.households_Income_125000_149999_Pct || 0 },
    { name: '$150-200K', value: demographics?.households_Income_150000_199999_Pct || 0 },
    { name: '$200K+', value: demographics?.households_Income_200000_And_Over_Pct || 0 },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Household Income Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={incomeGroups}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              barCategoryGap="20%"
            >
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                formatter={(value) => [`${Number(value)?.toFixed(1)}%`, 'Households']}
                labelFormatter={(label) => `Income: ${label}`}
              />
              <Bar dataKey="value" name="Households" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
