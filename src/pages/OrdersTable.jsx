import { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { formatFullDate } from '../services/util.service'
import { showErrorMsg } from '../services/event-bus.service'
import { loadOrders, updateOrderStatus, markMsgRead } from '../store/order.actions'

import { Modal } from '../cmps/Modal'
import { OrdersCards } from '../cmps/OrdersCards'

export function OrdersTable() {
  const user = useSelector(store => store.userModule.user)
  const orders = useSelector(store => store.orderModule.orders)

  const navigate = useNavigate()

  useEffect(() => {
    if (user?._id) loadOrders({ hostId: user._id })
  }, [user?._id])

  useEffect(() => {
    if (!user) {
      showErrorMsg('Unauthorized – please log in')
      navigate('/')
    }
  }, [user, navigate])

  if (!user) return null
  const userName = user.fullname

  /* ------------------------------------------------------------------ */
  /*  Detect very small screens (≤ 480 px)                              */
  /* ------------------------------------------------------------------ */
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 480)
  useLayoutEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const tabs = [
    { label: 'All reservations', filter: 'All' },
    { label: 'Checking out', filter: 'Checking out' },
    { label: 'Currently hosting', filter: 'Currently hosting' },
    { label: 'Arriving soon', filter: 'Arriving soon' },
    { label: 'Upcoming', filter: 'Upcoming' },
    { label: 'Pending review', filter: 'Pending' },
  ]

  const [activeTab, setActiveTab] = useState(0)
  const [currentOrders, setCurrentOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const [openMsg, setOpenMsg] = useState(null) // { id, text }

  // helpers
  const hasGuestMsg = o => o.message && o.message.trim().length
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const isSameDay = (d1, d2) => new Date(d1).toDateString() === new Date(d2).toDateString()

  useEffect(() => setCurrentOrders(orders), [orders])

  useEffect(() => {
    const filter = tabs[activeTab].filter
    const result = currentOrders.filter(order => {
      const start = new Date(order.startDate)
      const end = new Date(order.endDate)
      const status = (order.status || '').toLowerCase()

      if (filter === 'All') return true
      if (status === 'declined') return false
      if (filter === 'Checking out') return isSameDay(end, today) || isSameDay(end, tomorrow)
      if (filter === 'Currently hosting') return start <= today && end >= today
      if (filter === 'Arriving soon') return isSameDay(start, today) || isSameDay(start, tomorrow)
      if (filter === 'Upcoming') return start > tomorrow
      if (filter === 'Pending') return status === 'pending'
      return true
    })
    setFilteredOrders(result)
  }, [activeTab, currentOrders])

  async function handleStatusChange(orderId, newStatus) {
    try {
      await updateOrderStatus(orderId, newStatus)
    } catch (err) {
      console.error(err)
      showErrorMsg('Could not update reservation status')
    }
  }

  return (
    <div className="orders-wrapper">
      <h1>Welcome, {userName}!</h1>
      <h2></h2>
      <h2>Your reservations</h2>

      {/* ── category tabs ── */}
      <div className="tabs">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            className={`tab-btn ${idx === activeTab ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-state">
          <div className="icon-placeholder">📄</div>
          <p>No reservations found for this category.</p>
        </div>
      ) : isMobile ? (
        /* ============================================================
         *  MOBILE  – cards
         * ============================================================ */
        <div className="orders-cards">
          {filteredOrders.map(order => (
            <OrdersCards
              key={order._id}
              order={order}
              hasMsg={hasGuestMsg(order)}
              onOpenMsg={async () => {
                if (!order.isHostMsgRead) await markMsgRead(order._id)
                setOpenMsg({ id: order._id, text: order.message })
              }}
              onApprove={() => handleStatusChange(order._id, 'approved')}
              onDecline={() => handleStatusChange(order._id, 'declined')}
            />
          ))}
        </div>
      ) : (
        /* ============================================================
         *  DESKTOP
         * ============================================================ */
        <table className="orders-table">
          <thead className="table-header">
            <tr className="header-row">
              <th className="th-status">Status</th>
              <th className="th-guest">Guest</th>
              <th className="th-checkin">Check-in</th>
              <th className="th-checkout">Checkout</th>
              <th className="th-booked">Booked</th>
              <th className="th-stay">Listing</th>
              <th className="th-payment">Payment</th>
              <th className="th-message">Action</th>
              {/* <th className="th-action">Action</th> */}
            </tr>
          </thead>

          <tbody className="table-body">
            {filteredOrders.map(order => {
              const guestName = order.guest?.fullname || 'Unknown Guest'
              const checkIn = formatFullDate(order.startDate)
              const checkOut = formatFullDate(order.endDate)
              const bookedDate = formatFullDate(
                order.createdAt || order.bookedAt || order.startDate
              )
              const status = (order.status || 'unknown').toLowerCase()
              const stayName = order.stay?.name || 'Unknown Stay'
              const showMsg = hasGuestMsg(order)

              return (
                <tr key={order._id} className="order-row">
                  {/* status */}
                  <td className="td-status">
                    <span className={`status-cell status-${status}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>

                  {/* guest */}
                  <td className="td-guest guest-info">
                    <img
                      src={
                        order.guest?.imgUrl ||
                        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                      }
                      alt={guestName}
                      className="avatar"
                    />
                    <div className="guest-text">
                      <div className="guest-name">{guestName}</div>
                      <div className="guest-role">Guest</div>
                    </div>
                  </td>

                  {/* dates */}
                  <td className="td-checkin">{checkIn}</td>
                  <td className="td-checkout">{checkOut}</td>
                  <td className="td-booked">{bookedDate}</td>

                  {/* stay + price */}
                  <td className="td-listing">{stayName}</td>
                  <td className="td-payment">₪{order.totalPrice}</td>

                  {/* message */}
                  <td className="td-message">
                    {showMsg ? (
                      <button
                        className="btn-msg"
                        onClick={async () => {
                          if (!order.isHostMsgRead) await markMsgRead(order._id)
                          setOpenMsg({ id: order._id, text: order.message })
                        }}
                      >
                        View message
                        {!order.isHostMsgRead && <span className="new-dot" />}
                      </button>
                    ) : (
                      '—'
                    )}
                  </td>

                  {/* approve / decline */}
                  {/* <td className="td-action">
                    {status === 'pending' ? (
                      <div className="action-buttons">
                        <button
                          className="btn-approve"
                          onClick={() => handleStatusChange(order._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-decline"
                          onClick={() => handleStatusChange(order._id, 'declined')}
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      '—'
                    )}
                  </td> */}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}

      {/* ── modal ── */}
      {openMsg && (
        <Modal contentClassName="host-msg" onClose={() => setOpenMsg(null)}>
          {isMobile ? (
            /* ────── PHONE: just the guest message ────── */
            <div className="msg-modal">
              <h2>Guest message</h2>
              <p>{openMsg.text}</p>
            </div>
          ) : (
            /* ────── DESKTOP modal with actions ────── */
            <div className="msg-modal">
              <h2>Guest order</h2>

              <h3>Guest message</h3>
              <p>{openMsg.text}</p>

              <h3 className="order-action">Order action</h3>
              <div className="modal-actions">
                <button
                  className="btn-approve"
                  onClick={() => {
                    handleStatusChange(openMsg.id, 'approved')
                    setOpenMsg(null)
                  }}
                >
                  Approve
                </button>
                <button
                  className="btn-decline"
                  onClick={() => {
                    handleStatusChange(openMsg.id, 'declined')
                    setOpenMsg(null)
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
