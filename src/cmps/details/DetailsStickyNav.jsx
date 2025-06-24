import { useEffect, useState } from "react"

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
    <nav className='details-sticky-nav'>
      <div className='sticky-nav-content'>
        <div className='nav-buttons'>
          <button onClick={() => scrollTo("photos")}>Photos</button>
          <button onClick={() => scrollTo("amenities")}>Amenities</button>
          <button onClick={() => scrollTo("reviews")}>Reviews</button>
          <button onClick={() => scrollTo("map")}>Map</button>
        </div>

        {showMiniCard && (
          <div className='mini-reservation-card'>
            <div>
              <span>₪{stay.price}</span> / night
            </div>
            <button onClick={onReserve}>Reserve</button>
          </div>
        )}
      </div>
    </nav>
  )
}
