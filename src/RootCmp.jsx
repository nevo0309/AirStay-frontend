import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import { userService } from './services/user'
import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { StayIndex } from './pages/StayIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StayDetails } from './pages/StayDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { ReservePage } from './pages/ReservePage.jsx'
import { TripsPage } from './pages/TripsPage.jsx'
import { ReservationAppHeader } from './cmps/ReservationAppHeader.jsx'
import { use } from 'react'

export function RootCmp() {
  const location = useLocation()
  const [isBookingPage, setIsBookingPage] = useState(true)

  useEffect(() => {
    if (location.pathname.startsWith('/book/stay')) setIsBookingPage(true)
    else setIsBookingPage(false)
  }, [location.pathname])

  return (
    <div className="main-container">
      {isBookingPage ? <ReservationAppHeader /> : <AppHeader />}
      <UserMsg />

      <main>
        <Routes>
          {/* <Route path="" element={<HomePage />} /> */}
          {/* <Route path="about" element={<AboutUs />}> */}
          {/* <Route path="team" element={<AboutTeam />} /> */}
          {/* <Route path="vision" element={<AboutVision />} /> */}
          {/* </Route> */}
          <Route path="/" element={<StayIndex />} />
          <Route path="stay/:stayId" element={<StayDetails />} />
          <Route path="book/stay/:stayId" element={<ReservePage />} />
          <Route path="/trips" element={<TripsPage />} />
          {/* <Route path="user/:id" element={<UserDetails />} /> */}
          {/* <Route path="review" element={<ReviewIndex />} /> */}
          {/* <Route path="chat" element={<ChatApp />} /> */}
          {/* <Route
            path="admin"
            element={
              <AuthGuard checkAdmin={true}>
                <AdminIndex />
              </AuthGuard>
            }
          />
          <Route path="login" element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route> */}
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

function AuthGuard({ children, checkAdmin = false }) {
  const user = userService.getLoggedinUser()
  const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
  if (isNotAllowed) {
    console.log('Not Authenticated!')
    return <Navigate to="/" />
  }
  return children
}
