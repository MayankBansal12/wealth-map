import { AttomPropertyFilters, AttomPropertyResponse } from '@/type/types'
import { attomApi } from './axiosInstance'

export const fetchPropertyForTypeAndPostCode = async (
  filters: AttomPropertyFilters
): Promise<AttomPropertyResponse> => {
  try {
    const response = await attomApi.get('/property/address', { params: filters })
    console.log('response from attom API for filters:', filters, response)
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}
