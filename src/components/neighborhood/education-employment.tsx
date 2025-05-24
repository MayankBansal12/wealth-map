import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
} from 'chart.js'
import { GraduationCap, Briefcase } from 'lucide-react'

ChartJS.register(ArcElement, ChartTooltip, ChartLegend)

interface EducationEmploymentProps {
  demographics: any
}

export function EducationEmployment({ demographics }: EducationEmploymentProps) {
  const educationData = {
    labels: [
      'Some High School',
      'High School',
      'Some College',
      "Associate's",
      "Bachelor's",
      "Master's",
      'Professional',
      'Doctorate',
    ],
    datasets: [
      {
        data: [
          demographics?.education_Some_Hs_Pct || 0,
          demographics?.education_Hs_Pct || 0,
          demographics?.education_Some_College_Pct || 0,
          demographics?.education_Assoc_Degree_Pct || 0,
          demographics?.education_Bach_Degree_Pct || 0,
          demographics?.education_Mast_Degree_Pct || 0,
          demographics?.education_Prof_Degree_Pct || 0,
          demographics?.education_Doct_Degree_Pct || 0,
        ],
        backgroundColor: [
          '#f87171',
          '#fb923c',
          '#fbbf24',
          '#a3e635',
          '#34d399',
          '#22d3ee',
          '#60a5fa',
          '#a78bfa',
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
        ],
        borderWidth: 2,
      },
    ],
  }

  const occupationData = {
    labels: [
      'Management & Business',
      'Professional',
      'Sales & Office',
      'Service',
      'Construction & Maintenance',
      'Production & Transportation',
    ],
    datasets: [
      {
        data: [
          demographics?.occupation_Management_Business_And_Financial_Operations_Pct || 0,
          demographics?.occupation_Professional_And_Related_Pct || 0,
          demographics?.occupation_Sales_And_Office_Pct || 0,
          demographics?.occupation_Service_Pct || 0,
          demographics?.occupation_Construction_Extraction_And_Maintenance_Pct || 0,
          demographics?.occupation_Production_Transportation_And_Material_Moving_Pct || 0,
        ],
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#f0f9ff'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center">
            <Pie
              data={educationData}
              options={{
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      boxWidth: 12,
                      padding: 10,
                      font: {
                        size: 11,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context?.label}: ${context?.raw}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Occupations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center">
            <Pie
              data={occupationData}
              options={{
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      boxWidth: 12,
                      padding: 10,
                      font: {
                        size: 11,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context?.label}: ${context?.raw}%`,
                    },
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
