import { useDispatch, useSelector } from "react-redux"
import { heartFilledSvg, heartOutlineSvg } from "../../data/svgExport"
import { toggleWishlistStay } from "../store/user.actions"
import { useState } from "react"

export function WishlistHeart({ stay, onToggle }) {
  const dispatch = useDispatch()
  const wishlistIds = useSelector(state => state.userModule.wishlistIds) // ✅ Moved up
  const isLiked = wishlistIds.includes(stay._id)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleClick(e) {
    e.stopPropagation()
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await dispatch(toggleWishlistStay(stay)) // returns true or false
      onToggle?.(result, stay._id) // Notify parent if provided
    } catch (err) {
      setError("Failed to update wishlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button className='heart-icon' onClick={handleClick} disabled={isLoading}>
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={isLoading ? { opacity: 0.6 } : {}}>
          {isLiked ? heartFilledSvg : heartOutlineSvg}
        </span>
        {isLoading && (
          <span
            style={{
              position: "absolute",
              right: 2,
              top: 2,
              fontSize: "0.9em",
              color: "#999",
              pointerEvents: "none"
            }}>
            •
          </span>
        )}
      </span>
    </button>
  )
}
