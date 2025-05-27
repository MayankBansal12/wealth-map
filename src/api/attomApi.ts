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
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY

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
        'x-rapidapi-key': RAPID_API_KEY,
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
  const searchDetailsUrl = `https://skip-tracing-working-api.p.rapidapi.com/search/bynameaddress?name=${name}&citystatezip=${address}&page=1`

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'skip-tracing-working-api.p.rapidapi.com',
      'x-rapidapi-key': RAPID_API_KEY,
    },
  }

  try {
    const response = await fetch(searchDetailsUrl, options)

    if (!response.ok) {
      throw new Error(`Error fetching search details: ${response.statusText}`)
    }

    const searchData = await response.json()
    console.log('details from search: ', searchData)

    const personId = searchData?.PeopleDetails?.[0]?.['Person ID']
    if (!personId) {
      console.warn('No person ID found in search data.')
      return null
    }

    const detailsUrl = `https://skip-tracing-working-api.p.rapidapi.com/search/detailsbyID?peo_id=${personId}`
    const detailsResponse = await fetch(detailsUrl, options)

    if (!detailsResponse.ok) {
      throw new Error(`Error fetching person details: ${detailsResponse.statusText}`)
    }

    const detailsData = await detailsResponse.json()
    return detailsData
  } catch (error) {
    console.error('Failed to fetch owner details:', error)
    return null
  }
}
