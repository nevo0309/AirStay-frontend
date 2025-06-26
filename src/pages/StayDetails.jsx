import { useState, useEffect, useMemo, useRef } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadStay } from "../store/stay.actions"
import { DetailsImageGallery } from "../cmps/details/DetailsImageGallery"
import { DetailsAmenities } from "../cmps/details/DetailsAmenities"
import { DetailsHeader } from "../cmps/details/DetailsHeader"
import { DetailsOverview } from "../cmps/details/DetailsOverview"
import { DetailsHighlights } from "../cmps/details/DetailsHighlights"
import {
  handleButtonMouseMove,
  getRandomImageNumber
} from "../services/util.service"
import { DetailsStickyNav } from "../cmps/details/DetailsStickyNav"
import { DetailsSummary } from "../cmps/details/DetailsSummary"
import { DetailsReviews } from "../cmps/details/DetailsReview"
import { DetailsMap } from "../cmps/details/DetailsMap"
import { DetailsReservation } from "../cmps/details/DetailsReservation"
import { DetailsMoreInfo } from "../cmps/details/DetailsMoreInfo"
import { DetailsReviewSummary } from "../cmps/details/DetailsReviewSummary"
import { FilterCalender } from "../cmps/calender/FilterCaleder"
import { addDays } from "date-fns"
import { setFilterBy } from "../store/stay.actions"
import { SkeletonStayDetails } from "./StayDetailsSkeleton"
import { sumNights } from "../services/util.service"

export function StayDetails() {
  const galleryRef = useRef(null)
  const reservationRef = useRef(null)
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const [filterToEdit, setFilterToEdit] = useState(filterBy)

  const [startDate, setStartDate] = useState("2025-07-04")
  const [endDate, setEndDate] = useState("2025-07-06")
  const [guests, setGuests] = useState({ adults: 1, kids: 0 })
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const navigate = useNavigate()
  const nightSum = sumNights(filterBy.checkIn, filterBy.checkOut)
  const [range, setRange] = useState([
    {
      startDate: filterBy.checkIn || new Date(),
      endDate: filterBy.checkOut || addDays(new Date(), 2),
      key: "selection"
    }
  ])

  useEffect(() => {
    // console.log(range)
    setFilterToEdit(prevFilterBy => ({
      ...prevFilterBy,
      checkIn: range[0].startDate,
      checkOut: range[0].endDate
    }))
  }, [range])

  useEffect(() => {
    setFilterBy(filterToEdit)
  }, [filterToEdit])

  function handleSelect(ranges) {
    const { startDate, endDate } = ranges.selection
    const currentStart = range[0].startDate
    const currentEnd = range[0].endDate

    if (!currentStart || (currentStart && !currentEnd)) {
      // Initial selection or selecting the end date
      setRange([
        {
          ...range[0],
          startDate,
          endDate: startDate === endDate ? null : endDate
        }
      ])
    } else {
      // If user clicks a new date AFTER current start date, update endDate
      if (startDate > currentStart) {
        setRange([
          {
            ...range[0],
            startDate,
            endDate: null
          }
        ])
      } else {
        // If clicked date is before or same as current start, treat it as a new start
        setRange([
          {
            startDate,
            endDate: null,
            key: "selection"
          }
        ])
      }
    }
  }

  const onReserve = () =>
    navigate(`/book/stay/${stayId}`, {
      state: { stay, startDate, endDate, guests }
    })

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  function formatRangeDatesCalender(date) {
    const options = { month: "short", day: "numeric", year: "numeric" }
    const dateToShow = date.toLocaleDateString("en-US", options)

    return dateToShow
  }

  if (!stay) return <SkeletonStayDetails />

  return (
    <div className='stay-details'>
      <div
        id='photos'
        style={{ height: 0, margin: 0, padding: 0 }}
      />
      <DetailsHeader name={stay.name} />
      <DetailsImageGallery
        ref={galleryRef}
        images={stay.imgUrls}
      />
      <DetailsStickyNav
        triggerRef={galleryRef}
        reservationRef={reservationRef}
        stay={stay}
        onReserve={onReserve}
      />
      <div className='stay-details-grid'>
        <div className='details-left'>
          <DetailsOverview stay={stay} />
          <div className='housted-by'>
            <img
              src={stay.host.thumbnailUrl}
              alt={`${stay.host.fullname}`}
            />
            <div className='host-details'>
              <div>Housted by {stay.host.fullname}</div>
              <div>Super Host · 5 years hosting </div>
            </div>
          </div>
          <DetailsHighlights />

          <DetailsSummary summary={stay.summary} />
          <div
            id='amenities'
            style={{
              height: 0,
              margin: 0,
              padding: "2rem",
              borderTop: "1px solid #ebebeb"
            }}
          />
          <DetailsAmenities amenities={stay.amenities} />

          <div className='details-calender'>
            <div className='calender-stay-details'>
              <h2> {nightSum + (nightSum === 1 ? " night" : " nights")}</h2>
              {filterBy.checkIn && filterBy.checkOut && (
                <p>{`${formatRangeDatesCalender(
                  filterBy.checkIn
                )} - ${formatRangeDatesCalender(filterBy.checkOut)}`}</p>
              )}
            </div>
            <FilterCalender
              range={range}
              setRange={handleSelect}
              cmp={"details"}
            />
          </div>
        </div>
        <DetailsReservation
          ref={reservationRef}
          onReserve={onReserve}
          sumNights={sumNights}
          formatRangeDatesCalender={formatRangeDatesCalender}
          range={range}
          handleSelect={handleSelect}
          setFilterToEdit={setFilterToEdit}
          nightSum={nightSum}
        />
      </div>
      <div
        id='reviews'
        style={{ height: 0, margin: "2.5rem", padding: 0 }}
      />

      <DetailsReviewSummary stay={stay} />

      <DetailsReviews
        reviews={stay.reviews}
        stayId={stay._id}
      />
      <div
        id='map'
        style={{ height: 0, margin: "5rem", padding: 0 }}
      />

      <DetailsMap stay={stay} />

      <DetailsMoreInfo stay={stay} />
    </div>
  )
}
