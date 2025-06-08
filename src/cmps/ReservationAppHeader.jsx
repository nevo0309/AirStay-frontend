
import { logoSvg } from '../../data/svgExport.jsx'
import { NavLink} from 'react-router-dom'
export function ReservationAppHeader() {
    return <section className="reserve-app-header main-container">
        <NavLink to="/" className="/logo">{logoSvg}</NavLink>


    </section>
}