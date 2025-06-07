// src/cmps/steps/StepChoosePayment.jsx
import React from 'react'
import { StepCard } from './StepCard'
import { formatDate } from '../../services/util.service'

export function StepChoosePayment({
  currentStep,
  setCurrentStep,
  paymentOption,
  setPaymentOption,
  totalPrice,
  endDayToPay,
}) {
  const isOpen = currentStep === 1
  const partPrice = totalPrice / 4
  const leftToPay = totalPrice - partPrice

  const payDateStr = formatDate(endDayToPay)

  console.log('paydate', payDateStr)

  const summaryText =
    paymentOption === 'full'
      ? `Pay ₪${totalPrice.toFixed(2)} now`
      : `Pay part now, part on ${payDateStr}`

  return (
    <StepCard
      stepNumber={1}
      title="Choose when to pay"
      isOpen={isOpen}
      summaryText={summaryText}
      onChange={() => setCurrentStep(1)}
      disabled={false}
      bodyContent={
        <div className="payment-options">
          <label className="payment-option">
            <div className="option-content">
              <div className="option-text">{summaryText}</div>
            </div>
            <input
              type="radio"
              name="payment"
              value="full"
              checked={paymentOption === 'full'}
              onChange={e => setPaymentOption(e.target.value)}
            />
          </label>

          <label className="payment-option">
            <div className="option-content">
              <div className="option-text">Pay part now,part later</div>
              <div className="option-subtext">
                ₪{partPrice.toFixed(2)} now, ₪{leftToPay.toFixed(2)} charged on {payDateStr}. No
                extra fees.
              </div>
            </div>
            <input
              type="radio"
              name="payment"
              value="split"
              checked={paymentOption === 'split'}
              onChange={e => setPaymentOption(e.target.value)}
            />
          </label>
        </div>
      }
      footerContent={
        <button className="done-button" onClick={() => setCurrentStep(2)}>
          Next
        </button>
      }
    />
  )
}
