import { propertyApi } from '@/services/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useFetchPropertyInfo = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['property-info', id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const response = await propertyApi.getPropertyDetails(id)
      return response.data
    },
  })
}

export const useUpdatePropertyInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, update }: { id: string; update: any }) => {
      const response = await propertyApi.updateProperty(id, update)
      return response.data
    },

    onSuccess: (_, variables) => {
      console.log('Updated data in DB...')
      queryClient.invalidateQueries({ queryKey: ['property-info', variables.id] })
    },
  })
}
