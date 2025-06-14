import React from 'react'
import { format } from 'date-fns'

function Stars({ count }) {
  return (
    <span className="stars">
      {Array.from({ length: 5 }, (_, i) => (i < count ? '★' : '☆')).join('')}
    </span>
  )
}

export function DetailsReviews({ reviews }) {
  if (!reviews || !reviews.length) return null

  const numOfReviews = reviews.length
  const displayed = reviews.slice(0, 6)

  return (
    <section className="details-reviews">
      <div className="reviews-grid">
        {displayed.map(rev => (
          <article key={rev.at} className="review-card">
            <div className="reviewer">
              <img src={rev.by.imgUrl} alt={rev.by.fullname} className="reviewer-avatar" />
              <div className="reviewer-info">
                <h4 className="reviewer-name">{rev.by.fullname}</h4>
                {rev.by.location && <p className="reviewer-location">{rev.by.location}</p>}
              </div>
            </div>

            <div className="review-meta">
              <Stars count={rev.stars} />
              <span className="review-date">· {format(new Date(rev.at), 'MMMM yyyy')}</span>
              <span className="review-duration">· Stayed one night</span>
            </div>

            <p className="review-text">{rev.txt}</p>
          </article>
        ))}
      </div>
      {numOfReviews > 5 && (
        <button className="show-all-reviews">Show all {numOfReviews} reviews</button>
      )}
    </section>
  )
}
