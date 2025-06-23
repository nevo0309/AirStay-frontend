import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadStays } from '../store/stay.actions'
import { StayPreview } from '../cmps/StayPreview'
import { SearchMap } from '../cmps/SearchMap'
import { useNavigate } from "react-router"

export function SearchPage() {
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const navigate = useNavigate()

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])


    return <section className="search-page flex">
        <div className="search-stays">
            {stays.map(stay => (
                <div key={stay._id} className='card' onClick={()=> navigate(`/stay/:${stay._id}`)}>
                    <StayPreview stay={stay} />
                </div>
            ))}
        </div>
        <div className="search-map">
            <SearchMap stays={stays} />

        </div>
    </section>
}