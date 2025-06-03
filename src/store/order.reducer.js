// src/store/order.reducer.js

// Action types
export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'

const initialState = {
  orders: [], // array of all orders
  order: null, // the currently‐loaded single order (if any)
}

export function orderReducer(state = initialState, action) {
  let newState = state
  let orders

  switch (action.type) {
    case SET_ORDERS:
      newState = { ...state, orders: action.orders }
      break

    case SET_ORDER:
      newState = { ...state, order: action.order }
      break

    case ADD_ORDER:
      newState = { ...state, orders: [...state.orders, action.order] }
      break

    case UPDATE_ORDER:
      orders = state.orders.map(o => (o._id === action.order._id ? action.order : o))
      newState = { ...state, orders }
      break

    case REMOVE_ORDER:
      orders = state.orders.filter(o => o._id !== action.orderId)
      newState = { ...state, orders }
      break

    default:
      // no change
      break
  }

  return newState
}
