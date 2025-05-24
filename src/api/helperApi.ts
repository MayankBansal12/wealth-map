const OPEN_CAGE_API_KEY = import.meta.env.VITE_OPEN_CAGE_API_KEY

export const fetchReverseGeocode = async (lat: string, long: string) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${OPEN_CAGE_API_KEY}`
  )
  const data = await response.json()
  return data?.results[0] ?? null
}
