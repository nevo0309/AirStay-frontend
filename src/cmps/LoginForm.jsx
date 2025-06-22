import { useState } from 'react'
import { userService } from '../services/user/user.service.remote.js'
import { ImgUploader } from './ImgUploader.jsx'

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

  const { fullname, username, password } = credentials

  return (
    <form className="sign-login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="Username"
        onChange={handleChange}
        required
        autoFocus
      />
      <input
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
            type="text"
            name="fullname"
            value={fullname}
            placeholder="Full name"
            onChange={handleChange}
            required
          />
          <ImgUploader onUploaded={onUploaded} />
        </>
      )}
      <button className="btn">{isSignup ? 'Signup' : 'Login'}</button>
    </form>
  )
}
