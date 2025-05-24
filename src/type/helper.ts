export interface ReverseGeocodeResponse {
  components: {
    _category: string
    _type: string
    _normalized_city: string
    borough?: string
    continent?: string
    country_code?: string
    house_number?: string
    neighbourhood: string
    office?: string
    political_union?: string
    postcode?: string
    road?: string
    state_code: string
    suburb: string
    city: string
    state: string
    country: string
  }
  formatted: string
  geometry: {
    lat: number
    lng: number
  }
}
