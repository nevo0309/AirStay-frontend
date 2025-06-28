import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { stayService } from '../services/stay/stay.service.remote.js'
import { orderService } from '../services/stay/order.service.remote.js'
import { ADD_ORDER } from '../store/order.reducer'

import { BookingSidebar } from '../cmps/BookingSidebar'
import { StepChoosePayment } from '../cmps/steps/StepChoosePayment'
import { StepPaymentMethod } from '../cmps/steps/StepPaymentMethod'
import { StepMessage } from '../cmps/steps/StepMessage'
import { StepReview } from '../cmps/steps/StepReview'
import { StepLogin } from '../cmps/steps/StepLogin.jsx'
import { formatDateFromStore, getOrderCreationDate } from '../services/util.service'
import { useSelector } from 'react-redux'
import { showErrorMsg } from '../services/event-bus.service.js'

export function ReservePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { stayId } = useParams()
  const user = useSelector(store => store.userModule.user)
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const stayToOrder = useSelector(storeState => storeState.stayModule.stay)

  const [stay, setStay] = useState(stayToOrder || null)
  const [loadingStay, setLoadingStay] = useState(!stayToOrder)
  const checkIn = formatDateFromStore(filterBy.checkIn) || '2025-12-04'
  const checkOut = formatDateFromStore(filterBy.checkOut) || '2025-12-06'
  const storeGuest = filterBy.guest || { adults: 1, kids: 0 }

  const [startDate, setStartDate] = useState(checkIn)
  const [endDate, setEndDate] = useState(checkOut)
  const [guests, setGuests] = useState(storeGuest)

  const endDateMinus2 = (() => {
    const d = new Date(endDate + 'T00:00:00')
    d.setDate(d.getDate() - 2)
    return d.toISOString().split('T')[0]
  })()

  useEffect(() => {
    async function loadStay() {
      if (stayToOrder) return setLoadingStay(false)
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
  }, [stayId, stayToOrder])

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

  const handleConfirm = async () => {
    if (!stay || !user) {
      showErrorMsg('Cannot order please login')
      return
    }

    const orderData = {
      paymentOption,
      paymentMethod,
      message,
      orderedAt: getOrderCreationDate(),
      startDate,
      endDate,

      guests,
      totalPrice,
      status: 'pending',

      stay: {
        _id: stay._id,
        name: stay.name,
        imgUrl: stay.imgUrls[0],
      },

      guest: {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
      },
      host: {
        _id: stay.host._id,
        fullname: stay.host.fullname,
        imgUrl: stay.host.thumbnailUrl || stay.host.pictureUrl,
      },

      msgs: [],
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
    <div className="reserve-page ">
      <div className="sticky-arrow-wrapper">
        <div className="back-arrow" onClick={handleBackArrow}>
          <ArrowLeft />
        </div>
      </div>

      {/* ── HEADER ────────────────────────────────────────────── */}
      <div className="reserve-container">
        <div className="reserve-header">
          <div className="header-container">
            <h1 className="page-title">Confirm and pay</h1>
          </div>
        </div>

        {/* ── MAIN GRID: LEFT=WIZARD, RIGHT=SIDEBAR ───────────────────────── */}
        <div className="reserve-grid">
          {/* LEFT: the four Step components → */}
          <div className="reserve-content">
            {!user && <StepLogin
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            />}
            <StepChoosePayment
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
              totalPrice={totalPrice}
              endDayToPay={endDateMinus2}
              user={user}
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
