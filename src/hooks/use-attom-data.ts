import { fetchPropertyForTypeAndPostCode } from '@/api/attomApi'
import { AttomPropertyFilters, AttomPropertyResponse } from '@/type/types'
import { useQuery } from '@tanstack/react-query'

export const useFetchPropertyAddress = (filters: AttomPropertyFilters) => {
  return useQuery<AttomPropertyResponse, Error>({
    queryKey: ['property-address', filters],
    queryFn: () => fetchPropertyForTypeAndPostCode(filters),
  })
}
