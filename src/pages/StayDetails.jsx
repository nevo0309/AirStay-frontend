import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { loadStay } from "../store/stay.actions"
import { DetailsImageGallery } from "../cmps/DetailsImageGallery"

export function StayDetails() {
  const { stayId } = useParams()

  const stay = useSelector((storeState) => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <section className='stay-details'>
      {/* <Link to='/'>Back to list</Link> */}
      <div className='details-content'>
        <header className='stay-details-header'>
          <h1 className='stay-details-title'>{stay.name}</h1>
        </header>
        <DetailsImageGallery images={stay.imgUrls} />
        {/* <div className='details-amenitiess'>
          <h3>What this place offers</h3>
          <ul>
            {stay.amenities?.map((amenity, idx) => (
              <li key={idx}>
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </section>
  )
}
