import { storageService } from '../async-storage.service'
import { makeId, saveToStorage } from '../util.service'
import { userService } from '../user/user.service.local'
import { stays } from '../../../data/stay-demo'

const STORAGE_KEY = 'stayDB'
const WISHLIST_KEY = 'wishlistDB'

let gStays = []
_createStays()
export const stayService = {
  query,
  getById,
  save,
  remove,
  addStayMsg,
  fetchWishlist,   // <--- added
  toggleWishlist,  // <--- added
  getDefaultFilter,
}
window.cs = stayService

async function query(filterBy = { txt: '', price: 0 }) {
  var stays = await storageService.query(STORAGE_KEY)
  const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
  }
  if (minSpeed) {
    stays = stays.filter(stay => stay.speed <= minSpeed)
  }
  if (maxPrice) {
    stays = stays.filter(stay => stay.price <= maxPrice)
  }
  if (sortField === 'vendor' || sortField === 'owner') {
    stays.sort((stay1, stay2) => stay1[sortField].localeCompare(stay2[sortField]) * +sortDir)
  }
  if (sortField === 'price' || sortField === 'speed') {
    stays.sort((stay1, stay2) => (stay1[sortField] - stay2[sortField]) * +sortDir)
  }

  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    const stayToSave = {
      _id: stay._id,
      price: stay.price,
      speed: stay.speed,
    }
    savedStay = await storageService.put(STORAGE_KEY, stayToSave)
  } else {
    const stayToSave = {
      vendor: stay.vendor,
      price: stay.price,
      speed: stay.speed,
      // Later, owner is set by the backend
      owner: userService.getLoggedinUser(),
      msgs: [],
    }
    savedStay = await storageService.post(STORAGE_KEY, stayToSave)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}
function _createStays() {
  storageService.query(STORAGE_KEY).then(storedStays => {
    if (!storedStays || !storedStays.length) {
      gStays = [...stays]
      saveToStorage(STORAGE_KEY, gStays)
    } else {
      gStays = storedStays
    }
  })
}

// // =============== WISHLIST LOGIC ===============

// function loadWishlist() {
//   try {
//     return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []
//   } catch {
//     return []
//   }
// }

// function saveWishlist(wishlist) {
//   localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
// }

// async function fetchWishlist() {
//   // Get all stays and filter to those in the wishlist
//   const allStays = await storageService.query(STORAGE_KEY)
//   const wishlistIds = loadWishlist()
//   return allStays.filter(stay => wishlistIds.includes(stay._id))
// }

// async function toggleWishlist(stayId) {
//   let wishlistIds = loadWishlist()
//   let isLiked

//   // Toggle logic for wishlistIds
//   if (wishlistIds.includes(stayId)) {
//     wishlistIds = wishlistIds.filter(id => id !== stayId)
//     isLiked = false
//   } else {
//     wishlistIds.push(stayId)
//     isLiked = true
//   }
//   saveWishlist(wishlistIds)

//   // Also update likedByUsers field on the specific stay in storage
//   const allStays = await storageService.query(STORAGE_KEY)
//   const idx = allStays.findIndex(s => s._id === stayId)
//   if (idx > -1) {
//     const guestId = 'guest' // Swap to real user later if needed
//     let arr = allStays[idx].likedByUsers || []
//     if (isLiked && !arr.includes(guestId)) {
//       allStays[idx].likedByUsers = [...arr, guestId]
//     } else if (!isLiked) {
//       allStays[idx].likedByUsers = arr.filter(id => id !== guestId)
//     }
//     await storageService.put(STORAGE_KEY, allStays[idx])
//   }

//   // Return what changed
//   return { stayId, isLiked }
// }
// // ===============================================



function getDefaultFilter() {
  return { location: '', checkIn: '', checkOut: '', guest: {} }
}
