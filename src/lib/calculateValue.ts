const formatCurrency = (amount: number) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K`
  } else {
    return `$${amount.toLocaleString()}`
  }
}

export const getAssetBreakdown = (marketValue: number, wealthEstimate: any) => {
  if (!wealthEstimate || !wealthEstimate.netWorthMin || !wealthEstimate.netWorthMax) {
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
    min: formatCurrency(wealthEstimate.netWorthMin * liquidMinRatio),
    max: formatCurrency(wealthEstimate.netWorthMax * liquidMaxRatio),
  }

  const estimatedInvestments = {
    min: formatCurrency(wealthEstimate.netWorthMin * investMinRatio),
    max: formatCurrency(wealthEstimate.netWorthMax * investMaxRatio),
  }

  return {
    propertyEquity,
    estimatedLiquidAssets,
    estimatedInvestments,
  }
}

export const calculateTotalMortgageValue = (mortgage: any) => {
  if (!mortgage) return 0

  let total = 0

  Object.keys(mortgage).forEach((key) => {
    if (key.includes('Concurrent') && mortgage[key]?.amount > 0) {
      total += mortgage[key].amount
    }
  })

  return total
}
