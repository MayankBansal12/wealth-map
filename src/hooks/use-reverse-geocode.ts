import { fetchReverseGeocode } from '@/api/helperApi'
import { ReverseGeocodeResponse } from '@/type/helper'
import { useQuery } from '@tanstack/react-query'

export const useReverseGeocode = (lat: string, long: string, shouldFetch: boolean) => {
  return useQuery<ReverseGeocodeResponse, Error>({
    queryKey: ['reverse-geocode', lat, long],
    queryFn: () => fetchReverseGeocode(lat, long),
    enabled: shouldFetch,
  })
}
