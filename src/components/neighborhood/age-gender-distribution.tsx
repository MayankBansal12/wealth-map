import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface AgeGenderDistributionProps {
  demographics: any
}

export function AgeGenderDistribution({ demographics }: AgeGenderDistributionProps) {
  const ageGroups = [
    {
      name: '0-5',
      male: demographics?.population_Male_Aged_0_5_Pct || 0,
      female: demographics?.population_Female_Aged_0_5_Pct || 0,
    },
    {
      name: '6-11',
      male: demographics?.population_Male_Aged_6_11_Pct || 0,
      female: demographics?.population_Female_Aged_6_11_Pct || 0,
    },
    {
      name: '12-17',
      male: demographics?.population_Male_Aged_12_17_Pct || 0,
      female: demographics?.population_Female_Aged_12_17_Pct || 0,
    },
    {
      name: '18-24',
      male: demographics?.population_Male_Aged_18_24_Pct || 0,
      female: demographics?.population_Female_Aged_18_24_Pct || 0,
    },
    {
      name: '25-34',
      male: demographics?.population_Male_Aged_25_34_Pct || 0,
      female: demographics?.population_Female_Aged_25_34_Pct || 0,
    },
    {
      name: '35-44',
      male: demographics?.population_Male_Aged_35_44_Pct || 0,
      female: demographics?.population_Female_Aged_35_44_Pct || 0,
    },
    {
      name: '45-54',
      male: demographics?.population_Male_Aged_45_54_Pct || 0,
      female: demographics?.population_Female_Aged_45_54_Pct || 0,
    },
    {
      name: '55-64',
      male: demographics?.population_Male_Aged_55_64_Pct || 0,
      female: demographics?.population_Female_Aged_55_64_Pct || 0,
    },
    {
      name: '65-74',
      male: demographics?.population_Male_Aged_65_74_Pct || 0,
      female: demographics?.population_Female_Aged_65_74_Pct || 0,
    },
    {
      name: '75-84',
      male: demographics?.population_Male_Aged_75_84_Pct || 0,
      female: demographics?.population_Female_Aged_75_84_Pct || 0,
    },
    {
      name: '85+',
      male: demographics?.population_Male_Aged_85P_Pct || 0,
      female: demographics?.population_Female_Aged_85P_Pct || 0,
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Age & Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ageGroups}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              barGap={0}
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
                formatter={(value) => [`${Number(value)?.toFixed(1)}%`, '']}
                labelFormatter={(label) => `Age ${label}`}
              />
              <Legend />
              <Bar dataKey="male" name="Male" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="female" name="Female" fill="#db2777" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
