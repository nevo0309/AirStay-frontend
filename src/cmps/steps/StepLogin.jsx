// src/cmps/steps/StepChoosePayment.jsx
import React, { useState } from 'react'
import { StepCard } from './StepCard'
import { formatDate } from '../../services/util.service'
import { Modal } from '../Modal'
import { LoginSignup } from '../LoginSignup'
import { handleButtonMouseMove } from '../../services/util.service.js'

export function StepLogin({
    currentStep,
    setCurrentStep,
}) {
    const isOpen = currentStep === 1
    const [isAuthOpen, setIsAuthOpen] = useState(false)

    return (
        <StepCard
            stepNumber={0}
            title="Login or Signup"
            isOpen={isOpen}
            summaryText=""
            onChange={() => setCurrentStep(0)}
            disabled={false}
            bodyContent={
                <div className="login flex">
                    <button onClick={() => setIsAuthOpen(true)} onMouseMove={handleButtonMouseMove}>Continue</button>
                    {isAuthOpen && (
                        <Modal onClose={() => setIsAuthOpen(false)}>
                            {/* close after success inside LoginSignup */}
                            <LoginSignup onClose={() => setIsAuthOpen(false)} />
                        </Modal>
                    )}
                </div>

            }
            cmp={'login'}
        />
    )
}
