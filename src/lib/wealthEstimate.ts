export const getWealthEstimate = ({
  salePrice,
  estimatedMarketValue,
  neighborhoodMedianIncome,
}: {
  salePrice?: number
  estimatedMarketValue?: number
  neighborhoodMedianIncome?: number
}) => {
  let confidence = 50
  let propertyValue: number | undefined

  if (salePrice) {
    propertyValue = salePrice
    confidence += 15
  } else if (estimatedMarketValue) {
    propertyValue = estimatedMarketValue
    confidence += 10
  }

  if (neighborhoodMedianIncome) {
    confidence += 10
  }

  if (!propertyValue) {
    return {
      min: null,
      max: null,
      range: 'Unknown',
      category: 'Insufficient Data',
      confidence: 0,
      percentileRange: 'Unknown',
    }
  }

  if (propertyValue < 300000) {
    return {
      min: 50000,
      max: 350000,
      range: '$50K - $350K',
      category: 'Middle Class',
      confidence,
      percentileRange: 'Top 40% – Top 60%',
    }
  } else if (propertyValue < 600000) {
    return {
      min: 200000,
      max: 1000000,
      range: '$200K - $1M',
      category: 'Upper Middle Class',
      confidence,
      percentileRange: 'Top 25% – Top 40%',
    }
  } else if (propertyValue < 1200000) {
    return {
      min: 600000,
      max: 2200000,
      range: '$600K - $2.2M',
      category: 'Affluent',
      confidence,
      percentileRange: 'Top 10% – Top 25%',
    }
  } else {
    return {
      min: 1200000,
      max: 8000000,
      range: '$1.2M - $8M+',
      category: 'High Net Worth Individual',
      confidence,
      percentileRange: 'Top 1% – Top 10%',
    }
  }
}
