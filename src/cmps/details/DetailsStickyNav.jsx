import { useEffect, useState } from "react"
import { handleButtonMouseMove } from "../../services/util.service"

export function DetailsStickyNav({
  triggerRef,
  reservationRef,
  stay,
  onReserve
}) {
  const [visible, setVisible] = useState(false)
  const [showMiniCard, setShowMiniCard] = useState(false)

  useEffect(() => {
    if (!triggerRef?.current || !reservationRef?.current) return

    const triggerObserver = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )

    const reservationObserver = new IntersectionObserver(
      ([entry]) => setShowMiniCard(!entry.isIntersecting),
      { threshold: 0 }
    )

    triggerObserver.observe(triggerRef.current)
    reservationObserver.observe(reservationRef.current)

    return () => {
      triggerObserver.disconnect()
      reservationObserver.disconnect()
    }
  }, [triggerRef, reservationRef])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  if (!visible) return null

  return (
    <nav className='details-sticky-nav main-container'>
      <div className='sticky-nav-content'>
        <div className='nav-buttons'>
          <button
            className='nav-btn'
            onClick={() => scrollTo("photos")}>
            Photos
          </button>
          <button
            className='nav-btn'
            onClick={() => scrollTo("amenities")}>
            Amenities
          </button>
          <button
            className='nav-btn'
            onClick={() => scrollTo("reviews")}>
            Reviews
          </button>
          <button
            className='nav-btn'
            onClick={() => scrollTo("map")}>
            Location
          </button>
        </div>

        {showMiniCard && (
          <div className='mini-reservation-card'>
            <div>
              <span>₪{stay.price}</span> / night
            </div>
            <button
              className='res-btn'
              onMouseMove={handleButtonMouseMove}
              onClick={onReserve}>
              Reserve
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
