import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { History } from 'lucide-react'

interface PriceHistoryProps {
  propertyData: any
}

export function PriceHistory({ propertyData }: PriceHistoryProps) {
  const priceHistory = propertyData?.priceHistory || []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          Price History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {priceHistory?.length > 0 ? (
          <div className="space-y-4">
            {priceHistory?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={item?.event === 'Sold' ? 'default' : 'outline'}>
                      {item?.event}
                    </Badge>
                    <span className="text-sm font-medium">${item?.price?.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item?.date}
                    {item?.pricePerSquareFoot && ` • $${item?.pricePerSquareFoot}/sqft`}
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 text-sm">
                  {item?.source && (
                    <div className="text-muted-foreground">Source: {item?.source}</div>
                  )}
                  {item?.sellerAgent && item?.buyerAgent && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Listing: {item?.sellerAgent?.name} • Buyer: {item?.buyerAgent?.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No price history available for this property.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
