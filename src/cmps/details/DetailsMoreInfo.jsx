import React from 'react'

export function DetailsMoreInfo({ stay }) {
  const {
    checkIn = '3:00 PM',
    checkOut = '11:00 AM',
    capacity,
    safety = ['No carbon monoxide alarm', 'Smoke alarm'],
    cancellation = [
      'This reservation is non-refundable.',
      "Review this Host's full policy for details.",
    ],
  } = stay

  return (
    <section className="details-more-info">
      <h2 className="details-more-info-title">Things to know</h2>
      <div className="details-more-info-grid">
        {/* House rules */}
        <div className="details-more-info-block">
          <h3 className="details-more-info-heading">House rules</h3>
          <ul className="details-more-info-list">
            <li>Check-in: {checkIn}</li>
            <li>Checkout before {checkOut}</li>
            <li>{capacity} guests maximum</li>
          </ul>
          <button className="details-more-info-show-more">Show more ›</button>
        </div>

        {/* Safety & property */}
        <div className="details-more-info-block">
          <h3 className="details-more-info-heading">Safety &amp; property</h3>
          <ul className="details-more-info-list">
            {safety.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button className="details-more-info-show-more">Show more ›</button>
        </div>

        {/* Cancellation policy */}
        <div className="details-more-info-block">
          <h3 className="details-more-info-heading">Cancellation policy</h3>
          <ul className="details-more-info-list">
            {cancellation.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <button className="details-more-info-show-more">Show more ›</button>
        </div>
      </div>
    </section>
  )
}
