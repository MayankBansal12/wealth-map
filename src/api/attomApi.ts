import {
  AttomPropertyCommunityResponse,
  AttomPropertyDetailReqParam,
  AttomPropertyDetailResponse,
  AttomPropertyFilters,
  AttomPropertyResponse,
  AttomPropertyTransporationResponse,
} from '@/type/types'
import { attomApi } from './axiosInstance'

export const fetchPropertyForTypeAndPostCode = async (
  filters: AttomPropertyFilters
): Promise<AttomPropertyResponse> => {
  try {
    const response = await attomApi.get('/propertyapi/v1.0.0/property/address', { params: filters })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchPropertyDetail = async (
  params: AttomPropertyDetailReqParam
): Promise<AttomPropertyDetailResponse> => {
  try {
    const response = await attomApi.get('/propertyapi/v1.0.0/property/expandedprofile', {
      params: params,
    })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchTrasportationForProperty = async (
  address: string
): Promise<AttomPropertyTransporationResponse> => {
  console.log('fetching property transportation detail for ', address)
  try {
    const response = await attomApi.get('/transportationnoise', { params: { address: address } })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchCommunityDetailsForProperty = async (
  geoIdV4: string
): Promise<AttomPropertyCommunityResponse> => {
  console.log('fetching property community detail for ', geoIdV4)
  try {
    const response = await attomApi.get('/v4/neighborhood/community', {
      params: { geoIdv4: geoIdV4 },
    })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchAdvancedPropertyDetails = async (address: string) => {
  console.log('mock API call returns mock Data for address', address)
  return null
}
