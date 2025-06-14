import React, { useState, useEffect } from "react"
import { generateRandomOrders } from "../services/util.service"
import { OrdersTable } from "./OrdersTable"

export function Dashboard() {
  const userName = "Puki"
  const tabs = [
    { label: "All reservations", filter: "All" },
    { label: "Checking out", filter: "Checking out" },
    { label: "Currently hosting", filter: "Currently hosting" },
    { label: "Arriving soon", filter: "Arriving soon" },
    { label: "Upcoming", filter: "Upcoming" },
    { label: "Pending review", filter: "Pending" }
  ]

  const initialOrders = generateRandomOrders(15)

  // const initialOrders = [
  //   {
  //     _id: "o1001",
  //     guest: { fullname: "Lena Sparks" },
  //     stay: { name: "Hilltop Haven" },
  //     totalPrice: 245,
  //     startDate: "2025/06/15",
  //     endDate: "2025/06/18",
  //     status: "Approved"
  //   },
  //   {
  //     _id: "o1002",
  //     guest: { fullname: "Mark Twain" },
  //     stay: { name: "Seaside Cottage" },
  //     totalPrice: 420,
  //     startDate: "2025/07/01",
  //     endDate: "2025/07/06",
  //     status: "Pending"
  //   },
  //   {
  //     _id: "o1003",
  //     guest: { fullname: "Sophie Sky" },
  //     stay: { name: "Downtown Loft" },
  //     totalPrice: 330,
  //     startDate: "2025/06/13",
  //     endDate: "2025/06/16",
  //     status: "Approved"
  //   },
  //   {
  //     _id: "o1004",
  //     guest: { fullname: "Nathan Drift" },
  //     stay: { name: "Lakeview Bungalow" },
  //     totalPrice: 520,
  //     startDate: "2025/08/03",
  //     endDate: "2025/08/10",
  //     status: "Declined"
  //   },
  //   {
  //     _id: "o1005",
  //     guest: { fullname: "Tina Moon" },
  //     stay: { name: "Garden Studio" },
  //     totalPrice: 180,
  //     startDate: "2025/06/14",
  //     endDate: "2025/06/15",
  //     status: "Pending"
  //   },
  //   {
  //     _id: "o1006",
  //     guest: { fullname: "Jasper Vale" },
  //     stay: { name: "Treehouse Escape" },
  //     totalPrice: 610,
  //     startDate: "2025/06/12",
  //     endDate: "2025/06/17",
  //     status: "Approved"
  //   },
  //   {
  //     _id: "o1007",
  //     guest: { fullname: "Rachel Fern" },
  //     stay: { name: "Alpine Chalet" },
  //     totalPrice: 800,
  //     startDate: "2025/07/20",
  //     endDate: "2025/07/30",
  //     status: "Approved"
  //   },
  //   {
  //     _id: "o1008",
  //     guest: { fullname: "Brian West" },
  //     stay: { name: "Modern Condo" },
  //     totalPrice: 275,
  //     startDate: "2025/06/18",
  //     endDate: "2025/06/20",
  //     status: "Pending"
  //   },
  //   {
  //     _id: "o1009",
  //     guest: { fullname: "Isla Breeze" },
  //     stay: { name: "Zen Retreat" },
  //     totalPrice: 500,
  //     startDate: "2025/07/05",
  //     endDate: "2025/07/10",
  //     status: "Approved"
  //   },
  //   {
  //     _id: "o1010",
  //     guest: { fullname: "Oliver Stone" },
  //     stay: { name: "Beachfront Suite" },
  //     totalPrice: 950,
  //     startDate: "2025/06/30",
  //     endDate: "2025/07/04",
  //     status: "Declined"
  //   }
  // ]

  const [orders, setOrders] = useState(initialOrders)
  const [activeTab, setActiveTab] = useState(0)
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const isSameDay = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString()

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  useEffect(() => {
    const filterOrdersAsync = async () => {
      setLoading(true)
      const filter = tabs[activeTab].filter

      const result = orders.filter((order) => {
        const start = new Date(order.startDate)
        const end = new Date(order.endDate)
        const status = order.status.toLowerCase()

        if (filter === "All") return true
        if (status === "declined") return false
        if (filter === "Checking out")
          return isSameDay(end, today) || isSameDay(end, tomorrow)
        if (filter === "Currently hosting")
          return start <= today && end >= today
        if (filter === "Arriving soon")
          return isSameDay(start, today) || isSameDay(start, tomorrow)
        if (filter === "Upcoming") return start > tomorrow
        if (filter === "Pending") return status === "pending"
        return true
      })

      await new Promise((resolve) => setTimeout(resolve, 400)) // simulate async delay
      setFilteredOrders(result)
      setLoading(false)
    }

    filterOrdersAsync()
  }, [activeTab, orders])

  return (
    <div className='dashboard-container'>
      <main className='dashboard-main'>
        <h1>Welcome, {userName}!</h1>
        <section className='reservations-section'>
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

          {loading ? (
            <div className='loading'>Loading reservations...</div>
          ) : filteredOrders.length > 0 ? (
            <OrdersTable
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <div className='empty-state'>
              <div className='icon-placeholder'>📄</div>
              <p>No reservations found for this category.</p>
            </div>
          )}
        </section>
      </main>
      <footer className='dashboard-footer'>
        <div className='footer-column'>
          <h4>Hosting</h4>
          <ul>
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Airbnb-friendly apartments</li>
          </ul>
        </div>
        <div className='footer-column'>
          <h4>airstay</h4>
          <ul>
            <li>2025 Summer Release</li>
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Gift cards</li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
