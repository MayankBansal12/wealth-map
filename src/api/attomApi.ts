import {
  AttomPropertyCommunityResponse,
  AttomPropertyDetailReqParam,
  AttomPropertyDetailResponse,
  AttomPropertyFilters,
  AttomPropertyResponse,
  AttomPropertyTransporationResponse,
} from '@/type/types'
import { attomApi } from './axiosInstance'
import { advancedPropertyData } from '@/mockZillowData'

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

export const fetchPropertyDetail = async (
  params: AttomPropertyDetailReqParam
): Promise<AttomPropertyDetailResponse> => {
  try {
    const response = await attomApi.get('/property/expandedprofile', { params: params })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchTrasportationForProperty = async (
  address: string
): Promise<AttomPropertyTransporationResponse> => {
  try {
    const response = await attomApi.get('/transportationnoise', { params: address })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchCommunityDetailsForProperty = async (
  geoIdV4: string
): Promise<AttomPropertyCommunityResponse> => {
  try {
    const response = await attomApi.get('/neighborhood/community', { params: geoIdV4 })
    return response.data
  } catch (error: any) {
    if (error?.response?.data?.status?.msg === 'SuccessWithoutResult') return error?.response?.data
    throw new Error(error?.response?.data?.message || 'Error fetching properties, try again!')
  }
}

export const fetchAdvancedPropertyDetails = async (address: string) => {
  console.log('mock API call returns mock Data for address', address)
  return advancedPropertyData
}
