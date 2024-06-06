import axios from 'axios'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null

// fetch all property
export async function fetchProperties() {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return []
    }
    const res = await axios.get(`${apiDomain}/properties`, { cache: 'no-store' })
    if (!res?.data) {
      throw new Error('Failed to fetch data')
    }
    return res.data;
  } catch (error) {
    console.log(error)
    return []
  }
}

export async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null
    }
    const res = await axios.get(`${apiDomain}/properties/${id}`)
    if (!res?.data) {
      throw new Error('Failed to fetch data')
    }
    return res.data;
  } catch (error) {
    console.log(error)
    return null;
  }
}

// fetch single property

