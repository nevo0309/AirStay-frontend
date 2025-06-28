import { io } from 'socket.io-client'
import { toPlainId } from './util.service'
import { loadOrders } from '../store/order.actions'
import { showSuccessMsg } from './event-bus.service'

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
  socket.on('order-added', order => {
    storeRef.dispatch({ type: 'ADD_ORDER', order })

    const myId = storeRef.getState().userModule.user?._id
    if (myId && toPlainId(order.host._id) === myId) {
      showSuccessMsg(`New booking request`)
    }
  })

  socket.on('order-updated', ({ guestId, hostId, status }) => {
    const myId = storeRef.getState().userModule.user?._id
    if (!myId) return

    if (myId === guestId) {
      showSuccessMsg(`Your booking was ${status.toLowerCase()}`)
      loadOrders({ guestId: myId })
    }

    if (myId === hostId) {
      loadOrders({ hostId: myId })
    }
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
