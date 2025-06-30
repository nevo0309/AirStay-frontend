import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WishlistHeart } from "../cmps/WishlistHeart"
import { loadUserWishlist } from "../store/user.actions"

export function WishlistPage() {
  const dispatch = useDispatch()

  const wishlistStays = useSelector(state => state.userModule.wishlistStays)
  const loading = useSelector(state => state.systemModule.isLoading) // Optional, if using loading state in Redux

  useEffect(() => {
    dispatch(loadUserWishlist())
  }, [])

  if (loading) return <div className='wishlist-page loading'>Loading...</div>
  if (!wishlistStays?.length)
    return <div className='wishlist-page empty'>No wishlisted stays yet</div>

  return (
    <section className='wishlist-page'>
      <h2>Wishlist</h2>
      <div className='wishlist-grid'>
        {wishlistStays.map(stay => (
          <article key={stay._id} className='wishlist-card'>
            <div className='wishlist-imgs'>
              <img src={stay.imgUrls?.[0]} alt={stay.name} />
              <WishlistHeart stay={stay} />
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
