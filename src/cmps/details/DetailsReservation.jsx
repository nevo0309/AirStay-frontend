import { useEffect, useState } from "react"
import { handleButtonMouseMove } from "./../../services/util.service"
import { useSelector } from "react-redux"
import { FilterCalender } from '../calender/FilterCaleder.jsx'
import { AddGuests } from "../AddGuests.jsx"

export function DetailsReservation({ onReserve, sumNights, formatRangeDatesCalender,range,handleSelect, setFilterToEdit }) {
    const stay = useSelector((storeState) => storeState.stayModule.stay)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [totalPrice, setTotalPrice] = useState(null)
    const [isCalenderOpen, setIsCalenderOpen] = useState(false)
    const [activeCalenderDate, setActiveCalenderDate] = useState('checkIn')
    const [guest, setGuest] = useState(filterBy.guest)
    const [isAddGuestOpen, setIsAddGuestOpen] = useState(false)
    const nightSum = sumNights(filterBy.checkIn, filterBy.checkOut)
    const cleaningFee = totalPrice * 0.1


    useEffect(() => {
        console.log(guest)
        if (Object.keys(filterBy.guest).length === 0) {
            setFilterToEdit(prevFilterBy => ({
                ...prevFilterBy,
                guest: { adults: 1, children: 0, infants: 0, pet: 0 }
            }))
        }
        else {
            setFilterToEdit(prevFilterBy => ({
                ...prevFilterBy,
                guest: guest
            }))
        }
    }, [guest])


    useEffect(() => {
        setTotalPrice(sumNights(filterBy.checkIn, filterBy.checkOut) * stay.price)
    }, [filterBy])
    console.log(filterBy)


    function onOpenCalender() {
        setIsCalenderOpen(true)
    }

    function formatRangeDates(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }


    function guestSummary(guest) {
        const labelMap = {
            guests: ['guest', 'guests'],
            infants: ['infant', 'infants'],
            pet: ['pet', 'pets']
        }

        const totalGuests = (guest.adults) + (guest.children)
        const totalGuestsSummary = []

        if (totalGuests > 0) {
            const [singular, plural] = labelMap.guests;
            const label = totalGuests === 1 ? singular : plural
            totalGuestsSummary.push(`${totalGuests} ${label}`)
        }

        ['infants', 'pet'].forEach((key) => {
            const count = guest[key] || 0
            if (count > 0) {
                const [singular, plural] = labelMap[key];
                const label = count === 1 ? singular : plural;
                totalGuestsSummary.push(`${count} ${label}`);
            }
        })

        return totalGuestsSummary.join(', ')
    }


    function onClickBackDrop() {
        console.log('ca')
        if (isCalenderOpen) setIsCalenderOpen(false)
        else if (isAddGuestOpen) setIsAddGuestOpen(false)
    }

    return (
        <div className='details-reservation flex column'>
            <h1>{`₪${stay.price}`} <span>night </span></h1>
            <div className="reservation-options">
                <div className="flex column" onClick={onOpenCalender}>
                    <label>
                        CHECK-IN
                    </label>
                    <p>{filterBy.checkIn ? formatRangeDates(filterBy.checkIn) : 'Add dates'}</p>
                </div>

                <div className="flex column" onClick={onOpenCalender}>
                    <label>
                        CHECK-OUT
                    </label>
                    <p> {filterBy.checkOut ? formatRangeDates(filterBy.checkOut) : 'Add dates'}</p>
                </div>

                <div className="flex column" onClick={(ev) => setIsAddGuestOpen(!isAddGuestOpen)}>
                    <label>
                        GUESTS
                    </label>
                    <p>{guestSummary(filterBy.guest)}</p>
                    {isAddGuestOpen && <div className="details-res-add-guests" onClick={(ev) => ev.stopPropagation()}><AddGuests setGuest={setGuest} filterBy={filterBy} /></div>}
                </div>

                {isCalenderOpen && <section className="details-res-calender">
                    <section className="calender-stay-options flex">
                        <div className="calender-stay-details">
                            <h2>{`${sumNights(filterBy.checkIn, filterBy.checkOut)} nights`}</h2>
                            {(filterBy.checkIn && filterBy.checkOut) && <p>{`${formatRangeDatesCalender(filterBy.checkIn)} - ${formatRangeDatesCalender(filterBy.checkOut)}`}</p>}
                        </div>
                        <div className="calender-dates-input flex">
                            <div className={"flex column " + (activeCalenderDate === 'checkIn' ? 'active' : '')} onClick={onOpenCalender}>
                                <label>
                                    CHECK-IN
                                </label>
                                <p>{filterBy.checkIn ? formatRangeDates(filterBy.checkIn) : 'Add dates'}</p>
                            </div>

                            <div className={"flex column " + (activeCalenderDate === 'checkOut' ? 'active' : '')}>
                                <label>
                                    CHECK-OUT
                                </label>
                                <p> {filterBy.checkOut ? formatRangeDates(filterBy.checkOut) : 'Add dates'}</p>
                            </div>
                        </div>
                    </section>
                    <FilterCalender
                        range={range}
                        setRange={handleSelect}
                        cmp={'details-res'}
                        setIsCalenderOpen={setIsCalenderOpen}
                        activeCalenderDate={activeCalenderDate}
                        setActiveCalenderDate={setActiveCalenderDate} />
                </section>}
            </div>

            <button
                className='reserve-btn-details'
                onClick={onReserve}
                onMouseMove={handleButtonMouseMove}
            >
                Reserve
            </button>

            <p>You won't be charged yet</p>
            <div className="prices">
                <h2>{`₪${stay.price}`}<span> X </span> {nightSum + ((nightSum === 1) ? ' night' : ' nights')}</h2>
                {totalPrice && <p>{`₪${totalPrice}`}</p>}
                <h2>Cleaning fee</h2>
                {totalPrice && <p> {`₪${cleaningFee}`}</p>}
            </div>
            <div className="total-price flex">
                <h2 >Total</h2>
                {totalPrice && <p>{`₪${totalPrice + cleaningFee}`}</p>}
            </div>

            <div className={(isCalenderOpen || isAddGuestOpen) ? 'calender-open-backscreen' : ''} onClick={() => onClickBackDrop()}></div>

        </div >)
}