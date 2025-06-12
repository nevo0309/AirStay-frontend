import set from 'date-fns/set'
import { searchSvg } from '../../data/svgExport'

export function StayFilterClosed({setIsStayFilterOpen}) {

    return <section className="stay-filter-closed flex align-center" onClick={() => setIsStayFilterOpen(true)}>
        <div className='flex'>
            <img src="/public/img/filter.png" alt="" />
            <h1>Anywhere</h1>
        </div>
        <h1>Anytime</h1>
        <h1>Add guests</h1>
        <button className="search-btn">{searchSvg}</button>
    </section>
}