import {
  PiggyBank,
  TrendingUp,
  Home,
  Banknote,
  BarChart3,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePropertyWealthEstimate } from '@/hooks/use-properties'
import { useState } from 'react'
import { calculateTotalMortgageValue, getAssetBreakdown } from '@/lib/calculateValue'

interface WealthEstimateCardProps {
  property: any
  owner: any
  zestimate: any
}

export function WealthEstimateCard({ property, zestimate }: WealthEstimateCardProps) {
  const propertyData = property?.propertyProfile ?? null
  const marketValue = propertyData?.assessment?.market?.mktTtlValue || zestimate || 0
  const lastSoldPrice = propertyData?.sale?.amount?.saleAmt || 0
  const mortgageAmount = calculateTotalMortgageValue(propertyData?.assessment?.mortgage)
  const [showMethodology, setShowMethodology] = useState(false)
  const [showCaveats, setCaveats] = useState(false)
  const neighborhoodMedianIncome = property?.neighborhoodData?.demographics?.median_Household_Income
  const localMedianHomePrice =
    property?.neighborhoodData?.demographics?.housing_Owner_Households_Median_Value
  const propertyTaxAssessment = propertyData?.assessment?.assessed?.assdTtlValue || 0

  const { data, isLoading, error } = usePropertyWealthEstimate({
    estimatedMarketValue: marketValue,
    salePrice: lastSoldPrice,
    neighborhoodMedianIncome,
    localMedianHomePrice,
    propertyTaxAssessment,
    mortgageAmount,
  })
  const wealthEstimate = data?.data
  const { propertyEquity, estimatedLiquidAssets, estimatedInvestments } = getAssetBreakdown(
    marketValue,
    wealthEstimate
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PiggyBank className="h-5 w-5" />
          Wealth Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="text-center opacity-90">Calculating net worth...</div>
        ) : error || !wealthEstimate ? (
          <div>Unable to calculate net worth estimate!</div>
        ) : (
          <>
            <div className="text-center space-y-3">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">{wealthEstimate?.range}</div>
                <div className="text-sm text-muted-foreground">Estimated Net Worth</div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {wealthEstimate?.category}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {wealthEstimate?.percentileRange}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Confidence Level</span>
                <span className="font-medium">{wealthEstimate?.confidence}%</span>
              </div>
              <Progress value={wealthEstimate?.confidence} className="h-2" />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Estimated Net Worth Breakdown
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium">Property Equity</div>
                      <div className="text-xs text-green-600">Primary Asset</div>
                    </div>
                  </div>
                  <span className="font-bold text-green-700">
                    ${propertyEquity.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="text-sm font-medium">Liquid Assets</div>
                      <div className="text-xs text-blue-600">Cash & Savings</div>
                    </div>
                  </div>
                  <span className="font-bold text-blue-700">
                    {estimatedLiquidAssets.min} - {estimatedLiquidAssets.max}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium">Investments</div>
                      <div className="text-xs text-purple-600">Stocks, Bonds, 401k</div>
                    </div>
                  </div>
                  <span className="font-bold text-purple-700">
                    {estimatedInvestments.min} - {estimatedInvestments.max}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Property Investment Profile</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Purchase Price</div>
                  <div className="font-medium">
                    {typeof lastSoldPrice === 'number'
                      ? `$${lastSoldPrice.toLocaleString()}`
                      : 'N/A'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground">Current Value</div>
                  <div className="font-medium">
                    {typeof marketValue === 'number' ? `$${marketValue.toLocaleString()}` : 'N/A'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground">Appreciation</div>
                  <div
                    className={`font-medium ${marketValue - lastSoldPrice >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {typeof lastSoldPrice === 'number' && typeof marketValue === 'number'
                      ? `${marketValue - lastSoldPrice >= 0 ? '+' : '-'}$${Math.abs(marketValue - lastSoldPrice).toLocaleString()}`
                      : 'N/A'}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground">ROI</div>
                  <div
                    className={`font-medium ${marketValue - lastSoldPrice >= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {typeof lastSoldPrice === 'number' &&
                    lastSoldPrice > 0 &&
                    typeof marketValue === 'number'
                      ? `${marketValue - lastSoldPrice >= 0 ? '+' : '-'}${Math.abs(((marketValue - lastSoldPrice) / lastSoldPrice) * 100).toFixed(1)}%`
                      : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {wealthEstimate?.percentileRange && (
              <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <div className="text-sm font-medium text-amber-800">
                  Estimated Wealth Percentile
                </div>
                <div className="text-lg font-bold text-amber-900">
                  {wealthEstimate?.percentileRange}
                </div>
                <div className="text-xs text-amber-700">
                  Based on US household wealth distribution
                </div>
              </div>
            )}

            <Separator />

            <Collapsible open={showMethodology} onOpenChange={setShowMethodology}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  Analysis Methodology
                  {showMethodology ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Data Sources & Methods:</div>
                  <ul className="space-y-1">
                    {wealthEstimate?.methodology?.map((method: string, index: number) => (
                      <li
                        key={index}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 shrink-0"></span>
                        {method}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible open={showCaveats} onOpenChange={setCaveats}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Important Limitations
                  </div>
                  {showCaveats ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3">
                <div className="space-y-2">
                  <ul className="space-y-1">
                    {wealthEstimate?.caveats?.map((caveat: string, index: number) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <AlertTriangle className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                        {caveat}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="text-xs text-muted-foreground p-3 bg-amber-50 rounded-md border border-amber-200">
              <strong>Disclaimer:</strong> These estimates are statistical models based on property
              ownership patterns and public data. Actual wealth may vary significantly. This
              analysis is for informational purposes only and should not be used for financial,
              legal, or investment decisions.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
