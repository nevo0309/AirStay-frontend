import { useState } from 'react'
import { userService } from '../services/user/user.service.remote.js'
import { ImgUploader } from './ImgUploader.jsx'
import { handleButtonMouseMove } from '../services/util.service.js'

export function LoginForm({ onLogin, isSignup }) {
  const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
  console.log('crad', credentials)

  function handleChange({ target }) {
    const { name: field, value } = target
    setCredentials(prevState => {
      return { ...prevState, [field]: value }
    })
  }
  function onUploaded(imgUrl) {
    setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
  }
  function handleSubmit(ev) {
    ev.preventDefault()
    onLogin(credentials)
  }
  function handleDemoLogin(ev) {
    ev.preventDefault()
    onLogin({ username: 'Alice11', password: 'secret' })
  }

  const { fullname, username, password } = credentials

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        className="login-form__input"
        type="text"
        name="username"
        value={username}
        placeholder="Username"
        onChange={handleChange}
        required
        autoFocus
      />
      <input
        className="login-form__input"
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={handleChange}
        required
      />
      {isSignup && (
        <>
          <input
            className="login-form__input"
            type="text"
            name="fullname"
            value={fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
        </>
      )}
      <button className="login-form__btn" onMouseMove={handleButtonMouseMove}>
        {isSignup ? 'Signup' : 'Login'}
      </button>
      <button
        type="button"
        className="login-form__btn"
        onClick={handleDemoLogin}
        onMouseMove={handleButtonMouseMove}
      >
        Demo Login
      </button>
    </form>
  )
}
