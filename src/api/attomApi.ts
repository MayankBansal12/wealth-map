import { AttomPropertyFilters, AttomPropertyResponse } from '@/type/types'
import { attomApi } from './axiosInstance'

export const fetchPropertyForTypeAndPostCode = async (
  filters: AttomPropertyFilters
): Promise<AttomPropertyResponse> => {
  try {
    const response = await attomApi.get('/property/address', { params: filters })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}
