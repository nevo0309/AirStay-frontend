import React from 'react'
import { StepCard } from './StepCard'

export function StepMessage({ currentStep, setCurrentStep, message, setMessage }) {
  const isOpen = currentStep === 3
  const disabled = currentStep < 3 // can’t “Change” or open until Step 2 is done
  const summaryText = message || '(No message)'

  return (
    <StepCard
      stepNumber={3}
      title="Write a message to the host"
      isOpen={isOpen}
      summaryText={summaryText}
      onChange={() => setCurrentStep(3)}
      disabled={disabled}
      bodyContent={
        <div className="message-form">
          <p className="message-instruction">
            Before you can continue, let the host know a little about your trip and why their place
            is a good fit.
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
      }
      footerContent={
        <button
          className="done-button-message"
          onClick={() => setCurrentStep(4)}
          disabled={!message.trim()}
        >
          Next
        </button>
      }
    />
  )
}
