import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadStays } from '../store/stay.actions'
import { StayPreview } from '../cmps/StayPreview'

export function SearchPage() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])


    return <section className="search-page flex">
        <div className="search-stays">
            {stays.map(stay => (
                <div key={stay._id} className='card'>
                    <StayPreview stay={stay} />
                </div>
            ))}
        </div>
        <div className="search- map">
            <h1>map</h1>

        </div>
    </section>
}