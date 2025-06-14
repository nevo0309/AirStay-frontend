import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStay } from '../store/stay.actions'

import { DetailsImageGallery } from '../cmps/details/DetailsImageGallery'
import { DetailsAmenities } from '../cmps/details/DetailsAmenities'
import { DetailsHeader } from '../cmps/details/DetailsHeader'
import { DetailsOverview } from '../cmps/details/DetailsOverview'
import { DetailsHighlights } from '../cmps/details/DetailsHighlights'

import { handleButtonMouseMove } from '../services/util.service'
import { DetailsSummary } from '../cmps/details/DetailsSummary'
import { DetailsReviews } from '../cmps/details/DetailsReview'
import { DetailsMap } from '../cmps/details/DetailsMap'

import { DetailsReservation } from "../cmps/details/DetailsReservation"


export function StayDetails() {
  const [startDate, setStartDate] = useState('2025-07-04')
  const [endDate, setEndDate] = useState('2025-07-06')
  const [guests, setGuests] = useState({ adults: 1, kids: 0 })
  const { stayId } = useParams()

  const stay = useSelector(storeState => storeState.stayModule.stay)
  const navigate = useNavigate()

  const onReserve = () =>
    navigate(`/book/stay/${stayId}`, {
      state: { stay, startDate, endDate, guests },
    })
  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  if (!stay) return <div>Loading...</div>

  return (
    // <section className="stay-details-container ">
    <div className="stay-details main-container">
      <DetailsHeader name={stay.name} />
      <DetailsImageGallery images={stay.imgUrls} />

      <div className="stay-details-grid">
        <div className="details-left">
          <DetailsOverview stay={stay} />
          <div className="housted-by">
            <img src="/img/guy_pic.png" alt={`${stay.host.fullname}`} />
            <div className="host-details">
              <div>Housted by {stay.host.fullname}</div>
              <div>Super Host · 5 years hosting </div>
            </div>
          </div>
          <DetailsHighlights />
          <DetailsSummary summary={stay.summary} />
          <DetailsAmenities amenities={stay.amenities} />
        </div>

        <DetailsReservation onReserve={onReserve}/>
      </div>
      <DetailsReviews reviews={stay.reviews} />
      <DetailsMap stay={stay} />
    </div>
    // </section>
  )
}
