import { io } from 'socket.io-client'
import { toPlainId } from './util.service'
import { loadOrders } from '../store/order.actions'

let socket
let storeRef // <-- Redux store reference

export function setupSocket(store) {
  if (socket) return // singleton guard
  storeRef = store

  const baseUrl = import.meta.env.PROD ? '' : 'http://localhost:3030'
  socket = io(baseUrl, { withCredentials: true })

  /* ← one-time global listeners → */
  socket.on('connect', () => console.log('[SOCKET] connected', socket.id))
  socket.on('disconnect', () => console.log('[SOCKET] disconnected'))
  socket.on('order-added', order => storeRef.dispatch({ type: 'ADD_ORDER', order }))
  socket.on('order-updated', ({ guestId, hostId }) => {
    const myId = storeRef.getState().userModule.user?._id
    if (!myId) return

    if (myId === guestId) storeRef.dispatch(loadOrders({ guestId: myId }))
    if (myId === hostId) storeRef.dispatch(loadOrders({ hostId: myId }))
  })
}

export const socketUser = {
  set(userId) {
    socket?.emit('set-user-socket', toPlainId(userId))
  },
  unset() {
    socket?.emit('unset-user-socket')
  },
}
