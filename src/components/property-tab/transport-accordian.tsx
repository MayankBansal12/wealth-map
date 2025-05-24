import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Car, Plane, Siren, Train, Volume2, AlertTriangle } from 'lucide-react'

interface TransportationAccordionProps {
  transportationData: any
}

const getNoiseLevelColor = (level: number) => {
  switch (level) {
    case 0:
      return 'bg-green-100 text-green-800'
    case 1:
      return 'bg-blue-100 text-blue-800'
    case 2:
      return 'bg-yellow-100 text-yellow-800'
    case 3:
      return 'bg-orange-100 text-orange-800'
    case 4:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function TransportationAccordion({ transportationData }: TransportationAccordionProps) {
  if (!transportationData) {
    return (
      <div className="text-center p-4 my-4 text-muted-foreground">
        No transportation data available
      </div>
    )
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="transportation">
        <AccordionTrigger className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Transportation & Noise Information
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-2">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4" />
                Overall Summary
              </h4>
              <p className="text-sm">
                {transportationData?.overall_summary ??
                  'Transportation information seems unavailable for this property.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      Road Noise
                    </h4>
                    <Badge className={getNoiseLevelColor(transportationData?.road_noise?.level)}>
                      Level {transportationData?.road_noise?.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transportationData?.road_noise?.level_description}
                  </p>

                  {transportationData.road_noise?.noise_sources &&
                    transportationData.road_noise?.noise_sources?.length > 0 && (
                      <div className="mt-2">
                        <h5 className="text-xs font-medium mb-1">Noise Sources:</h5>
                        <ul className="text-xs space-y-1">
                          {transportationData?.road_noise?.noise_sources?.map(
                            (source: any, index: number) => (
                              <li key={index} className="flex items-center gap-1">
                                <Volume2 className="h-3 w-3" />
                                {source?.source_description || source?.source_sub_type}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Aviation Noise
                    </h4>
                    <Badge
                      className={getNoiseLevelColor(transportationData?.aviation_noise?.level)}
                    >
                      Level {transportationData?.aviation_noise?.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transportationData?.aviation_noise?.level_description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Siren className="h-4 w-4" />
                      Emergency Vehicle Noise
                    </h4>
                    <Badge
                      className={getNoiseLevelColor(transportationData?.emg_vehicle_noise?.level)}
                    >
                      Level {transportationData?.emg_vehicle_noise?.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transportationData?.emg_vehicle_noise?.level_description}
                  </p>

                  {transportationData?.emg_vehicle_noise?.noise_sources &&
                    transportationData?.emg_vehicle_noise?.noise_sources?.length > 0 && (
                      <div className="mt-2">
                        <h5 className="text-xs font-medium mb-1">Noise Sources:</h5>
                        <ul className="text-xs space-y-1">
                          {transportationData?.emg_vehicle_noise?.noise_sources?.map(
                            (source: any, index: number) => (
                              <li key={index} className="flex items-center gap-1">
                                <Siren className="h-3 w-3" />
                                {source?.source_description} ({source?.source_dist_km?.toFixed(1)}{' '}
                                km)
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Train className="h-4 w-4" />
                      Rail Noise
                    </h4>
                    <Badge className={getNoiseLevelColor(transportationData?.rail_noise?.level)}>
                      Level {transportationData?.rail_noise?.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transportationData?.rail_noise?.level_description}
                  </p>

                  {transportationData?.rail_noise?.noise_sources &&
                    transportationData?.rail_noise?.noise_sources?.length > 0 && (
                      <div className="mt-2">
                        <h5 className="text-xs font-medium mb-1">Noise Sources:</h5>
                        <ul className="text-xs space-y-1">
                          {transportationData?.rail_noise?.noise_sources?.map(
                            (source: any, index: number) =>
                              source?.source_description && (
                                <li key={index} className="flex items-center gap-1">
                                  <Train className="h-3 w-3" />
                                  {source?.source_description}
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center gap-2">
                      <Train className="h-4 w-4" />
                      Rail Whistle Noise
                    </h4>
                    <Badge
                      className={getNoiseLevelColor(transportationData?.rail_whistle_noise?.level)}
                    >
                      Level {transportationData?.rail_whistle_noise?.level}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {transportationData?.rail_whistle_noise?.level_description}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
              Data Source:
              <div dangerouslySetInnerHTML={{ __html: transportationData?.disclaimer_text }} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
