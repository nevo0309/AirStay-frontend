import { doorSvg } from "../../../data/svgExport"

export function DetailsAmenities({ amenities }) {
  return (
    <section className='details-amenities'>
      <h3 className='section-title'>What this place offers</h3>
      <ul className='amenities-list'>
        {amenities?.map((amenity, idx) => (
          <li className='amenities-item' key={idx}>
            <span className='amenities-icon'>{doorSvg}</span>
            <span className='amenities-label'>{amenity}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
