import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/user.actions.js'
import { LoginForm } from './LoginForm.jsx'
import { useNavigate } from 'react-router-dom'

export function LoginSignup() {
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
    } catch (err) {
      showErrorMsg('Oops try again', err)
    }
  }

  async function _signup(credentials) {
    try {
      await signup(credentials)
      showSuccessMsg('Signup successfully')
      navigate('/')
    } catch (err) {
      showErrorMsg('Oops try again', err)
    }
  }

  return (
    <section className="login">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="login-signup-btns">
        <a href="#" onClick={() => setIsSignUp(prev => !prev)}>
          {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
        </a>
      </div>
    </section>
  )
}
