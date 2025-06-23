import { useEffect, useState } from "react"
import { MiniReservationCard } from "./MiniReservationCard"

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

  if (!visible) return null

  return (
    <nav className='details-sticky-nav'>
      <div className='sticky-nav-content'>
        <div className='nav-buttons'>
          <button
            onClick={() =>
              document
                .getElementById("photos")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Photos{" "}
          </button>
          <button
            onClick={() =>
              document
                .getElementById("amenities")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Amenities
          </button>
          <button
            onClick={() =>
              document
                .getElementById("reviews")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Reviews
          </button>
          <button
            onClick={() =>
              document
                .getElementById("map")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Map
          </button>
        </div>

        {showMiniCard && (
          <MiniReservationCard price={stay.price} onReserve={onReserve} />
        )}
      </div>
    </nav>
  )
}
