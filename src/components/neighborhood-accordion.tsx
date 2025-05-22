import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Users } from 'lucide-react'
import { NeighborhoodMetrics } from '@/components/neighborhood/neighborhood-metrics'
import { AgeGenderDistribution } from '@/components/neighborhood/age-gender-distribution'
import { IncomeDistribution } from '@/components/neighborhood/income-distribution'
import { NeighborhoodIndices } from '@/components/neighborhood/neighborhood-indices'
import { HousingStats } from '@/components/neighborhood/housing-stats'
import { EducationEmployment } from '@/components/neighborhood/education-employment'
import { ClimateStats } from '@/components/neighborhood/climate-stats'

interface NeighborhoodAccordionProps {
  neighborhoodData: any
}

export function NeighborhoodAccordion({ neighborhoodData }: NeighborhoodAccordionProps) {
  if (!neighborhoodData) {
    return null
  }

  const demographics = neighborhoodData.demographics
  const crime = neighborhoodData.crime
  const airQuality = neighborhoodData.airQuality
  const climate = neighborhoodData.climate
  const naturalDisasters = neighborhoodData.naturalDisasters

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="neighborhood">
        <AccordionTrigger className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Neighborhood & Community Details
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6 p-2">
            <NeighborhoodMetrics demographics={demographics} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AgeGenderDistribution demographics={demographics} />
              <IncomeDistribution demographics={demographics} />
            </div>

            <HousingStats demographics={demographics} />

            <EducationEmployment demographics={demographics} />

            <NeighborhoodIndices
              crime={crime}
              airQuality={airQuality}
              naturalDisasters={naturalDisasters}
            />

            <ClimateStats climate={climate} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
