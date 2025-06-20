import { useState, useEffect } from "react"
import { formatFullDate } from "../services/util.service"

export function OrdersTable() {
  const userName = "Brayen Cheski"

  const orders = [
    {
      _id: "o1001",
      guest: { _id: "u101", fullname: "Lena Sparks" },
      guests: { adults: 2, children: 0, infants: 1, pets: 0 },
      startDate: "2025/06/15",
      endDate: "2025/06/18",
      bookedAt: "2025/05/20",
      stay: { _id: "s101", name: "Hilltop Haven" },
      totalPrice: 245,
      status: "Approved"
    },
    {
      _id: "o1002",
      guest: { _id: "u102", fullname: "Mark Twain" },
      guests: { adults: 1, children: 1, infants: 0, pets: 1 },
      startDate: "2025/07/01",
      endDate: "2025/07/06",
      bookedAt: "2025/06/01",
      stay: { _id: "s102", name: "Seaside Cottage" },
      totalPrice: 420,
      status: "Pending"
    },
    {
      _id: "o1003",
      guest: { _id: "u103", fullname: "Sophie Sky" },
      guests: { adults: 2, children: 2, infants: 1, pets: 0 },
      startDate: "2025/06/13",
      endDate: "2025/06/16",
      bookedAt: "2025/05/22",
      stay: { _id: "s103", name: "Downtown Loft" },
      totalPrice: 330,
      status: "Approved"
    },
    {
      _id: "o1004",
      guest: { _id: "u104", fullname: "Nathan Drift" },
      guests: { adults: 2, children: 1, infants: 0, pets: 1 },
      startDate: "2025/08/03",
      endDate: "2025/08/10",
      bookedAt: "2025/07/01",
      stay: { _id: "s104", name: "Lakeview Bungalow" },
      totalPrice: 520,
      status: "Declined"
    }
  ]

  const tabs = [
    { label: "All reservations", filter: "All" },
    { label: "Checking out", filter: "Checking out" },
    { label: "Currently hosting", filter: "Currently hosting" },
    { label: "Arriving soon", filter: "Arriving soon" },
    { label: "Upcoming", filter: "Upcoming" },
    { label: "Pending review", filter: "Pending" }
  ]
  const [activeTab, setActiveTab] = useState(0)
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const [currentOrders, setCurrentOrders] = useState(orders)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const isSameDay = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString()

  const handleStatusChange = (orderId, newStatus) => {
    const updated = currentOrders.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order
    )
    setCurrentOrders(updated)
  }

  useEffect(() => {
    const filter = tabs[activeTab].filter
    const result = currentOrders.filter((order) => {
      const start = new Date(order.startDate)
      const end = new Date(order.endDate)
      const status = order.status.toLowerCase()

      if (filter === "All") return true
      if (status === "declined") return false
      if (filter === "Checking out")
        return isSameDay(end, today) || isSameDay(end, tomorrow)
      if (filter === "Currently hosting") return start <= today && end >= today
      if (filter === "Arriving soon")
        return isSameDay(start, today) || isSameDay(start, tomorrow)
      if (filter === "Upcoming") return start > tomorrow
      if (filter === "Pending") return status === "pending"
      return true
    })
    setFilteredOrders(result)
  }, [activeTab, currentOrders])

  return (
    <div className='orders-table-wrapper'>
      <h1>Welcome, {userName}!</h1>
      <h2>Your reservations</h2>
      <div className='tabs'>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${index === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className='empty-state'>
          <div className='icon-placeholder'>📄</div>
          <p>No reservations found for this category.</p>
        </div>
      ) : (
        <table className='orders-table'>
          <thead className='table-header'>
            <tr className='header-row'>
              <th className='th-status'>Status</th>
              <th className='th-guest'>Guest</th>
              <th className='th-checkin'>Check-in</th>
              <th className='th-checkout'>Checkout</th>
              <th className='th-booked'>Booked</th>
              <th className='th-stay'>Listing</th>
              <th className='th-payment'>Payment</th>
              <th className='th-action'>Action</th>
            </tr>
          </thead>
          <tbody className='table-body'>
            {filteredOrders.map((order) => {
              const guestName = order.guest?.fullname || "Unknown Guest"
              const checkIn = formatFullDate(order.startDate)
              const checkOut = formatFullDate(order.endDate)
              const bookedDate = formatFullDate(
                order.createdAt || order.bookedAt || order.startDate
              )
              const status = order.status || "Unknown"
              const stayName = order.stay?.name || "Unknown Stay"

              return (
                <tr key={order._id} className='order-row'>
                  <td className='td-status'>
                    <span
                      className={`status-cell status-${status.toLowerCase()}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className='td-guest guest-info'>
                    <img
                      src={
                        order.guest?.imgUrl ||
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                      }
                      alt={guestName}
                      className='avatar'
                    />
                    <div className='guest-text'>
                      <div className='guest-name'>{guestName}</div>
                      <div className='guest-role'>Guest</div>
                    </div>
                  </td>
                  <td className='td-checkin'>{checkIn}</td>
                  <td className='td-checkout'>{checkOut}</td>
                  <td className='td-booked'>{bookedDate}</td>
                  <td className='td-listing'>{stayName}</td>
                  <td className='td-payment'>${order.totalPrice}</td>
                  <td className='td-action'>
                    {status === "Pending" ? (
                      <div className='action-buttons'>
                        <button
                          className='btn-approve'
                          onClick={() =>
                            handleStatusChange(order._id, "Approved")
                          }
                        >
                          Approve
                        </button>
                        <button
                          className='btn-decline'
                          onClick={() =>
                            handleStatusChange(order._id, "Declined")
                          }
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
