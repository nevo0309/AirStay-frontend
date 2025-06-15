import React from 'react'

export function RatingBreakdown({ counts }) {
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

  return (
    <div className="rating-breakdown">
      {[5, 4, 3, 2, 1].map(star => {
        const count = counts[star] || 0
        const pct = total > 0 ? (count / total) * 100 : 0

        return (
          <div key={star} className="rating-breakdown-row">
            <span className="rating-breakdown-label">{star}</span>
            <div className="rating-breakdown-bar">
              <div className="rating-breakdown-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
