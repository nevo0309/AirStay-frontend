import { AmenityIcon } from '../../../data/svgExport'

export function DetailsAmenities({ amenities }) {
  const numOfAmenities = amenities.length
  const displayed = amenities.slice(0, 10)

  const handleClick = () => {
    console.log('TODO: Open modal with all amenities')
  }

  return (
    <section className="details-amenities">
      <h3 className="section-title">What this place offers</h3>
      <ul className="amenities-list">
        {displayed.map(amenity => (
          <li key={amenity} className="amenities-item">
            <span className="amenities-icon">
              <AmenityIcon type={amenity} />
            </span>
            <span className="amenities-label">{amenity}</span>
          </li>
        ))}
      </ul>

      {numOfAmenities > 10 && (
        <button className="show-all-amenities" onClick={handleClick}>
          Show all {numOfAmenities}
        </button>
      )}
    </section>
  )
}
