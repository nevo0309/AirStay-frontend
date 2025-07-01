import { userService } from '../services/user/user.service.remote'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const SET_WISHLIST = 'SET_WISHLIST'
export const TOGGLE_WISHLIST = 'TOGGLE_WISHLIST'

const initialState = {
  count: 10,
  user: userService.getLoggedinUser(),
  users: [],
  watchedUser: null,
  wishlistIds: [],
  wishlistStays: []
}

export function userReducer(state = initialState, action) {
  var newState = state
  switch (action.type) {
    case INCREMENT:
      newState = { ...state, count: state.count + 1 }
      break
    case DECREMENT:
      newState = { ...state, count: state.count - 1 }
      break
    case CHANGE_COUNT:
      newState = { ...state, count: state.count + action.diff }
      break
    case SET_USER:
      newState = { ...state, user: action.user }
      break
    case SET_WATCHED_USER:
      newState = { ...state, watchedUser: action.user }
      break
    case REMOVE_USER:
      newState = {
        ...state,
        users: state.users.filter(user => user._id !== action.userId),
      }
      break
    case SET_USERS:
      newState = { ...state, users: action.users }
      break
    case SET_SCORE:
      newState = { ...state, user: { ...state.user, score: action.score } }
      break
    case SET_WISHLIST:
      newState = {
        ...state,
        wishlistIds: action.wishlistIds || [],
        wishlistStays: action.wishlistStays || []
      }
      break
    case TOGGLE_WISHLIST: {
      const id = action.stay._id
      const isWishlisted = state.wishlistIds.includes(id)

      const wishlistIds = isWishlisted
        ? state.wishlistIds.filter(_id => _id !== id)
        : [...state.wishlistIds, id]

      const wishlistStays = isWishlisted
        ? state.wishlistStays.filter(s => s._id !== id)
        : [...state.wishlistStays, action.stay]

      return {
        ...state,
        wishlistIds,
        wishlistStays
      }
    }
    default:
      return state
  }
  // For debug:
  // window.userState = newState
  // console.log('State:', newState)
  return newState
}
