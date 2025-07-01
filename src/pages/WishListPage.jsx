import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WishlistHeart } from "../cmps/WishlistHeart"
import { loadUserWishlist } from "../store/user.actions"
import { useNavigate } from "react-router"

export function WishlistPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wishlistStays = useSelector(state => state.userModule.wishlistStays)
  const loading = useSelector(state => state.systemModule.isLoading)

  useEffect(() => {
    dispatch(loadUserWishlist())
  }, [])

  if (loading) return <div className='wishlist-page loading'>Loading...</div>
  if (!wishlistStays?.length)
    return <div className='wishlist-page empty'>No wishlisted stays yet</div>

  // Preprocess stays with average rating
  const staysWithAvg = wishlistStays.map(stay => {
    const reviews = stay.reviews || []
    const total = reviews.length
    const avg =
      total > 0 ? reviews.reduce((sum, { stars }) => sum + stars, 0) / total : 0
    return { ...stay, avgRating: avg }
  })

  return (
    <section className='wishlist-page main-container full'>
      <h2>Wishlist</h2>
      <div className='wishlist-grid'>
        {staysWithAvg.map(stay => (
          <article
            key={stay._id}
            className='wishlist-card'
            onClick={() => navigate(`/stay/${stay._id}`)}>
            <div className='wishlist-imgs'>
              <img src={stay.imgUrls?.[0]} alt={stay.name} />
              <WishlistHeart stay={stay} />
            </div>
            <div className='wishlist-info'>
              <h3>{stay.name}</h3>
              <p>
                {stay.loc?.city || "City"}, {stay.loc?.country || "Country"}
              </p>
              <p>★ {stay.avgRating.toFixed(1)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
