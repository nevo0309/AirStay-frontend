import { Link, NavLink, useLocation } from "react-router-dom"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

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

export function AppHeader({ isStayFilterOpen, setIsStayFilterOpen }) {
  const user = useSelector((storeState) => storeState.userModule.user)
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

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setIsHosting(location.pathname.startsWith("/hosting/order"))
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname.startsWith("/stay")) setIsStayFilterOpen(false)
    else setIsStayFilterOpen(true)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (location.pathname.startsWith("/stay")) return
      if (scrollY > 1) {
        setIsStayFilterOpen(false)
      } else {
        setIsStayFilterOpen(true)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isStayFilterOpen, location.pathname])

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

  return (
    <header
      className={
        "app-header main-container full " +
        (!isStayFilterOpen || isFilterSuppressedPage ? "closed " : "") +
        (isStaticPage ? " static" : "")
      }
    >
      <nav>
        <div className='logo'>
          <NavLink to='/' className='/logo'>
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
            onClick={(e) => {
              e.stopPropagation() // Prevent affecting parent click logic
              handleToggle()
            }}
          >
            {isHosting ? "Switch to traveling" : "Switch to Hosting"}
          </button>
          <section className='humburger'>
            <button
              className='menue-btn'
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            >
              {humburgerSvg}
            </button>
            {isSideBarOpen && (
              <section className='humurger-menu flex column'>
                <p className='flex'>
                  {wishlistSvg} <span>Wishlist</span>
                </p>
                <p className='flex' onClick={() => navigate("/trips")}>
                  {trips2} <span>Trips</span>
                </p>
                <p>Login / Sign up</p>
              </section>
            )}
          </section>
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
