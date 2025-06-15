// src/cmps/details/DetailsReviewSummary.jsx
import React from 'react'
import { RatingBreakdown } from './RatingBreakdown'
import {
  cleanlinessSvg,
  accuracySvg,
  communicationSvg,
  locationSvg,
  valueSvg,
  iconLibrary,
} from '../../../data/svgExport'

export function DetailsReviewSummary({ stay }) {
  const stats = {
    cleanliness: 4.9,
    accuracy: 5.0,
    checkIn: 5.0,
    communication: 5.0,
    location: 4.7,
    value: 4.9,
  }
  // 1) build the 1–5 counts
  const counts = stay.reviews.reduce(
    (acc, { stars }) => {
      acc[stars]++
      return acc
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  )

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

  // 2) average rating
  const avg = total > 0 ? stay.reviews.reduce((sum, { stars }) => sum + stars, 0) / total : 0

  const categories = [
    { label: 'Cleanliness', value: stats.cleanliness, icon: cleanlinessSvg },
    { label: 'Accuracy', value: stats.accuracy, icon: accuracySvg },
    { label: 'Check-in', value: stats.checkIn, icon: iconLibrary.Key },
    { label: 'Communication', value: stats.communication, icon: communicationSvg },
    { label: 'Location', value: stats.location, icon: locationSvg },
    { label: 'Value', value: stats.value, icon: valueSvg },
  ]

  return (
    <section className="details-review-summary">
      {/* overall header */}
      <div className="details-review-summary-header">
        <span className="details-review-summary-star">★</span>
        <span className="details-review-summary-avg">{avg.toFixed(2)}</span>
        <span className="details-review-summary-dot">·</span>
        <span className="details-review-summary-total">{total} reviews</span>
      </div>

      {/* breakdown + categories */}
      <div className="details-review-summary-content">
        <div className="details-review-summary-breakdown">
          <div className="details-review-breakdown-header">Overall rating</div>
          <RatingBreakdown counts={counts} />
        </div>
        <div className="details-review-summary-categories">
          {categories.map(({ label, value, icon }) => (
            <div key={label} className="details-review-summary-category">
              <div className="details-review-summary-label">{label}</div>
              <div className="details-review-summary-value">{value.toFixed(1)}</div>
              <div className="details-review-summary-icon">{icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
