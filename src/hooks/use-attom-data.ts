import {
  fetchAdvancedPropertyDetails,
  fetchCommunityDetailsForProperty,
  fetchPropertyDetail,
  fetchPropertyForTypeAndPostCode,
  fetchPropOwnerDetails,
  fetchTrasportationForProperty,
} from '@/api/attomApi'
import { AttomPropertyDetailReqParam, AttomPropertyFilters } from '@/type/types'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useFetchPropertyAddress = (filters: AttomPropertyFilters) => {
  return useInfiniteQuery({
    queryKey: ['property-address', filters],
    queryFn: ({ pageParam }) =>
      fetchPropertyForTypeAndPostCode({
        ...filters,
        page: pageParam.toString(),
        pagesize: '30',
      }),
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.status.page
      const totalPages = Math.ceil(lastPage.status.total / lastPage.status.pagesize)
      return currentPage < totalPages ? currentPage + 1 : undefined
    },
    initialPageParam: 1,
    enabled: Boolean(filters.postalcode),
  })
}

export const useFetchPropertyDetail = (
  params: AttomPropertyDetailReqParam,
  shouldFetch: boolean
) => {
  return useQuery({
    queryKey: ['property-detail', params],
    queryFn: () => fetchPropertyDetail({ ...params }),
    enabled: Boolean(params) && shouldFetch,
  })
}

export const useFetchPropertyTransportationDetail = (address: string, shouldFetch: boolean) => {
  return useQuery({
    queryKey: ['property-transport-detail', address],
    queryFn: () => fetchTrasportationForProperty(address),
    enabled: Boolean(address) && shouldFetch,
  })
}

export const useFetchPropertyCommunityDetail = (geoIdV4: string, shouldFetch: boolean) => {
  return useQuery({
    queryKey: ['property-community-detail', geoIdV4],
    queryFn: () => fetchCommunityDetailsForProperty(geoIdV4),
    enabled: Boolean(geoIdV4) && shouldFetch,
  })
}

export const useFetchAdvancedPropertyInfo = (address: string, shouldFetch: boolean) => {
  return useQuery({
    queryKey: ['property-advanced-detail', address],
    queryFn: () => fetchAdvancedPropertyDetails(address),
    enabled: Boolean(address) && shouldFetch,
  })
}

export const useFetchOwnerDetails = (name: string, address: string, shouldFetch: boolean) => {
  return useQuery({
    queryKey: ['property-owner-detail', name, address],
    queryFn: () => fetchPropOwnerDetails(name, address),
    enabled: Boolean(name) && Boolean(address) && shouldFetch,
  })
}
