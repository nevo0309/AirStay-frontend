import React from 'react'
import { StepCard } from './StepCard'
import { ChevronDown } from 'lucide-react'

export function StepPaymentMethod({
  currentStep,
  setCurrentStep,
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  setCardDetails,
}) {
  const isOpen = currentStep === 2
  // If user hasn’t completed Step 1 yet, disable Step 2’s collapsed summary
  const disabled = currentStep < 2
  const summaryText =
    paymentMethod === 'card'
      ? `Card ending in ${cardDetails.number.slice(-4) || 'XXXX'}`
      : 'Google Pay'

  return (
    <StepCard
      stepNumber={2}
      title="Add a payment method"
      isOpen={isOpen}
      summaryText={summaryText}
      onChange={() => setCurrentStep(2)}
      disabled={disabled}
      bodyContent={
        <div className="payment-method-form">
          <div className="method-selector">
            {/* Credit/Debit Card Option */}
            <label
              className={`payment-method-option ${paymentMethod === 'card' ? 'selected' : ''}`}
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
                      onChange={e =>
                        setCardDetails(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
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
                        onChange={e =>
                          setCardDetails(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
                        className="form-input"
                      />
                    </div>
                    <div className="form-group half">
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={e =>
                          setCardDetails(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                          }))
                        }
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
                    onChange={e =>
                      setCardDetails(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group country">
                  <div className="select-wrapper">
                    <select
                      name="country"
                      value={cardDetails.country}
                      onChange={e =>
                        setCardDetails(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
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

            {/* Google Pay Option */}
            <label
              className={`payment-method-option ${paymentMethod === 'gpay' ? 'selected' : ''}`}
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
      }
      footerContent={
        <button className="done-button" onClick={() => setCurrentStep(3)}>
          Next
        </button>
      }
    />
  )
}
