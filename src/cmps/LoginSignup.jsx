import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/user.actions.js'
import { LoginForm } from './LoginForm.jsx'
import { useNavigate } from 'react-router-dom'

export function LoginSignup({ onClose }) {
  const [isSignup, setIsSignUp] = useState(false)
  const navigate = useNavigate()

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  async function _login(credentials) {
    try {
      await login(credentials)
      showSuccessMsg('Logged in successfully')
      navigate('/')
      onClose()
    } catch (err) {
      showErrorMsg('Oops try again', err)
    }
  }

  async function _signup(credentials) {
    try {
      await signup(credentials)
      showSuccessMsg('Signup successfully')
      navigate('/')
      onClose()
    } catch (err) {
      showErrorMsg('Oops try again', err)
    }
  }

  return (
    <section className="login-modal-form">
      {isSignup && <div className="login-modal-header">Sign up</div>}
      {!isSignup && <div className="login-modal-header">Log in</div>}

      <div className="login-form-wrapper">
        <h2 className="login-form-title">Welcome to Airstay</h2>

        <LoginForm onLogin={onLogin} isSignup={isSignup} />

        <div className="login-signup-btns">
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              setIsSignUp(prev => !prev)
            }}
          >
            {isSignup ? 'Already a member? Log in' : 'New user? Sign up here'}
          </a>
        </div>
      </div>
    </section>
  )
}
