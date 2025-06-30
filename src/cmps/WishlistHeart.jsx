import { useWishlist } from "../customHooks/useWishList"
import { heartFilledSvg, heartOutlineSvg } from "../../data/svgExport" // ✅ adjust path if needed

export function WishlistHeart({ stay }) {
  const userId = "guest" // fallback until auth is added
  const { isWishlisted, toggle, isLoading } = useWishlist(userId, stay)

  return (
    <button
      className='heart-icon'
      onClick={e => {
        e.stopPropagation()
        if (!isLoading) toggle()
      }}>
      {isLoading ? (
        <span>...</span>
      ) : isWishlisted ? (
        heartFilledSvg
      ) : (
        heartOutlineSvg
      )}
    </button>
  )
}
