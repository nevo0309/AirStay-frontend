import React, { useState } from "react"
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
  const orders = [
    // 1. Checking Out: endDate === today or tomorrow
    {
      _id: "o2001",
      guest: { fullname: "Anna Checkout" },
      stay: { name: "Quick Inn" },
      totalPrice: 180,
      startDate: "2025/06/10",
      endDate: "2025/06/16", // ✅ fixed date format
      status: "Approved"
    },

    // 2. Currently Hosting: today is between start and end
    {
      _id: "o2002",
      guest: { fullname: "Bob Host" },
      stay: { name: "Downtown Loft" },
      totalPrice: 240,
      startDate: "2025/06/10",
      endDate: "2099/12/31",
      status: "Approved"
    },

    // 3. Arriving Soon: startDate === today or tomorrow
    {
      _id: "o2003",
      guest: { fullname: "Carol Arriver" },
      stay: { name: "Welcome Home" },
      totalPrice: 320,
      startDate: "2025/06/15",
      endDate: "2025/06/20",
      status: "Approved"
    },

    // 4. Upcoming: startDate > tomorrow
    {
      _id: "o2004",
      guest: { fullname: "Dan Future" },
      stay: { name: "Modern Studio" },
      totalPrice: 350,
      startDate: "2099/01/01",
      endDate: "2099/01/05",
      status: "Approved"
    },

    // 5. Pending review: status === "Pending"
    {
      _id: "o2005",
      guest: { fullname: "Eva Review" },
      stay: { name: "Ocean View" },
      totalPrice: 400,
      startDate: "2025/07/10",
      endDate: "2025/07/15",
      status: "Pending"
    }
  ]

  const [activeTab, setActiveTab] = useState(0)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const isSameDay = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString()

  const filteredOrders = orders.filter((order) => {
    const start = new Date(order.startDate)
    const end = new Date(order.endDate)
    const status = order.status.toLowerCase()
    const filter = tabs[activeTab].filter

    if (filter === "All") {
      return orders.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      )
    }

    if (filter === "Checking out") {
      return isSameDay(end, today) || isSameDay(end, tomorrow)
    }

    if (filter === "Currently hosting") {
      return start <= today && end >= today
    }

    if (filter === "Arriving soon") {
      return isSameDay(start, today) || isSameDay(start, tomorrow)
    }

    if (filter === "Upcoming") {
      return start > tomorrow
    }

    if (filter === "Pending") {
      return status === "pending"
    }

    return true
  })

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

          {filteredOrders.length > 0 ? (
            <OrdersTable orders={filteredOrders} />
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
