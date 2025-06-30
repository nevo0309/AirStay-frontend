import { useState } from "react"
import { heartFilledSvg, heartOutlineSvg } from "../../data/svgExport"
import { stayService } from "../services/stay/stay.service.remote"

export function WishlistHeart({ stay }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleClick(e) {
    e.stopPropagation()
    if (isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await stayService.toggleWishlist(stay._id)
      setIsLiked(result) // result is boolean: true or false
    } catch (err) {
      setError("Failed to update wishlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // <button className='heart-icon' onClick={handleClick}>
    //   {isLoading ? (
    //     <span>...</span>
    //   ) : isLiked ? (
    //     heartFilledSvg
    //   ) : (
    //     heartOutlineSvg
    //   )}
    // </button>
    <button className='heart-icon' onClick={handleClick} disabled={isLoading}>
      {/* Show spinner overlay or opacity if loading */}
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
