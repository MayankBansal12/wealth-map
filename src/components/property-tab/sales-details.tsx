import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DollarSign, TrendingUp, Calculator } from 'lucide-react'

interface SalesDetailsProps {
  sale: any
  assessment: any
}

export function SalesDetails({ sale, assessment }: SalesDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Sales & Value Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sale ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Last Sale</h4>
              <Badge variant="outline" className="font-medium">
                {new Date(sale?.saleTransDate)?.toLocaleDateString()}
              </Badge>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-2xl font-bold mb-1">
                ${sale.amount?.saleAmt?.toLocaleString() || 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">
                {sale.amount?.saleTransType || 'N/A'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col p-3 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground">Price per Sq Ft</span>
                <span className="font-medium">
                  ${sale.calculation?.pricePerSizeUnit?.toFixed(2) || 'N/A'}
                </span>
              </div>
              <div className="flex flex-col p-3 bg-muted/30 rounded-lg">
                <span className="text-muted-foreground">Price per Bedroom</span>
                <span className="font-medium">
                  ${sale.calculation?.pricePerBed?.toLocaleString() || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-4 text-muted-foreground">
            No sales information available
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Market Value Assessment
          </h4>
        </div>

        <Tabs defaultValue="market">
          <TabsList>
            <TabsTrigger value="market">Market Value</TabsTrigger>
            <TabsTrigger value="assessed">Assessed Value</TabsTrigger>
          </TabsList>
          <TabsContent value="market">
            {assessment?.market ? (
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-medium">
                    ${assessment?.market?.mktTtlValue?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Land Value</span>
                  <span className="font-medium">
                    ${assessment?.market?.mktLandValue?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Improvement Value</span>
                  <span className="font-medium">
                    ${assessment?.market?.mktImprValue?.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <span className="flex items-center text-muted-foreground py-4">
                Market Values aren&apos;t available for the property!
              </span>
            )}
          </TabsContent>
          <TabsContent value="assessed">
            {assessment?.assessed ? (
              <div className="grid grid-cols-1 gap-3 text-sm">
                <span className="text-sm text-muted-foreground py-1">
                  Note- Calculated for Tax purposes, generally lower than market value
                </span>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-medium">
                    ${assessment?.assessed?.assdTtlValue?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Land Value</span>
                  <span className="font-medium">
                    ${assessment?.assessed?.assdLandValue?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Improvement Value</span>
                  <span className="font-medium">
                    ${assessment?.assessed?.assdImprValue?.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <span className="flex items-center text-muted-foreground py-4">
                Assessed Values aren&apos;t available for the property!
              </span>
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Tax Information
          </h4>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex flex-col p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">Annual Tax</span>
              <span className="font-medium">${assessment?.tax?.taxAmt?.toLocaleString()}</span>
            </div>
            <div className="flex flex-col p-3 bg-muted/30 rounded-lg">
              <span className="text-muted-foreground">Tax Year</span>
              <span className="font-medium">{assessment?.tax?.taxYear}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
