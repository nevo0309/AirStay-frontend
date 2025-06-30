import { useEffect, useState } from "react"
// import { stayService } from "../services/stay/stay.service.local"
import { stayService } from "../services/stay/stay.service.remote"
import { WishlistHeart } from "../cmps/WishlistHeart"

export function WishlistPage() {
  const [stays, setStays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    stayService
      .fetchWishlist()
      .then(setStays)
      .catch(() => setStays([]))
      .finally(() => setLoading(false))
  }, [])

  // function handleHeartToggle(stayId, isNowLiked) {
  //   if (!isNowLiked) {
  //     // Remove from list if unliked
  //     setStays(prev => prev.filter(s => s._id !== stayId))
  //   }
  //   // No need to add, because we never "like" a stay that isn't already here
  // }

  if (loading) return <div className='wishlist-page loading'>Loading...</div>
  if (!stays.length)
    return <div className='wishlist-page empty'>No wishlisted stays yet</div>

  return (
    <section className='wishlist-page'>
      <h2>Wishlist</h2>
      <div className='wishlist-grid'>
        {stays.map(stay => (
          <article key={stay._id} className='wishlist-card'>
            <div className='wishlist-imgs'>
              <img src={stay.imgUrls?.[0]} alt={stay.name} />
              <WishlistHeart
                stay={stay}
                isLiked={true} // all are liked by definition
                // onToggle={isNowLiked => handleHeartToggle(stay._id, isNowLiked)}
              />
            </div>
            <div className='wishlist-info'>
              <h3>{stay.name}</h3>
              <p>
                {stay.loc?.city || "City"}, {stay.loc?.country || "Country"}
              </p>
              <p>★ {stay.rating || 4.83}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
