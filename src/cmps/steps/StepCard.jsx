import React from 'react'

export function StepCard({
  stepNumber,
  title,
  isOpen,
  summaryText,
  onChange,
  disabled = false,
  bodyContent,
  footerContent,
}) {
  // If not open, render a “collapsed summary” row
  if (!isOpen) {
    return (
      <div className={`collapsed-summary${disabled ? ' inactive' : ''}`}>
        <div className="summary-left">
          <h2 className="step-title">
            {stepNumber}. {title}
          </h2>
          {summaryText && <span className="summary-text">{summaryText}</span>}
        </div>
        {!disabled && (
          <button className="change-button" onClick={onChange}>
            Change
          </button>
        )}
      </div>
    )
  }

  // Otherwise, render the expanded “step-card”
  return (
    <div className="step-card">
      <div className="step-header">
        <h2 className="step-title">
          {stepNumber}. {title}
        </h2>
      </div>
      <div className="step-body">{bodyContent}</div>
      <div className="step-footer">{footerContent}</div>
    </div>
  )
}
