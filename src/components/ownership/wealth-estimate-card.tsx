import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { PiggyBank, TrendingUp, Home, Banknote } from 'lucide-react'
import { getWealthEstimate } from '@/lib/wealthEstimate'

interface WealthEstimateCardProps {
  property: any
  owner: any
  zestimate: any
}

const getAssetBreakdown = (
  marketValue: number,
  wealthEstimate: {
    min: number | null
    max: number | null
    category: string
  }
) => {
  if (!wealthEstimate || !wealthEstimate.min || !wealthEstimate.max) {
    return {
      propertyEquity: 0,
      estimatedLiquidAssets: { min: 0, max: 0 },
      estimatedInvestments: { min: 0, max: 0 },
    }
  }

  const category = wealthEstimate.category

  let equityRatio = 0.5
  let liquidMinRatio = 0.1,
    liquidMaxRatio = 0.15
  let investMinRatio = 0.25,
    investMaxRatio = 0.4

  switch (category) {
    case 'Middle Class':
      equityRatio = 0.6
      liquidMinRatio = 0.05
      liquidMaxRatio = 0.1
      investMinRatio = 0.2
      investMaxRatio = 0.25
      break
    case 'Upper Middle Class':
      equityRatio = 0.5
      liquidMinRatio = 0.1
      liquidMaxRatio = 0.15
      investMinRatio = 0.3
      investMaxRatio = 0.4
      break
    case 'Affluent':
      equityRatio = 0.35
      liquidMinRatio = 0.1
      liquidMaxRatio = 0.2
      investMinRatio = 0.4
      investMaxRatio = 0.5
      break
    case 'High Net Worth Individual':
      equityRatio = 0.25
      liquidMinRatio = 0.2
      liquidMaxRatio = 0.3
      investMinRatio = 0.45
      investMaxRatio = 0.6
      break
  }

  const propertyEquity = marketValue * equityRatio

  const estimatedLiquidAssets = {
    min: wealthEstimate.min * liquidMinRatio,
    max: wealthEstimate.max * liquidMaxRatio,
  }

  const estimatedInvestments = {
    min: wealthEstimate.min * investMinRatio,
    max: wealthEstimate.max * investMaxRatio,
  }

  return {
    propertyEquity,
    estimatedLiquidAssets,
    estimatedInvestments,
  }
}

export function WealthEstimateCard({ property, zestimate }: WealthEstimateCardProps) {
  const propertyData = property?.propertyProfile ?? null
  const marketValue = propertyData?.assessment?.market?.mktTtlValue || zestimate || 0
  const lastSoldPrice = propertyData?.sale?.amount?.saleAmt || 0
  const neighborhoodMedianIncome = property?.neighborhoodData?.demographics?.median_Household_Income

  const wealthEstimate = getWealthEstimate({
    estimatedMarketValue: marketValue,
    salePrice: lastSoldPrice,
    neighborhoodMedianIncome,
  })
  const { propertyEquity, estimatedLiquidAssets, estimatedInvestments } = getAssetBreakdown(
    marketValue,
    wealthEstimate
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <PiggyBank className="h-5 w-5" />
          Estimated Net Worth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-primary">{wealthEstimate.range}</div>
          <Badge variant="secondary" className="text-sm">
            {wealthEstimate.category}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Based on property ownership and demographic analysis
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Estimate Confidence</span>
            <span className="font-medium">{wealthEstimate.confidence}%</span>
          </div>
          <Progress value={wealthEstimate.confidence} className="h-2" />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Estimated Asset Breakdown
          </h4>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-600">
                <Home className="h-4 w-4" />
                <span className="text-sm font-medium">Property Equity</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-green-700 block">
                  {typeof propertyEquity === 'number' ? (
                    `$${propertyEquity.toLocaleString()}`
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </span>
                <span className="text-xs text-green-800">
                  {propertyEquity !== undefined
                    ? 'Estimated from market value'
                    : 'No market value available'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-600">
                <Banknote className="h-4 w-4" />
                <span className="text-sm font-medium">Liquid Assets</span>
              </div>
              <div className="text-right">
                {estimatedLiquidAssets?.min !== undefined &&
                estimatedLiquidAssets?.max !== undefined ? (
                  <span className="font-bold text-blue-700">
                    ${Math.round(estimatedLiquidAssets.min / 1000)}K – $
                    {Math.round(estimatedLiquidAssets.max / 1000)}K
                  </span>
                ) : (
                  <span className="font-bold text-gray-500">N/A</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 text-purple-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">Investments</span>
              </div>
              <div className="text-right">
                {estimatedInvestments?.min !== undefined &&
                estimatedInvestments?.max !== undefined ? (
                  <span className="font-bold text-purple-700">
                    ${Math.round(estimatedInvestments.min / 1000)}K – $
                    {Math.round(estimatedInvestments.max / 1000)}K
                  </span>
                ) : (
                  <span className="font-bold text-gray-500">N/A</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Property Investment Profile</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground">Purchase Price</div>
              <div className="font-medium">
                {typeof lastSoldPrice === 'number' ? `$${lastSoldPrice.toLocaleString()}` : 'N/A'}
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
            <div className="text-sm font-medium text-amber-800">Estimated Wealth Percentile</div>
            <div className="text-lg font-bold text-amber-900">{wealthEstimate.percentileRange}</div>
            <div className="text-xs text-amber-700">Based on US household wealth distribution</div>
          </div>
        )}

        <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">
          <strong>Important:</strong> These estimates are based on property ownership patterns,
          demographic data, and statistical models. Actual net worth may vary significantly based on
          debts, other assets, market conditions, and personal financial decisions. This information
          is for analytical purposes only.
        </div>
      </CardContent>
    </Card>
  )
}
