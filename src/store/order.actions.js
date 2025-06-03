// src/store/order.actions.js

import { orderService } from '../services/stay/order.service.local.js'
import { store } from './store.js' // adjust path if needed
import { SET_ORDERS, SET_ORDER, ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER } from './order.reducer.js'

// === Action Creators ===
function _setOrders(orders) {
  return {
    type: SET_ORDERS,
    orders,
  }
}

function _setOrder(order) {
  return {
    type: SET_ORDER,
    order,
  }
}

function _addOrder(order) {
  return {
    type: ADD_ORDER,
    order,
  }
}

function _updateOrder(order) {
  return {
    type: UPDATE_ORDER,
    order,
  }
}

function _removeOrder(orderId) {
  return {
    type: REMOVE_ORDER,
    orderId,
  }
}

export async function loadOrders(filterBy = {}) {
  try {
    const orders = await orderService.query(filterBy)
    store.dispatch(_setOrders(orders))
  } catch (err) {
    console.error('Cannot load orders', err)
    throw err
  }
}

// 2. Load one order by ID (e.g., when going to “Order Details”)
export async function loadOrder(orderId) {
  try {
    const order = await orderService.getById(orderId)
    store.dispatch(_setOrder(order))
  } catch (err) {
    console.error('Cannot load order', err)
    throw err
  }
}

// 3. Add a brand‐new order (using localStorage under the hood)
export async function addOrder(orderData) {
  try {
    const savedOrder = await orderService.save(orderData)
    store.dispatch(_addOrder(savedOrder))
    return savedOrder
  } catch (err) {
    console.error('Cannot add order', err)
    throw err
  }
}

// 4. Update an existing order
export async function updateOrder(orderData) {
  try {
    const savedOrder = await orderService.save(orderData)
    store.dispatch(_updateOrder(savedOrder))
    return savedOrder
  } catch (err) {
    console.error('Cannot update order', err)
    throw err
  }
}

// 5. Remove an order
export async function removeOrder(orderId) {
  try {
    await orderService.remove(orderId)
    store.dispatch(_removeOrder(orderId))
  } catch (err) {
    console.error('Cannot remove order', err)
    throw err
  }
}
