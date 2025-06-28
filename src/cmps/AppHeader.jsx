import { Link, NavLink, useLocation } from "react-router-dom"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/user.actions"
import { StayFilter } from "../cmps/StayFilter.jsx"
import { StayFilterClosed } from "./StayFilterClosed.jsx"
import { logoSvg } from "../../data/svgExport.jsx"
import { humburgerSvg } from "../../data/svgExport.jsx"
import { heartSvg } from "../../data/svgExport.jsx"
import { wishlistSvg } from "../../data/svgExport.jsx"
import { trips2 } from "../../data/svgExport.jsx"
import { usePathMatch } from "../customHooks/usePathMatch.js"
import { LoginSignup } from "../cmps/LoginSignup.jsx"
import { Modal } from "./Modal.jsx"

export function AppHeader({ isStayFilterOpen, setIsStayFilterOpen }) {
  const user = useSelector(storeState => storeState.userModule.user)
  const [isHosting, setIsHosting] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const isFilterSuppressedPage = usePathMatch(
    ["/hosting/order", "/trips", "/book"],
    "startsWith"
  )
  const isStaticPage = usePathMatch([
    "/stay",
    "/hosting",
    "/trips",
    "startsWith"
  ])
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const humburgerRef = useRef(null)

  useEffect(() => {
    setIsHosting(location.pathname.startsWith("/hosting/order"))
  }, [location.pathname])

  useEffect(() => {
    if (
      location.pathname.startsWith("/stay") ||
      location.pathname.startsWith("/search")
    )
      setIsStayFilterOpen(false)
    else setIsStayFilterOpen(true)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (location.pathname.startsWith("/stay")) return
      if (scrollY > 1) {
        setIsStayFilterOpen(false)
      } else if (!location.pathname.startsWith("/search")) {
        setIsStayFilterOpen(true)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isStayFilterOpen, location.pathname])

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        humburgerRef.current &&
        !humburgerRef.current.contains(event.target)
      ) {
        setIsSideBarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setIsSideBarOpen(false)
  }, [location.pathname])

  async function onLogout() {
    try {
      await logout()
      navigate("/")
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }
  const handleToggle = () => {
    navigate(isHosting ? "/" : "/hosting/order")
  }
  const onLogInClick = () => {
    setIsSideBarOpen(!isSideBarOpen)
    setIsAuthOpen(true)
  }

  return (
    <>
      <header
        className={
          "app-header main-container full " +
          (!isStayFilterOpen || isFilterSuppressedPage ? "closed " : "") +
          (isStaticPage ? " static" : "")
        }>
        <nav>
          <div className='logo'>
            <NavLink
              to='/'
              className='/logo'>
              {logoSvg}
              <span>airstay</span>
            </NavLink>
          </div>

          {!isFilterSuppressedPage ? (
            isStayFilterOpen ? (
              <StayFilter />
            ) : (
              <StayFilterClosed setIsStayFilterOpen={setIsStayFilterOpen} />
            )
          ) : null}

          {/* {!user && (
          <NavLink to="login" className="login-link">
          Login
          </NavLink>
          )} */}

          <section className='btns flex'>
            <button
              className='host-guest-btn'
              onClick={e => {
                e.stopPropagation() // Prevent affecting parent click logic
                handleToggle()
              }}>
              {isHosting ? "Switch to traveling" : "Switch to Hosting"}
            </button>
            {/* USER AVATAR */}
            <button className='user-avatar'>
              <img
                src={
                  user?.imgUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                }
                alt={user.fullname}
              />
            </button>
            <section
              className='humburger'
              ref={humburgerRef}>
              <button
                className='menue-btn'
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                {humburgerSvg}
              </button>
              {isSideBarOpen && (
                <section className='humurger-menu flex column'>
                  <p className='flex'>
                    {wishlistSvg} <span>Wishlist</span>
                  </p>
                  <p
                    className='flex'
                    onClick={() => navigate("/trips")}>
                    {trips2} <span>Trips</span>
                  </p>
                  {user ? (
                    <p onClick={onLogout}>Logout</p>
                  ) : (
                    <p onClick={onLogInClick}>Login / Sign up</p>
                  )}
                </section>
              )}
            </section>
          </section>
        </nav>
      </header>
      {isAuthOpen && (
        <Modal onClose={() => setIsAuthOpen(false)}>
          {/* close after success inside LoginSignup */}
          <LoginSignup onClose={() => setIsAuthOpen(false)} />
        </Modal>
      )}
    </>
  )
}
