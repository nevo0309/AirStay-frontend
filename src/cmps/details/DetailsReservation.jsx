import { useEffect, useState } from "react"
import { handleButtonMouseMove } from "./../../services/util.service"
import { useSelector } from "react-redux"

export function DetailsReservation({ onReserve }) {
    const stay = useSelector((storeState) => storeState.stayModule.stay)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [totalPrice, setTotalPrice] = useState(null)
    const cleaningFee = totalPrice * 0.1

    useEffect(() => {
        setTotalPrice(sumNights(filterBy.checkIn, filterBy.checkOut) * stay.price)
    }, [filterBy])
    console.log(filterBy)


    function formatRangeDates(date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') // חודשים מתחילים מ־0
        const year = date.getFullYear()

        return `${day}/${month}/${year}`
    }


    function guestSummary(guest) {
        const labelMap = {
            adults: ['Adult', 'Adults'],
            children: ['Child', 'Children'],
            infants: ['Infant', 'Infants'],
            pet: ['Pet', 'Pets']
        }

        const totalCount = Object.values(guest).reduce((sum, count) => sum + count, 0)

        if (totalCount === 0) return '1 Guest'

        return Object.entries(guest)
            .filter(([_, count]) => count > 0)
            .map(([key, count]) => {
                const [singular, plural] = labelMap[key]
                const label = count === 1 ? singular : plural
                return `${count} ${label}`
            })
            .join(', ')
    }


    function sumNights(startDate, endDate) {
        if (!startDate || !endDate) return 0

        const oneDayMs = 1000 * 60 * 60 * 24
        const diffMs = endDate - startDate

        return Math.max(0, Math.round(diffMs / oneDayMs))
    }

    return (
        <div className='details-reservation flex column'>
            <h1>{`₪${stay.price}`} <span>night </span></h1>
            <div className="reservation-options">
                <div className="flex column">
                    <label>
                        CHECK-IN
                    </label>
                    <p>{filterBy.checkIn ? formatRangeDates(filterBy.checkIn) : 'Add dates'}</p>
                </div>

                <div  className="flex column">
                    <label>
                        CHECK-OUT
                    </label>
                    <p> {filterBy.checkOut ? formatRangeDates(filterBy.checkOut) : 'Add dates'}</p>
                </div>

                <div  className="flex column">
                    <label>
                        GUESTS                    </label>
                    <p>{guestSummary(filterBy.guest)}</p>
                </div>
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
                <h2>{`₪${stay.price}`}<span> X </span> {`${sumNights(filterBy.checkIn, filterBy.checkOut)} nights`}</h2>
                {totalPrice && <p>{`₪${totalPrice}`}</p>}
                <h2>Cleaning fee</h2>
                {totalPrice && <p> {`₪${cleaningFee}`}</p>}
            </div>
            <div className="total-price flex">
                <h2 >Total</h2>
                {totalPrice && <p>{`₪${totalPrice + cleaningFee}`}</p>}
            </div>
        </div >)
}