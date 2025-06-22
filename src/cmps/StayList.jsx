import React from 'react'
import { StayCarousel } from './carousel/StayCarousel'
import { rightArrowSvg } from '../../data/svgExport'

export function StayList({ staysByCity, onRemoveStay, onUpdateStay }) {
  const sections = [
    { city: 'Eilat', title: <>Popular homes in Eilat {rightArrowSvg}</> },
    {
      city: 'New York',
      title: <>Available in New York this weekend {rightArrowSvg}</>,
    },
    { city: 'Paris', title: <>Places to stay in Paris {rightArrowSvg}</> },
    { city: 'Barcelona', title: <>Stay in Barcelona {rightArrowSvg}</> },
    { city: 'Athens', title: <>Available in Athens this weekend {rightArrowSvg}</> },
  ]

  return (
    <section className="explor-lists">
      {sections.map(({ city, title }) => (
        <StayCarousel
          key={city}
          title={title}
          stays={staysByCity[city] || []}
          onRemoveStay={onRemoveStay}
          onUpdateStay={onUpdateStay}
        />
      ))}
    </section>
  )
}
