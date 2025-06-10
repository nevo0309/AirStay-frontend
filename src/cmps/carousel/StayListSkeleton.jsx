import React from 'react'
import { StayCarouselSkeleton } from './StayCarouselSkeleton'

export function StayListSkeleton() {
  const skeletonRows = Array.from({ length: 5 }, (_, idx) => idx)

  return (
    <section className="explor-lists main-container">
      {skeletonRows.map(idx => (
        <StayCarouselSkeleton key={idx} />
      ))}
    </section>
  )
}
