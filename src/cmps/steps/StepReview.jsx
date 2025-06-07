// src/components/steps/StepReview.jsx
import React from 'react'
import { StepCard } from './StepCard'

export function StepReview({ currentStep, setCurrentStep, onConfirm, paymentMethod }) {
  const isOpen = currentStep === 4
  const disabled = currentStep < 4 // can’t open Step 4 until Step 3 is done

  return (
    <StepCard
      stepNumber={4}
      title="Review your request"
      isOpen={isOpen}
      summaryText=""
      onChange={() => setCurrentStep(4)}
      disabled={disabled}
      bodyContent={
        <div className="review-content">
          <p className="review-info">
            The host has 24 hours to confirm your booking. You’ll be charged after the request is
            accepted.
          </p>
          <p className="terms-text">
            By selecting the button, I agree to the{' '}
            <span className="terms-link" onClick={() => alert('Terms link clicked!')}>
              booking terms
            </span>
            .
          </p>
        </div>
      }
      footerContent={
        paymentMethod === 'card' ? (
          <button className="confirm-order-button" onClick={onConfirm}>
            Reserve now
          </button>
        ) : (
          <button className="confirm-order-button" onClick={onConfirm}>
            <span className="gpay-icon">G</span>
            <span>Pay</span>
          </button>
        )
      }
    />
  )
}
