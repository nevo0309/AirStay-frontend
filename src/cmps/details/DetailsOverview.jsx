export function DetailsOverview({ stay }) {
  return (
    <section className='details-overview'>
      <div className='overview-header'>
        <h2 className='overview-location'>
          Entire rental unit in Eilat, Israel
        </h2>
        <p className='overview-info'>
          {stay.capacity} guests · {stay.bedrooms} bed · {stay.bathrooms} bath
        </p>
        <p className='stay-rating'>
          <span className='star'>★</span> 4.7 reviews
        </p>
      </div>
    </section>
  )
}
