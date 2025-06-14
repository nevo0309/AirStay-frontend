// src/store/order.reducer.js

// Action types
export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const SET_HOST_ORDERS = 'SET_HOST_ORDERS'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const initialState = {
  orders: [], // array of all orders
  hostOrders: [], // Orders for listings hosted by current host
  order: null, // the currently‐loaded single order (if any)
}

export function orderReducer(state = initialState, action) {
  let newState = state
  let orders

  switch (action.type) {
    case SET_ORDERS:
      newState = { ...state, orders: action.orders }
      break

    case SET_HOST_ORDERS:
      newState = { ...state, hostOrders: action.orders }
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

    case UPDATE_ORDER_STATUS:
      newState = {
        ...state,
        hostOrders: state.hostOrders.map(o =>
          o._id === action.updatedOrder._id ? action.updatedOrder : o
        ),
        orders: state.orders.map(o =>
          o._id === action.updatedOrder._id ? action.updatedOrder : o
        )
      }
      break

    case REMOVE_ORDER:
      newState = {
        ...state, orders: state.orders.filter(o => o._id !== action.orderId),
        hostOrders: state.hostOrders.filter(o => o._id !== action.orderId)
      }
      break

    default:
      // no change
      break
  }

  return newState
}
