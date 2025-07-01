export function DetailsOverview({ stay }) {
  const counts = stay.reviews.reduce(
    (acc, { stars }) => {
      acc[stars]++
      return acc
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  )

  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

  // 2) average rating
  const avg =
    total > 0
      ? stay.reviews.reduce((sum, { stars }) => sum + stars, 0) / total
      : 0
  return (
    <section className='details-overview'>
      <div className='overview-header'>
        <h2 className='overview-location'>{stay.name}</h2>
        <p className='overview-info'>
          {stay.capacity} guests · {stay.bedrooms} bed · {stay.bathrooms} bath
        </p>
        <p className='stay-rating'>
          <span className='star'>★</span>
          <span>{avg.toFixed(1)}</span>
          <span>·</span>
          <span>{stay.reviews.length} reviews</span>
        </p>
      </div>
    </section>
  )
}
