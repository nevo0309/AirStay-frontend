import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStay } from '../store/stay.actions'
import { DetailsImageGallery } from '../cmps/DetailsImageGallery'
import { handleButtonMouseMove } from '../services/util.service'

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
    <section className="stay-details">
      {/* <Link to='/'>Back to list</Link> */}
      <div className="details-content">
        <header className="stay-details-header">
          <h1 className="stay-details-title">{stay.name}</h1>
        </header>
        <DetailsImageGallery images={stay.imgUrls} />
        <div className="details-amenitiess">
          <h3>What this place offers</h3>
          <ul>
            {stay.amenities?.map((amenity, idx) => (
              <li key={idx}>
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="booking-sidebar">
        <button
          className="reserve-btn-details"
          onClick={onReserve}
          onMouseMove={handleButtonMouseMove}
        >
          Reserve
        </button>
      </div>
    </section>
  )
}
