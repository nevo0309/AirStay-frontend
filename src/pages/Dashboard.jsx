import React, { useState, useEffect } from "react"
import { OrdersTable } from "./OrdersTable"

export function Dashboard() {
  const initialOrders = [
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

  return (
    <div className='dashboard-container'>
      <main className='dashboard-main'>
        {/* <h1>Welcome, {userName}!</h1> */}
        <section className='reservations-section'>
          {/* <h2>Your reservations</h2> */}
          <OrdersTable orders={initialOrders} />
        </section>
      </main>
      {/* <footer className='dashboard-footer'>
        <div className='footer-column'>
          <h4>Hosting</h4>
          <ul>
            <li>Airstay your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Airstay-friendly apartments</li>
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
      </footer> */}
    </div>
  )
}
