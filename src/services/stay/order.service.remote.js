// src/services/order/order.service.remote.js
//------------------------------------------------
// Remote (HTTP-based) CRUD utilities for orders
//------------------------------------------------

import { httpService } from '../http.service.js'

export const orderService = {
  query,
  getById,
  save,
  remove,
  updateStatus,
  getEmptyOrder,
}

function query(filterBy = {}) {
  return httpService.get('order', filterBy)
}

function getById(orderId) {
  return httpService.get(`order/${orderId}`)
}

async function save(order) {
  if (order._id) {
    return httpService.put(`order/${order._id}`, order)
  }
  return httpService.post('order', order)
}

function remove(orderId) {
  return httpService.delete(`order/${orderId}`)
}

async function updateStatus(orderId, status) {
  return httpService.patch(`order/${orderId}/status`, { status })
}

function getEmptyOrder() {
  return {
    _id: '',
    guest: null,
    host: null,
    stay: null,
    checkIn: '',
    checkOut: '',
    items: [],
    total: 0,
    price: 0,
    status: 'pending',
    createdAt: Date.now(),
  }
}
