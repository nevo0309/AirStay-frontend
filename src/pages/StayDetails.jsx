import { useState, useEffect, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStay } from '../store/stay.actions'
import { DetailsImageGallery } from '../cmps/details/DetailsImageGallery'
import { DetailsAmenities } from '../cmps/details/DetailsAmenities'
import { DetailsHeader } from '../cmps/details/DetailsHeader'
import { DetailsOverview } from '../cmps/details/DetailsOverview'
import { DetailsHighlights } from '../cmps/details/DetailsHighlights'
import { handleButtonMouseMove, getRandomImageNumber } from '../services/util.service'
import { DetailsSummary } from '../cmps/details/DetailsSummary'
import { DetailsReviews } from '../cmps/details/DetailsReview'
import { DetailsMap } from '../cmps/details/DetailsMap'
import { DetailsReservation } from '../cmps/details/DetailsReservation'
import { DetailsMoreInfo } from '../cmps/details/DetailsMoreInfo'
import { DetailsReviewSummary } from '../cmps/details/DetailsReviewSummary'
import { FilterCalender } from '../cmps/calender/FilterCaleder'
import { addDays } from "date-fns"
import { setFilterBy } from '../store/stay.actions'


export function StayDetails() {
  const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
  const [filterToEdit, setFilterToEdit] = useState(filterBy)

  const [startDate, setStartDate] = useState('2025-07-04')
  const [endDate, setEndDate] = useState('2025-07-06')
  const [guests, setGuests] = useState({ adults: 1, kids: 0 })
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)
  const navigate = useNavigate()

  const [range, setRange] = useState([
    {
      startDate: filterBy.checkIn || new Date(),
      endDate: filterBy.checkOut || addDays(new Date(), 2),
      key: 'selection'
    }
  ])

  useEffect(() => {
    // console.log(range)
    setFilterToEdit(prevFilterBy => ({
      ...prevFilterBy,
      checkIn: range[0].startDate, checkOut: range[0].endDate
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

      setRange([{
        ...range[0],
        startDate,
        endDate: startDate === endDate ? null : endDate,
      }])
    } else {
      // If user clicks a new date AFTER current start date, update endDate
      if (startDate > currentStart) {
        setRange([{
          ...range[0],
          startDate,
          endDate: null,
        }])
      } else {
        // If clicked date is before or same as current start, treat it as a new start
        setRange([{
          startDate,
          endDate: null,
          key: 'selection',
        }])
      }
    }
  }

  const onReserve = () =>
    navigate(`/book/stay/${stayId}`, {
      state: { stay, startDate, endDate, guests },
    })

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])


  function sumNights(startDate, endDate) {
    if (!startDate || !endDate) return 0

    const oneDayMs = 1000 * 60 * 60 * 24
    const diffMs = endDate - startDate

    return Math.max(0, Math.round(diffMs / oneDayMs))
  }



  function formatRangeDatesCalender(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    const dateToShow = date.toLocaleDateString('en-US', options)

    return dateToShow
  }


  if (!stay) return <div>Loading...</div>

  return (
    <div className="stay-details">
      <DetailsHeader name={stay.name} />
      <DetailsImageGallery images={stay.imgUrls} />
      <div className="stay-details-grid">
        <div className="details-left">
          <DetailsOverview stay={stay} />
          <div className="housted-by">
            <img src={stay.host.thumbnailUrl} alt={`${stay.host.fullname}`} />
            <div className="host-details">
              <div>Housted by {stay.host.fullname}</div>
              <div>Super Host · 5 years hosting </div>
            </div>
          </div>
          <DetailsHighlights />
          <DetailsSummary summary={stay.summary} />
          <DetailsAmenities amenities={stay.amenities} />
          <div className='details-calender'>
            <div className="calender-stay-details">
              <h2>{`${sumNights(filterBy.checkIn, filterBy.checkOut)} nights`}</h2>
              {(filterBy.checkIn && filterBy.checkOut) && <p>{`${formatRangeDatesCalender(filterBy.checkIn)} - ${formatRangeDatesCalender(filterBy.checkOut)}`}</p>}
            </div>
            <FilterCalender range={range}
              setRange={handleSelect}
              cmp={'details'}
            /></div>
        </div>

        <DetailsReservation
          onReserve={onReserve}
          sumNights={sumNights}
          formatRangeDatesCalender={formatRangeDatesCalender}
          range={range}
          handleSelect={handleSelect}
          setFilterToEdit={setFilterToEdit} />
      </div>
      <DetailsReviewSummary stay={stay} />
      <DetailsReviews reviews={stay.reviews} stayId={stay._id} />
      <DetailsMap stay={stay} />
      <DetailsMoreInfo stay={stay} />
    </div>
  )
}
