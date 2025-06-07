import React from 'react'
import { StepCard } from './StepCard'

export function StepChoosePayment({
  currentStep,
  setCurrentStep,
  paymentOption,
  setPaymentOption,
}) {
  const isOpen = currentStep === 1
  const summaryText = paymentOption === 'full' ? 'Pay ₪507.82 now' : 'Pay part now, part later'
  const disabled = false

  return (
    <StepCard
      stepNumber={1}
      title="Choose when to pay"
      isOpen={isOpen}
      summaryText={summaryText}
      onChange={() => setCurrentStep(1)}
      disabled={disabled}
      bodyContent={
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
      }
      footerContent={
        <button className="done-button" onClick={() => setCurrentStep(2)}>
          Next
        </button>
      }
    />
  )
}
