// src/services/order/order.service.local.js

import { storageService } from '../async-storage.service.js'
import { makeId } from '../../services/util.service.js'

const STORAGE_KEY = 'orderDB'

export const orderService = {
  query,
  getById,
  save,
  remove,
  getEmptyOrder,
}

// 1. Query (get all orders, optionally filtered)
function query(filterBy = {}) {
  // If you want to filter on the client side, you can do so here.
  // But for now, just return every order in localStorage.
  return storageService.query(STORAGE_KEY)
}

function getById(orderId) {
  return storageService.get(STORAGE_KEY, orderId)
}

async function save(order) {
  // If order has an _id, we treat it as an update
  if (order._id) {
    return storageService.put(STORAGE_KEY, order)
  } else {
    // New order: generate an _id and push
    order._id = makeId()
    order.createdAt = Date.now()
    return storageService.post(STORAGE_KEY, order)
  }
}

function remove(orderId) {
  return storageService.remove(STORAGE_KEY, orderId)
}

// Helper: return an “empty order” shape that the UI can start from
function getEmptyOrder() {
  return {
    _id: '',
    items: [], // e.g. [ { productId, qty, price }, … ]
    total: 0,
    status: 'pending', // e.g. 'pending', 'shipped', 'delivered'
    createdAt: Date.now(),
  }
}
