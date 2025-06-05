import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user.actions'
import { StayFilter } from '../cmps/StayFilter.jsx'
import { useState } from 'react'
import { logoSvg } from '../../data/svgExport.jsx'
import { humburgerSvg } from '../../data/svgExport.jsx'


export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      navigate('/')
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  return (
    <header className="app-header main-container full">
      <nav>
        <div className='logo'>
          <NavLink to="/stay" className="/logo">
            {logoSvg}
            <span>airstay</span>
          </NavLink>
        </div>

        <StayFilter />

        {/* {!user && (
          <NavLink to="login" className="login-link">
          Login
          </NavLink>
          )} */}
        <section className='btns flex'>
          <button className='host-guest-btn'>Become a host</button>
          <button className='menue-btn'>
           {humburgerSvg}
          </button>
        </section>

   

        {/* {user && (
          <div className="user-info">
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <span className="score">{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>logout</button>
          </div>
        )} */}
      </nav>
    </header>
  )
}
