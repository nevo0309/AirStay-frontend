import set from 'date-fns/set'
import { searchSvg } from '../../data/svgExport'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useState } from 'react'
import { formatCalenderDate } from '../services/util.service'
import { gu } from 'date-fns/locale'

export function StayFilterClosed({ setIsStayFilterOpen }) {
    const location = useLocation()
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const where = filterBy.location === 'nearby' ? 'Homes nearby' : `Homes in ${filterBy.location} `
    const guest = filterBy.guest.adults + filterBy.guest.children 
    const singlOrPlural = guest > 1 ? ' guests' : ' guest'
    const isSearchPage = location.pathname.startsWith("/search")



    return <section className="stay-filter-closed flex align-center" onClick={() => setIsStayFilterOpen(true)}>
        <div className='flex'>
            <img src="/public/img/filter.png" alt="" />
            <h1> {(filterBy.location && isSearchPage) ? where : 'Anywhere'}</h1>
        </div>
        <h1>{(filterBy.checkIn && filterBy.checkOut && isSearchPage) ? `${formatCalenderDate(filterBy.checkIn)} - ${formatCalenderDate(filterBy.checkOut)}` : 'Anytime'}</h1>
        <h1>{(guest && isSearchPage) ? (guest + singlOrPlural) : 'Add guests'}</h1>
        <button className="search-btn">{searchSvg}</button>
    </section>
}