import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { stayService } from '../services/stay/stay.service.local'
import { orderService } from '../services/stay/order.service.local'
import { ADD_ORDER } from '../store/order.reducer'

import { BookingSidebar } from '../cmps/BookingSidebar'
import { StepChoosePayment } from '../cmps/steps/StepChoosePayment'
import { StepPaymentMethod } from '../cmps/steps/StepPaymentMethod'
import { StepMessage } from '../cmps/steps/StepMessage'
import { StepReview } from '../cmps/steps/StepReview'

export function ReservePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { stayId } = useParams()

  // console.log('🔍 location.state →', location.state)

  const {
    stay: locationStay,
    startDate: locationStart,
    endDate: locationEnd,
    guests: locationGuests,
  } = location.state || {}

  const [stay, setStay] = useState(locationStay || null)
  const [loadingStay, setLoadingStay] = useState(!locationStay)
  const [startDate, setStartDate] = useState(locationStart || '2025-12-04')
  const [endDate, setEndDate] = useState(locationEnd || '2025-12-06')
  const [guests, setGuests] = useState(locationGuests || { adults: 1, kids: 0 })

  const endDateMinus2 = (() => {
    const d = new Date(endDate + 'T00:00:00')
    d.setDate(d.getDate() - 2)
    return d.toISOString().split('T')[0]
  })()

  useEffect(() => {
    async function loadStay() {
      if (locationStay) return setLoadingStay(false)
      try {
        const fetched = await stayService.getById(stayId)
        setStay(fetched)
      } catch (err) {
        console.error('Could not load stay:', err)
      } finally {
        setLoadingStay(false)
      }
    }
    loadStay()
  }, [stayId, locationStay])

  // ── Wizard state
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentOption, setPaymentOption] = useState('full')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiration: '',
    cvv: '',
    zipCode: '',
    country: 'Israel',
  })
  const [message, setMessage] = useState('')

  const handleBackArrow = () => {
    navigate(-1)
  }

  // ── Calculate total price
  function calculateTotalPrice(pricePerNight, sd, ed) {
    const nights = Math.round(
      (new Date(ed + 'T00:00:00') - new Date(sd + 'T00:00:00')) / (1000 * 60 * 60 * 24)
    )
    const base = pricePerNight * (nights > 0 ? nights : 0)
    const cleaningFee = 55
    const serviceFee = 62.82
    return base + cleaningFee + serviceFee
  }

  const totalPrice = calculateTotalPrice(stay.price, startDate, endDate)
  // ── Final confirmation save the order
  const handleConfirm = async () => {
    if (!stay) return

    const orderData = {
      paymentOption,
      paymentMethod,
      message,
      cardDetails,
      OrderedAt: Date.now(),
      stay: {
        _id: stay._id,
        name: stay.name,
        imgUrl: stay.imgUrls[0],
      },
      guest: {
        _id: 'u101',
        fullname: 'User 1',
      },
      host: {
        _id: stay.host._id,
        fullname: stay.host.fullname,
        imgUrl: stay.host.thumbnailUrl || stay.host.pictureUrl,
      },
      totalPrice,
      startDate,
      endDate,
      guests,
      msgs: [],
      status: 'pending',
    }

    try {
      const savedOrder = await orderService.save(orderData)
      dispatch({ type: ADD_ORDER, order: savedOrder })

      // Reset
      setCurrentStep(1)
      setPaymentOption('full')
      setPaymentMethod('card')
      setCardDetails({
        number: '',
        expiration: '',
        cvv: '',
        zipCode: '',
        country: 'Israel',
      })
      setMessage('')

      navigate('/trips')
    } catch (err) {
      console.error('Failed to add order:', err)
      alert('Something went wrong. Please try again.')
    }
  }

  // ── Handle loading & not found ──────────────────────────
  if (loadingStay) return <div>Loading stay details…</div>
  if (!stay) return <div>Stay not found.</div>

  return (
    <div className="reserve-page">
      <div className="sticky-arrow-wrapper">
        <div className="back-arrow" onClick={handleBackArrow}>
          <ArrowLeft />
        </div>
      </div>

      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="reserve-container">
        <div className="reserve-header">
          <div className="header-container">
            <h1 className="page-title">Request to book</h1>
          </div>
        </div>

        {/* ── MAIN GRID: LEFT=WIZARD, RIGHT=SIDEBAR ───────────────────────── */}
        <div className="reserve-grid">
          {/* LEFT: the four Step components → */}
          <div className="reserve-content">
            <StepChoosePayment
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
              totalPrice={totalPrice}
              endDayToPay={endDateMinus2}
            />

            <StepPaymentMethod
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
            />

            <StepMessage
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              message={message}
              setMessage={setMessage}
            />

            <StepReview
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              onConfirm={handleConfirm}
              paymentMethod={paymentMethod}
            />
          </div>

          <BookingSidebar stay={stay} startDate={startDate} endDate={endDate} guests={guests} />
        </div>
      </div>
    </div>
  )
}
