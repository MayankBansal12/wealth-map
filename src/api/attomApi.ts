import {
  AttomPropertyCommunityResponse,
  AttomPropertyDetailReqParam,
  AttomPropertyDetailResponse,
  AttomPropertyFilters,
  AttomPropertyResponse,
  AttomPropertyTransporationResponse,
} from '@/type/types'
import { attomApi } from './axiosInstance'
import { formatZillowResponse } from '@/lib/formatZillowResponse'
import { mockOwnerDetails } from '@/mockOwnerDetails'
const ZILLOW_API_KEY = import.meta.env.VITE_ZILLOW_API_KEY

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
  const url = `https://zillow56.p.rapidapi.com/search_address?address=${address}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'zillow56.p.rapidapi.com',
        'x-rapidapi-key': ZILLOW_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching property details: ${response.statusText}`)
    }

    const data = await response.json()
    return formatZillowResponse(data)
  } catch (error) {
    console.error('Failed to fetch property details:', error)
    return null
  }
}

export const fetchPropOwnerDetails = async (name: string, address: string) => {
  console.log('fetching details for owner: ', name, address)
  return mockOwnerDetails
}
