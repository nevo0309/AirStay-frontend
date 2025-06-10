import { useState, useEffect, useRef } from "react"



export function AddGuests({ setGuest }) {
    const [adultsCount, setAdultsCount] = useState(0)
    const [childrenCount, setChildrenCount] = useState(0)
    const [infantsCount, setInfantsCount] = useState(0)
    const [petsCount, setPetsCount] = useState(0)

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        setGuest({
            adults: adultsCount,
            children: childrenCount,
            infants: infantsCount,
            pet: petsCount
        })
    }, [adultsCount, childrenCount, infantsCount, petsCount])

    function addGuests(guestType, diff) {
        if (guestType === 'adults') {
            if (adultsCount === 0 && diff === -1) return
            setAdultsCount(prevCount => prevCount + diff)
        } else if (guestType === 'children') {
            if (childrenCount === 0 && diff === -1) return
            setChildrenCount(prevCount => prevCount + diff)
        } else if (guestType === 'infants') {
            if (infantsCount === 0 && diff === -1) return
            setInfantsCount(prevCount => prevCount + diff)
        } else if (guestType === 'pets') {
            if (petsCount === 0 && diff === -1) return
            setPetsCount(prevCount => prevCount + diff)
        }


    }

    return <section className="add-guests">
        <div className="guest-counter-card flex">
            <div className="guest">
                <h1>Adults</h1>
                <p>Ages 13 or above</p>
            </div>
            <div className="counter flex">
                <button className={adultsCount === 0 ? 'blocked' : ''} onClick={() => addGuests('adults', -1)}>-</button>
                <h2>{adultsCount}</h2>
                <button onClick={() => addGuests('adults', 1)}>+</button>
            </div>
        </div>

        <div className="guest-counter-card flex">
            <div className="guest">
                <h1>Children</h1>
                <p>Ages 2-12</p>
            </div>
            <div className="counter flex">
                <button className={childrenCount === 0 ? 'blocked' : ''} onClick={() => addGuests('children', -1)}>-</button>
                <h2>{childrenCount}</h2>
                <button onClick={() => addGuests('children', 1)}>+</button>
            </div>
        </div>

        <div className="guest-counter-card flex">
            <div className="guest">
                <h1>Infants</h1>
                <p>under 2</p>
            </div>
            <div className="counter flex">
                <button className={infantsCount === 0 ? 'blocked' : ''} onClick={() => addGuests('infants', -1)}>-</button>
                <h2>{infantsCount}</h2>
                <button onClick={() => addGuests('infants', 1)}>+</button>
            </div>
        </div>

        <div className="guest-counter-card flex">
            <div className="guest">
                <h1>Pets</h1>
                <h2>Bringing a service animal?</h2>
            </div>
            <div className="counter flex">
                <button className={petsCount === 0 ? 'blocked' : ''} onClick={() => addGuests('pets', -1)}>-</button>
                <h2>{petsCount}</h2>
                <button onClick={() => addGuests('pets', 1)}>+</button>
            </div>
        </div>
    </section>
}