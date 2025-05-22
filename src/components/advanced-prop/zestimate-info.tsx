import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, TrendingUp, TrendingDown } from 'lucide-react'

interface ZestimateInfoProps {
  propertyData: any
}

export function ZestimateInfo({ propertyData }: ZestimateInfoProps) {
  const zestimate = propertyData.zestimate
  const zestimateLowPercent = propertyData.zestimateLowPercent
    ? Number.parseFloat(propertyData.zestimateLowPercent)
    : 0
  const zestimateHighPercent = propertyData.zestimateHighPercent
    ? Number.parseFloat(propertyData.zestimateHighPercent)
    : 0

  const lowEstimate = zestimate ? Math.round(zestimate * (1 - zestimateLowPercent / 100)) : null
  const highEstimate = zestimate ? Math.round(zestimate * (1 + zestimateHighPercent / 100)) : null

  const lastSoldPrice = propertyData.lastSoldPrice
  const priceDifference = zestimate && lastSoldPrice ? zestimate - lastSoldPrice : null
  const percentDifference =
    zestimate && priceDifference && lastSoldPrice ? (priceDifference / lastSoldPrice) * 100 : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Estimated Value
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {zestimate ? (
          <>
            <div className="text-center">
              <div className="text-3xl font-bold">${zestimate.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Estimated Market Value</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>${lowEstimate?.toLocaleString()}</span>
                <span>${highEstimate?.toLocaleString()}</span>
              </div>
              <div className="relative pt-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-0.5 w-full bg-muted"></div>
                </div>
                <div className="relative flex justify-between">
                  <div className="bg-background px-1 text-xs text-muted-foreground">
                    -{zestimateLowPercent}%
                  </div>
                  <div className="bg-background px-1 text-xs text-muted-foreground">
                    +{zestimateHighPercent}%
                  </div>
                </div>
              </div>
            </div>

            {lastSoldPrice && (
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Last Sold Price</div>
                  <div className="font-medium">${lastSoldPrice.toLocaleString()}</div>
                </div>

                {priceDifference !== null && (
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-muted-foreground">Value Change</div>
                    <div
                      className={`flex items-center gap-1 font-medium ${
                        priceDifference >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {priceDifference >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      ${Math.abs(priceDifference).toLocaleString()} ({percentDifference?.toFixed(1)}
                      %)
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pt-4 text-xs text-muted-foreground">
              This estimate is based on public data and may not reflect all market conditions. Use
              as a starting point only.
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No estimate available for this property.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
