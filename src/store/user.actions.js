import { userService } from '../services/user/user.service.remote'
import { stayService } from '../services/stay/stay.service.remote'
import { SET_WISHLIST, TOGGLE_WISHLIST } from './user.reducer'

import { store } from '../store/store'

import { showErrorMsg } from '../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from './system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from './user.reducer'
import { socketUser } from '../services/socket.service'

export async function loadUsers() {
  try {
    store.dispatch({ type: LOADING_START })
    const users = await userService.getUsers()
    store.dispatch({ type: SET_USERS, users })
  } catch (err) {
    console.log('UserActions: err in loadUsers', err)
  } finally {
    store.dispatch({ type: LOADING_DONE })
  }
}

export async function removeUser(userId) {
  try {
    await userService.remove(userId)
    store.dispatch({ type: REMOVE_USER, userId })
  } catch (err) {
    console.log('UserActions: err in removeUser', err)
  }
}

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({
      type: SET_USER,
      user,
    })
    store.dispatch(loadUserWishlist())
    socketUser.set(user._id)
    return user
  } catch (err) {
    console.log('Cannot login', err)
    throw err
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({
      type: SET_USER,
      user,
    })
    store.dispatch(loadUserWishlist())
    socketUser.set(user._id)

    return user
  } catch (err) {
    console.log('Cannot signup', err)
    throw err
  }
}

// export async function logout() {
//   try {
//     await userService.logout()
//     store.dispatch({
//       type: SET_USER,
//       user: null,
//     })
//     socketUser.unset()
//   } catch (err) {
//     console.log('Cannot logout', err)
//     throw err
//   }
// }

export async function logout() {
  try {
    await userService.logout()
    store.dispatch({ type: SET_USER, user: null })

    // 🧼 Clear Redux wishlist on logout
    store.dispatch({ type: SET_WISHLIST, wishlistIds: [], wishlistStays: [] })

    socketUser.unset()
  } catch (err) {
    console.log('Cannot logout', err)
    throw err
  }
}

export async function loadUser(userId) {
  try {
    const user = await userService.getById(userId)
    store.dispatch({ type: SET_WATCHED_USER, user })
  } catch (err) {
    showErrorMsg('Cannot load user')
    console.log('Cannot load user', err)
  }
}

export function loadUserWishlist() {
  return async dispatch => {
    try {
      const stays = await stayService.fetchWishlist()
      const wishlistIds = stays.map(stay => stay._id)
      dispatch({ type: SET_WISHLIST, wishlistIds, wishlistStays: stays })
      return stays // allow `.then()` in component
    } catch (err) {
      console.error("Failed to load wishlist", err)
      return []
    }
  }
}

export async function toggleWishlistStay(stay) {
  try {
    const isNowLiked = await stayService.toggleWishlist(stay._id)

    store.dispatch({
      type: TOGGLE_WISHLIST,
      stayId: stay._id,
      stay: isNowLiked ? stay : null
    })

    return isNowLiked
  } catch (err) {
    console.error('Failed to toggle wishlist', err)
    showErrorMsg('Could not update wishlist')
    throw err
  }
}
