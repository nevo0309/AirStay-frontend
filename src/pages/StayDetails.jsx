import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadStay } from "../store/stay.actions"

import { DetailsImageGallery } from "../cmps/details/DetailsImageGallery"
import { DetailsAmenities } from "../cmps/details/DetailsAmenities"
import { DetailsHeader } from "../cmps/details/DetailsHeader"
import { DetailsOverview } from "../cmps/details/DetailsOverview"
import { DetailsHighlights } from "../cmps/details/DetailsHighlights"

import { handleButtonMouseMove } from "../services/util.service"

export function StayDetails() {
  const [startDate, setStartDate] = useState("2025-07-04")
  const [endDate, setEndDate] = useState("2025-07-06")
  const [guests, setGuests] = useState({ adults: 1, kids: 0 })
  const { stayId } = useParams()

  const stay = useSelector((storeState) => storeState.stayModule.stay)
  const navigate = useNavigate()

  const onReserve = () =>
    navigate(`/book/stay/${stayId}`, {
      state: { stay, startDate, endDate, guests }
    })
  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    <section className='stay-details'>
      <div className='details-content'>
        <DetailsHeader name={stay.name} />
        <DetailsImageGallery images={stay.imgUrls} />
        <DetailsOverview stay={stay} />
        <DetailsHighlights />
        <DetailsAmenities amenities={stay.amenities} />
      </div>
      <div className='booking-sidebar'>
        <button
          className='reserve-btn-details'
          onClick={onReserve}
          onMouseMove={handleButtonMouseMove}
        >
          Reserve
        </button>
      </div>
    </section>
  )
}
