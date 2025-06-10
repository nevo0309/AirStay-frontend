// src/cmps/StayList.jsx
import React from 'react'
import { StayCarousel } from './carousel/StayCarousel'

export function StayList({ stays }) {
  const sections = [
    'Popular homes in Eilat >',
    'Available in Tel Aviv-Yafo this weekend >',
    'Stay in Athens >',
    'Available in Jerusalem this weekend >',
    'Homes in Budapest >',
    'Available next month in Rome >',
    'Places to stay in Paris >',
    'Check out homes in Haifa >',
    'Popular homes in London >',
    'Stay in Madrid >',
  ]

  return (
    <section className="explor-lists main-container">
      {sections.map((title, idx) => (
        <StayCarousel key={idx} stays={stays} title={title} />
      ))}
    </section>
  )
}
