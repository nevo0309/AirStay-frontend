import { useEffect, useState } from "react"
import { handleButtonMouseMove } from "./../../services/util.service"
import { useSelector } from "react-redux"

export function DetailsReservation({ onReserve }) {
    const stay = useSelector((storeState) => storeState.stayModule.stay)
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)
    const [totalPrice, setTotalPrice] = useState(null)
    const CleaningFee = totalPrice * 0.1

    useEffect(() => {
        setTotalPrice(sumNights(filterBy.checkIn, filterBy.checkOut) * stay.price)
    }, [filterBy])
    console.log(filterBy)


    function formatRangeDates(date) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' }
        const dateToShow = date.toLocaleDateString('en-US', options)

        return dateToShow;
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
        <div className='details-reservation'>
            <h1>{`₪${stay.price}`}<span>night</span></h1>
            <div>
                <label>
                    Check in
                </label>
                <p>{filterBy.checkIn ? formatRangeDates(filterBy.checkIn) : 'Add dates'}</p>
            </div>

            <div >
                <label>
                    Check out
                </label>
                <p> {filterBy.checkOut ? formatRangeDates(filterBy.checkOut) : 'Add dates'}</p>
            </div>

            <div>
                <label>
                    Guests
                </label>
                <p>{guestSummary(filterBy.guest)}</p>
            </div>

            <button
                className='reserve-btn-details'
                onClick={onReserve}
                onMouseMove={handleButtonMouseMove}
            >
                Reserve
            </button>

            <p>You won't be charged yet</p>
            <p>{`₪${stay.price}X ${sumNights(filterBy.checkIn, filterBy.checkOut)} nights`}</p>
            {totalPrice && <p>{`₪${totalPrice}`}</p>}
            <p>Cleaning fee</p>
            {totalPrice && <p> {`₪${CleaningFee}`}</p>}
            <p>Total</p>
            {totalPrice && <p>{`₪${totalPrice + CleaningFee}`}</p>}
        </div >)
}