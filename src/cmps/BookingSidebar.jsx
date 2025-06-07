import React from 'react'
import { calculateNights, formatDateRange } from '../services/util.service'

export function BookingSidebar({ stay, startDate, endDate, guests }) {
  if (!stay) return null

  // 1. Calculate number of nights between startDate and endDate
  const nights = calculateNights(startDate, endDate)
  const pricePerNight = stay.price
  const basePrice = pricePerNight * nights
  const cleaningFee = 55
  const serviceFee = 62.82
  const total = basePrice + cleaningFee + serviceFee
  const formattedDateRange = formatDateRange(startDate, endDate)

  return (
    <aside className="booking-sidebar">
      <div className="sidebar-header">
        <div className="stay-image-wrapper">
          <img src={stay.imgUrls[0]} alt={stay.name} className="stay-image" />
        </div>
        <div className="stay-info">
          <h2 className="stay-name">{stay.name}</h2>
          <div className="stay-rating">
            <span className="star">★</span>
            <span className="rating-value">
              {typeof stay.rating === 'number' ? stay.rating.toFixed(2) : '4.76'}
            </span>
            <span className="review-count">({stay.reviews?.length || 145})</span>
          </div>
        </div>
      </div>

      {/* 2. Free cancellation section */}
      <div className="cancellation-section">
        <h3 className="free-cancel">Free cancellation</h3>
        <p className="cancel-text">
          Cancel before Jul 3 for a full refund.{' '}
          <span className="full-policy-link">Full policy</span>
        </p>
      </div>

      {/* 3. Trip details section */}
      <div className="trip-details-section">
        <div className="section-header">
          <h3 className="section-title">Trip details</h3>
          <button className="change-button">Change</button>
        </div>
        <p className="trip-dates">{formattedDateRange}</p>
        <p className="trip-guests">
          {guests.adults} adult{guests.adults > 1 ? 's' : ''}
          {guests.kids > 0 ? `, ${guests.kids} kid${guests.kids > 1 ? 's' : ''}` : ''}
        </p>
      </div>

      {/* 4. Price details section */}
      <div className="price-details-section">
        <h3 className="section-title">Price details</h3>
        <div className="price-breakdown">
          <div className="price-row">
            <span>
              ₪{pricePerNight}.00 x {nights} nights
            </span>
            <span>₪{basePrice.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Cleaning fee</span>
            <span>₪{cleaningFee.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Airbnb service fee</span>
            <span>₪{serviceFee.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* 5. Total section */}
      <div className="total-section">
        <div className="total-row">
          <span className="total-label">Total ILS</span>
          <span className="total-value">₪{total.toFixed(2)}</span>
        </div>
        <button className="price-breakdown-button">Price breakdown</button>
      </div>
    </aside>
  )
}
