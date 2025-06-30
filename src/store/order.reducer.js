// src/store/order.reducer.js

// Action types
export const SET_ORDERS = 'SET_ORDERS'
export const SET_ORDER = 'SET_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const SET_HOST_ORDERS = 'SET_HOST_ORDERS'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
export const MSG_READ = 'MSG_READ'

const initialState = {
  orders: [], // array of all orders
  hostOrders: [], // Orders for listings hosted by current host
  order: null, // the currently‐loaded single order (if any)
}

export function orderReducer(state = initialState, action) {
  let newState = state
  let orders

  switch (action.type) {
    case SET_HOST_ORDERS:
      newState = { ...state, hostOrders: action.orders }
      break

    case SET_ORDERS: {
      const newestFirst = [...action.orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      return { ...state, orders: newestFirst }
    }

    case ADD_ORDER:
      return {
        ...state,
        orders: [action.order, ...state.orders],
        hostOrders: [action.order, ...state.hostOrders],
      }

    case UPDATE_ORDER_STATUS: {
      const patch = o =>
        o._id === action.updatedOrder._id ? { ...o, status: action.updatedOrder.status } : o

      return {
        ...state,
        orders: state.orders.map(patch),
        hostOrders: state.hostOrders.map(patch), //  ✅ keep host slice in sync
      }
    }

    case UPDATE_ORDER:
      orders = state.orders.map(o => (o._id === action.order._id ? action.order : o))
      newState = { ...state, orders }
      break

    case REMOVE_ORDER:
      newState = {
        ...state,
        orders: state.orders.filter(o => o._id !== action.orderId),
        hostOrders: state.hostOrders.filter(o => o._id !== action.orderId),
      }

    case MSG_READ: {
      const patch = o => (o._id === action.orderId ? { ...o, isHostMsgRead: true } : o)

      return {
        ...state,
        orders: state.orders.map(patch),
        hostOrders: state.hostOrders.map(patch),
      }
    }

    default:
      break
  }

  return newState
}
