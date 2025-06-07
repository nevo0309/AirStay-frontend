import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { loadStay } from "../store/stay.actions"
import { DetailsImageGallery } from "../cmps/DetailsImageGallery"
import { DetailsAmenities } from "../cmps/StayDetails/DetailsAmenities"
import { doorSvg } from "../../data/svgExport"

export function StayDetails() {
  const { stayId } = useParams()

  const stay = useSelector((storeState) => storeState.stayModule.stay)

  const highlights = [
    {
      title: "Self check-in",
      description: "Check yourself in with the lockbox.",
      icon: "lock"
    },
    {
      title: "Dedicated workspace",
      description: "A common area with wifi that's well-suited for working.",
      icon: "laptop"
    },
    {
      title: "Great location",
      description:
        "Guests who stayed here in the past year loved the location.",
      icon: "map-marker"
    }
  ]

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <section className='stay-details'>
      <div className='details-content'>
        <div className='details-header'>
          <h1 className='details-title'>{stay.name}</h1>
          <DetailsImageGallery images={stay.imgUrls} />
        </div>
        {/* <DetailsImageGallery images={stay.imgUrls} /> */}
        <section className='details-overview'>
          <div className='overview-header'>
            <h2 className='overview-location'>
              Entire rental unit in Eilat, Israel
            </h2>
            <p className='overview-info'>
              {stay.capacity} guests · {stay.bedrooms} bed · {stay.bathrooms}{" "}
              bath
            </p>
            <p className='stay-rating'>
              <span className='star'>★</span> 4.7 reviews
            </p>
          </div>
        </section>

        <section className='stay-highlights'>
          {highlights.map((highlight, idx) => (
            <div className='highlight-host' key={idx}>
              <div className='highlight-icon'>{doorSvg}</div>
              <div className='highlight-text'>
                <h4 className='highligh-title'>{highlight.title}</h4>
                <p className='highlight-description'>{highlight.description}</p>
              </div>
            </div>
          ))}
        </section>

        <DetailsAmenities amenities={stay.amenities} />
      </div>
    </section>
  )
}
