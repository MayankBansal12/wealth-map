interface WealthEstimationInput {
  salePrice?: number
  estimatedMarketValue?: number
  neighborhoodMedianIncome?: number
  costOfLivingIndex?: number
  localMedianHomePrice?: number
  propertyTaxAssessment?: number
  mortgageAmount?: number
  ownershipDuration?: number
}

interface WealthEstimate {
  netWorthMin: number
  netWorthMax: number
  incomeMin: number
  incomeMax: number
  range: string
  category: string
  confidence: number
  percentileRange: string
  methodology: string[]
  caveats: string[]
}

export const calculateWealthEstimate = (input: WealthEstimationInput): WealthEstimate => {
  const {
    salePrice,
    estimatedMarketValue,
    neighborhoodMedianIncome,
    costOfLivingIndex = 100,
    localMedianHomePrice,
    propertyTaxAssessment,
    mortgageAmount,
    ownershipDuration,
  } = input

  let confidence = 30
  const methodology: string[] = []
  const caveats: string[] = []

  let propertyValue: number | undefined
  if (salePrice && ownershipDuration && ownershipDuration < 2) {
    propertyValue = salePrice
    confidence += 20
    methodology.push('Recent sale price')
  } else if (propertyTaxAssessment) {
    propertyValue = propertyTaxAssessment * 1.15
    confidence += 15
    methodology.push('Tax assessment (adjusted)')
  } else if (estimatedMarketValue) {
    propertyValue = estimatedMarketValue
    confidence += 10
    methodology.push('Market value estimate')
    caveats.push('Market estimates can vary significantly')
  } else if (salePrice) {
    const yearsOld = ownershipDuration || 5
    const appreciationRate = 0.04
    propertyValue = salePrice * Math.pow(1 + appreciationRate, yearsOld)
    confidence += 5
    methodology.push(`Historical sale price (${yearsOld}y appreciation)`)
    caveats.push('Appreciation rate assumed at 4% annually')
  }

  if (!propertyValue) {
    return {
      netWorthMin: 0,
      netWorthMax: 0,
      incomeMin: 0,
      incomeMax: 0,
      range: 'Unknown',
      category: 'Insufficient Data',
      confidence: 0,
      percentileRange: 'Unknown',
      methodology: [],
      caveats: ['No property value data available'],
    }
  }

  const adjustedPropertyValue = propertyValue * (100 / costOfLivingIndex)

  if (localMedianHomePrice) {
    const propertyValueRatio = propertyValue / localMedianHomePrice
    confidence += 10
    methodology.push('Local market comparison')

    if (propertyValueRatio > 3) {
      confidence += 5
    }
  }

  let incomeMultiplier = 1
  if (neighborhoodMedianIncome) {
    const nationalMedianIncome = 70000
    incomeMultiplier = neighborhoodMedianIncome / nationalMedianIncome
    confidence += 15
    methodology.push('Neighborhood income analysis')
  }

  let equityEstimate = propertyValue
  if (mortgageAmount) {
    equityEstimate = propertyValue - mortgageAmount
    confidence += 10
    methodology.push('Known mortgage debt')
  } else {
    if (ownershipDuration && ownershipDuration < 10) {
      const originalMortgage = propertyValue * 0.8
      const monthlyPayment = originalMortgage * 0.006
      const monthsPaid = ownershipDuration * 12
      const remainingMortgage = Math.max(0, originalMortgage - monthlyPayment * monthsPaid * 0.3)
      equityEstimate = propertyValue - remainingMortgage
      caveats.push('Mortgage estimated based on typical lending patterns')
    }
  }

  const getNetWorthFromPropertyValue = (propValue: number, equity: number) => {
    if (propValue < 200000) {
      return {
        min: Math.max(equity * 0.5, 25000),
        max: equity * 2.5,
        incomeMin: propValue * 0.25,
        incomeMax: propValue * 0.5,
      }
    } else if (propValue < 500000) {
      return {
        min: equity * 0.8,
        max: equity * 4,
        incomeMin: propValue * 0.2,
        incomeMax: propValue * 0.45,
      }
    } else if (propValue < 1000000) {
      return {
        min: equity * 1.2,
        max: equity * 6,
        incomeMin: propValue * 0.15,
        incomeMax: propValue * 0.4,
      }
    } else if (propValue < 2000000) {
      return {
        min: equity * 1.5,
        max: equity * 8,
        incomeMin: propValue * 0.12,
        incomeMax: propValue * 0.35,
      }
    } else {
      return {
        min: equity * 2,
        max: equity * 15,
        incomeMin: propValue * 0.08,
        incomeMax: propValue * 0.25,
      }
    }
  }

  const baseEstimate = getNetWorthFromPropertyValue(adjustedPropertyValue, equityEstimate)

  const netWorthMin = Math.abs(Math.round(baseEstimate.min * incomeMultiplier))
  const netWorthMax = Math.abs(Math.round(baseEstimate.max * incomeMultiplier))
  const incomeMin = Math.abs(Math.round(baseEstimate.incomeMin * incomeMultiplier))
  const incomeMax = Math.abs(Math.round(baseEstimate.incomeMax * incomeMultiplier))

  let category: string
  let percentileRange: string

  if (netWorthMax < 100000) {
    category = 'Lower Middle Class'
    percentileRange = 'Bottom 50%'
  } else if (netWorthMax < 500000) {
    category = 'Middle Class'
    percentileRange = 'Top 25 - 50%'
  } else if (netWorthMax < 1200000) {
    category = 'Upper Middle Class'
    percentileRange = 'Top 10 - 25%'
  } else if (netWorthMax < 3000000) {
    category = 'Affluent'
    percentileRange = 'Top 5 - 10%'
  } else if (netWorthMax < 10000000) {
    category = 'High Net Worth'
    percentileRange = 'Top 1 - 5%'
  } else {
    category = 'Ultra High Net Worth'
    percentileRange = 'Top 1%'
  }

  if (methodology.length < 2) confidence -= 10
  if (caveats.length > 2) confidence -= 5

  confidence = Math.min(confidence, 85)

  caveats.push(
    'Wealth estimation is inherently uncertain',
    'Property ownership patterns vary significantly',
    'Other assets and debts not considered'
  )

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    } else {
      return `$${amount.toLocaleString()}`
    }
  }

  return {
    netWorthMin,
    netWorthMax,
    incomeMin,
    incomeMax,
    range: `${formatCurrency(netWorthMin)} - ${formatCurrency(netWorthMax)}`,
    category,
    confidence: Math.round(confidence),
    percentileRange,
    methodology,
    caveats,
  }
}
