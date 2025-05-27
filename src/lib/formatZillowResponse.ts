export function formatZillowResponse(data: any) {
  if (!data) return null

  const originalPhotos = data.originalPhotos || []

  const similarProperties =
    data.collections?.modules
      ?.find((module: any) => module.name === 'Similar homes')
      ?.propertyDetails?.slice(0, 3) || []

  return {
    address: {
      streetAddress: data.address?.streetAddress,
      city: data.address?.city,
      state: data.address?.state,
      zipcode: data.address?.zipcode,
    },
    description: data.description,
    photoCount: data.photoCount,
    originalPhotos,
    mlsid: data.mlsid,
    datePostedString: data.datePostedString,
    parcelId: data.parcelId,
    price: data.price,
    lastSoldPrice: data.lastSoldPrice,
    zestimate: data.zestimate,
    zestimateLowPercent: data.zestimateLowPercent,
    zestimateHighPercent: data.zestimateHighPercent,
    priceHistory: data.priceHistory?.map((item: any) => ({
      date: item.date,
      event: item.event,
      price: item.price,
      pricePerSquareFoot: item.pricePerSquareFoot,
      source: item.source,
      sellerAgent: item.sellerAgent,
      buyerAgent: item.buyerAgent,
    })),
    collections: {
      modules: [
        {
          name: 'Similar homes',
          propertyDetails: similarProperties.map((property: any) => ({
            address: {
              streetAddress: property.address?.streetAddress,
              city: property.address?.city,
              state: property.address?.state,
              zipcode: property.address?.zipcode,
            },
            price: property.price,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            livingArea: property.livingArea,
            miniCardPhotos: property.miniCardPhotos,
          })),
        },
      ],
    },

    resoFacts: {
      propertySubType: data.resoFacts?.propertySubType,
      yearBuilt: data.resoFacts?.yearBuilt,
      stories: data.resoFacts?.stories,
      architecturalStyle: data.resoFacts?.architecturalStyle,
      livingArea: data.resoFacts?.livingArea,
      lotSize: data.resoFacts?.lotSize,
      bedrooms: data.resoFacts?.bedrooms,
      bathroomsFull: data.resoFacts?.bathroomsFull,
      bathroomsHalf: data.resoFacts?.bathroomsHalf,

      garageParkingCapacity: data.resoFacts?.garageParkingCapacity,
      parkingCapacity: data.resoFacts?.parkingCapacity,
      hasAttachedGarage: data.resoFacts?.hasAttachedGarage,
      parkingFeatures: data.resoFacts?.parkingFeatures,

      lotFeatures: data.resoFacts?.lotFeatures,
      interiorFeatures: data.resoFacts?.interiorFeatures,
      exteriorFeatures: data.resoFacts?.exteriorFeatures,
      patioAndPorchFeatures: data.resoFacts?.patioAndPorchFeatures,

      constructionMaterials: data.resoFacts?.constructionMaterials,
      roofType: data.resoFacts?.roofType,
      foundationDetails: data.resoFacts?.foundationDetails,
      flooring: data.resoFacts?.flooring,

      heating: data.resoFacts?.heating,
      hasFireplace: data.resoFacts?.hasFireplace,
      fireplaceFeatures: data.resoFacts?.fireplaceFeatures,
      windowFeatures: data.resoFacts?.windowFeatures,
      waterSource: data.resoFacts?.waterSource,
      sewer: data.resoFacts?.sewer,

      basementYN: data.resoFacts?.basementYN,
      basement: data.resoFacts?.basement,
      propertyCondition: data.resoFacts?.propertyCondition,
      zoning: data.resoFacts?.zoning,
      taxAnnualAmount: data.resoFacts?.taxAnnualAmount,
    },
  }
}
