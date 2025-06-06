// src/components/ReservePage.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronDown, ArrowLeft } from 'lucide-react'

import { stayService } from '../services/stay/stay.service.local.js'
import { orderService } from '../services/stay/order.service.local.js'
import { ADD_ORDER } from '../store/order.reducer.js'

import { BookingSidebar } from '../cmps/BookkingSidebar.jsx'

export function ReservePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { stayId } = useParams()

  // State to hold the full stay object once we load it
  const [stay, setStay] = useState(null)
  const [loadingStay, setLoadingStay] = useState(true)

  const [startDate, setStartDate] = useState('2025-07-04')
  const [endDate, setEndDate] = useState('2025-07-06')
  const [guests, setGuests] = useState({ adults: 1, kids: 0 })

  const [currentStep, setCurrentStep] = useState(1)
  const [paymentOption, setPaymentOption] = useState('full')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [message, setMessage] = useState('')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiration: '',
    cvv: '',
    zipCode: '',
    country: 'Israel',
  })

  useEffect(() => {
    const loadStay = async () => {
      try {
        const fetched = await stayService.getById(stayId)
        setStay(fetched)
      } catch (err) {
        console.error('Could not load stay', err)
      } finally {
        setLoadingStay(false)
      }
    }
    loadStay()
  }, [stayId])

  const handleBackArrow = () => {
    navigate(-1) // go back to previous page
  }

  // When user clicks "Next" / "Next" on each step
  const handleStepComplete = step => {
    setCurrentStep(step + 1)
  }

  // Controlled inputs for card details
  const handleCardDetailsChange = e => {
    const { name, value } = e.target
    setCardDetails(prev => ({ ...prev, [name]: value }))
  }

  const handleConfirm = async () => {
    if (!stay) return
    const orderData = {
      paymentOption,
      paymentMethod,
      message,
      cardDetails,
      OrderedAt: Date.now(),

      stay: {
        _id: stay._id,
        name: stay.name,
        imgUrl: stay.imgUrls[0],
      },
      guest: {
        _id: 'u101',
        fullname: 'User 1',
      },
      host: {
        _id: stay.host._id,
        fullname: stay.host.fullname,
        imgUrl: stay.host.thumbnailUrl || stay.host.pictureUrl,
      },
      totalPrice: calculateTotalPrice(stay.price, startDate, endDate),
      startDate,
      endDate,
      guests, // { adults, kids }
      msgs: [],
      status: 'pending',
    }

    try {
      const savedOrder = await orderService.save(orderData)

      dispatch({
        type: ADD_ORDER,
        order: savedOrder,
      })

      // Reset
      setCurrentStep(1)
      setPaymentOption('full')
      setPaymentMethod('card')
      setMessage('')
      setCardDetails({
        number: '',
        expiration: '',
        cvv: '',
        zipCode: '',
        country: 'Israel',
      })

      navigate('/') // or wherever you want to send them
      alert('Your order has been placed!')
    } catch (err) {
      console.error('Failed to add order:', err)
      alert('Something went wrong. Please try again.')
    }
  }

  function calculateTotalPrice(pricePerNight, sd, ed) {
    const nights = Math.round(
      (new Date(ed + 'T00:00:00') - new Date(sd + 'T00:00:00')) / (1000 * 60 * 60 * 24)
    )
    const base = pricePerNight * (nights > 0 ? nights : 0)
    const cleaningFee = 55
    const serviceFee = 62.82
    return base + cleaningFee + serviceFee
  }

  if (loadingStay) {
    return <div>Loading stay details…</div>
  }

  if (!stay) {
    return <div>Stay not found.</div>
  }

  return (
    <div className="reserve-page">
      {/* Header */}
      <div className="reserve-container">
        <div className="reserve-header">
          <div className="header-container">
            <div className="back-arrow" onClick={handleBackArrow}>
              <ArrowLeft />
            </div>
            <h1 className="page-title">Request to book</h1>
          </div>
        </div>

        <div className="reserve-grid">
          {/* ========== LEFT SIDE: 4‐Step Wizard ========== */}
          <div className="reserve-content">
            {/* --- Step 1: Choose when to pay --- */}
            {currentStep === 1 ? (
              <div className="step-card">
                <div className="step-header">
                  <h2 className="step-title">1. Choose when to pay</h2>
                </div>
                <div className="step-body">
                  <div className="payment-options">
                    <label className="payment-option">
                      <div className="option-content">
                        <div className="option-text">Pay ₪507.82 now</div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value="full"
                        checked={paymentOption === 'full'}
                        onChange={e => setPaymentOption(e.target.value)}
                        className="radio-input"
                      />
                    </label>

                    <label className="payment-option">
                      <div className="option-content">
                        <div className="option-text">Pay part now, part later</div>
                        <div className="option-subtext">
                          ₪101.57 now, ₪406.25 charged on Jun 25. No extra fees.
                          <span className="more-info">More info</span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        value="split"
                        checked={paymentOption === 'split'}
                        onChange={e => setPaymentOption(e.target.value)}
                        className="radio-input"
                      />
                    </label>
                  </div>
                </div>
                <div className="step-footer">
                  <button className="done-button" onClick={() => handleStepComplete(1)}>
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="collapsed-summary">
                <div className="summary-left">
                  <h2 className="step-title">1. Choose when to pay</h2>
                  <span className="summary-text">
                    {paymentOption === 'full' ? 'Pay ₪507.82 now' : 'Pay part now, part later'}
                  </span>
                </div>
                <button className="change-button" onClick={() => setCurrentStep(1)}>
                  Change
                </button>
              </div>
            )}

            {/* --- Step 2: Add a payment method --- */}
            {currentStep > 2 ? (
              <div className="collapsed-summary">
                <div className="summary-left">
                  <h2 className="step-title">2. Add a payment method</h2>
                  <span className="summary-text">
                    {paymentMethod === 'card'
                      ? `Card ending in ${cardDetails.number.slice(-4) || 'XXXX'}`
                      : 'Google Pay'}
                  </span>
                </div>
                <button className="change-button" onClick={() => setCurrentStep(2)}>
                  Change
                </button>
              </div>
            ) : currentStep === 2 ? (
              <div className="step-card">
                <div className="step-header">
                  <h2 className="step-title">2. Add a payment method</h2>
                </div>
                <div className="step-body">
                  <div className="payment-method-form">
                    <div className="method-selector">
                      <label
                        className={`payment-method-option ${
                          paymentMethod === 'card' ? 'selected' : ''
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <div className="method-info">
                          <div className="card-icon">💳</div>
                          <span>Credit or debit card</span>
                          <div className="card-logos">
                            <span className="visa">VISA</span>
                            <span className="mastercard">●●</span>
                            <span className="amex">AMEX</span>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={e => setPaymentMethod(e.target.value)}
                          className="radio-input"
                          onClick={e => e.stopPropagation()}
                        />
                      </label>

                      {paymentMethod === 'card' && (
                        <div className="card-form">
                          <div className="card-numbers">
                            <div className="form-group">
                              <input
                                type="text"
                                name="number"
                                placeholder="Card number 🔒"
                                value={cardDetails.number}
                                onChange={handleCardDetailsChange}
                                className="form-input"
                              />
                            </div>
                            <div className="card-extra-info">
                              <div className="form-group half">
                                <input
                                  type="text"
                                  name="expiration"
                                  placeholder="Expiration"
                                  value={cardDetails.expiration}
                                  onChange={handleCardDetailsChange}
                                  className="form-input"
                                />
                              </div>
                              <div className="form-group half">
                                <input
                                  type="text"
                                  name="cvv"
                                  placeholder="CVV"
                                  value={cardDetails.cvv}
                                  onChange={handleCardDetailsChange}
                                  className="form-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group zip">
                            <input
                              type="text"
                              name="zipCode"
                              placeholder="ZIP code"
                              value={cardDetails.zipCode}
                              onChange={handleCardDetailsChange}
                              className="form-input"
                            />
                          </div>
                          <div className="form-group country">
                            <div className="select-wrapper">
                              <select
                                name="country"
                                value={cardDetails.country}
                                onChange={handleCardDetailsChange}
                                className="form-select"
                              >
                                <option value="Israel">Israel</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                {/* …more countries… */}
                              </select>
                              <ChevronDown className="select-icon" size={16} />
                            </div>
                          </div>
                        </div>
                      )}

                      <label
                        className={`payment-method-option ${
                          paymentMethod === 'gpay' ? 'selected' : ''
                        }`}
                        onClick={() => setPaymentMethod('gpay')}
                      >
                        <div className="method-info">
                          <div className="card-icon">
                            <span className="gpay-icon" style={{ fontWeight: 'bold' }}>
                              G
                            </span>
                          </div>
                          <span>Google Pay</span>
                        </div>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="gpay"
                          checked={paymentMethod === 'gpay'}
                          onChange={e => setPaymentMethod(e.target.value)}
                          className="radio-input"
                          onClick={e => e.stopPropagation()}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="step-footer">
                  <button className="done-button" onClick={() => handleStepComplete(2)}>
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="collapsed-summary inactive">
                <div className="summary-left">
                  <h2 className="step-title">2. Add a payment method</h2>
                </div>
              </div>
            )}

            {/* --- Step 3: Write a message to the host --- */}
            {currentStep > 3 ? (
              <div className="collapsed-summary">
                <div className="summary-left">
                  <h2 className="step-title">3. Write a message to the host</h2>
                  <span className="summary-text">{message || '(No message)'}</span>
                </div>
                <button className="change-button" onClick={() => setCurrentStep(3)}>
                  Change
                </button>
              </div>
            ) : currentStep === 3 ? (
              <div className="step-card">
                <div className="step-header">
                  <h2 className="step-title">3. Write a message to the host</h2>
                </div>
                <div className="step-body">
                  <div className="message-form">
                    <p className="message-instruction">
                      Before you can continue, let the host know a little about your trip and why
                      their place is a good fit.
                    </p>
                    <div className="message-input-container">
                      <textarea
                        placeholder="Example: Hi, my partner and I are going to..."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="message-textarea"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="step-footer">
                  <button
                    className="done-button-message"
                    onClick={() => handleStepComplete(3)}
                    disabled={!message}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="collapsed-summary inactive">
                <div className="summary-left">
                  <h2 className="step-title">3. Write a message to the host</h2>
                </div>
              </div>
            )}

            {/* --- Step 4: Review your request --- */}
            {currentStep < 4 ? (
              <div className="collapsed-summary inactive">
                <div className="summary-left">
                  <h2 className="step-title">4. Review your request</h2>
                </div>
              </div>
            ) : currentStep === 4 ? (
              <div className="step-card">
                <div className="step-header">
                  <h2 className="step-title">4. Review your request</h2>
                </div>
                <div className="step-body">
                  <div className="review-content">
                    <p className="review-info">
                      The host has 24 hours to confirm your booking. You’ll be charged after the
                      request is accepted.
                    </p>
                    <p className="terms-text">
                      By selecting the button, I agree to the{' '}
                      <span className="terms-link" onClick={() => alert('Terms link clicked!')}>
                        booking terms
                      </span>
                      .
                    </p>
                    <button className="confirm-button" onClick={handleConfirm}>
                      <span className="gpay-icon">G</span>
                      <span>Pay</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* ========== RIGHT SIDE: BookingSidebar ========== */}

          <BookingSidebar stay={stay} startDate={startDate} endDate={endDate} guests={guests} />
        </div>
      </div>
    </div>
  )
}
