import { fetchPropertyForTypeAndPostCode } from '@/api/attomApi'
import { AttomPropertyFilters } from '@/type/types'
import { useInfiniteQuery } from '@tanstack/react-query'

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
