import { httpService } from '../http.service'
let cachedGoogleApiKey = null

export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
  getGoogleApi,
  getDefaultFilter,
}

async function query(filterBy) {
  return httpService.get(`stay`, filterBy)
}
export async function queryByCity(city, limit = 9) {
  return httpService.get('stay', { city, limit })
}

function getById(stayId) {
  return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
  return httpService.delete(`stay/${stayId}`)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await httpService.put(`stay/${stay._id}`, stay)
  } else {
    savedStay = await httpService.post('stay', stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
  return savedMsg
}

function getDefaultFilter() {
  return { location: '', checkIn: '', checkOut: '', guest: {} }
}
async function getGoogleApi() {
  if (cachedGoogleApiKey) return cachedGoogleApiKey

  try {
    const res = await httpService.get('config/google-maps-key')
    cachedGoogleApiKey = res.apiKey
    return cachedGoogleApiKey
  } catch (err) {
    console.error('Failed to load Google API key', err)
    throw err
  }
}
