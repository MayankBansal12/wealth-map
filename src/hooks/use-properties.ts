import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { propertyApi } from '@/services/api'

export const useProperties = () => {
  return useInfiniteQuery({
    queryKey: ['properties'],
    queryFn: async ({ pageParam = null }) => {
      const response = await propertyApi.getProperties({
        next: pageParam ?? '',
        pageSize: 6,
      })
      return response.data
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  })
}

export const usePropertyWealthEstimate = (params: any, shouldFetch?: boolean) => {
  return useQuery({
    queryKey: ['wealth-estimate', params],
    queryFn: async () => await propertyApi.getWealthEstimateForOwner(params),
    enabled: shouldFetch,
  })
}
