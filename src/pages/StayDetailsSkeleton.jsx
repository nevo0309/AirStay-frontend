// src/cmps/details/SkeletonStayDetails.jsx
import React from 'react'

export function SkeletonStayDetails() {
  return (
    <div className="stay-details-skeleton">
      {/* Header placeholder */}
      <div className="stay-details-skeleton-header-title" />

      {/* Image-grid placeholders */}
      <section className="details-image-gallery">
        <div className="grid-container">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className={`image-wrapper${idx === 0 ? ' main-image' : ''}`}>
              <div className="stay-details-skeleton-image" />
            </div>
          ))}
        </div>
      </section>

      {/* Body text + sidebar placeholders */}
      <div className="stay-details-grid">
        <div className="details-left">
          <div className="stay-details-skeleton-text stay-details-skeleton-title" />
          <div className="stay-details-skeleton-text" />
          <div className="stay-details-skeleton-text stay-details-skeleton-subtitle" />
        </div>
        <div>
          <div className="stay-details-skeleton-text stay-details-skeleton-price" />
        </div>
      </div>
    </div>
  )
}
