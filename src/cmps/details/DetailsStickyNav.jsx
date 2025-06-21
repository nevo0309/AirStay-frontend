import { useEffect, useState } from "react"

export function DetailsStickyNav({ triggerRef }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!triggerRef?.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(triggerRef.current)
    return () => observer.disconnect()
  }, [triggerRef])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  if (!visible) return null

  return (
    <nav className='details-sticky-nav'>
      <button onClick={() => scrollTo("photos")}>Photos</button>
      <button onClick={() => scrollTo("amenities")}>Amenities</button>
      <button onClick={() => scrollTo("reviews")}>Reviews</button>
      <button onClick={() => scrollTo("map")}>Map</button>
    </nav>
  )
}
