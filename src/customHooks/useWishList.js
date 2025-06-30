import { useEffect, useState } from "react"
import { getUserWishlist, toggleWishlistStay } from "../services/user/wishlist.service"

// Hook to manage wishlist state for a single stay
//  - ID of the current user (use "guest" if no auth)
//  - The stay object to check against
//.  { isWishlisted, toggle, isLoading }
export function useWishlist(userId = "guest", stay) {
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!stay || !userId) return

        setIsLoading(true)
        const wishlist = getUserWishlist(userId)
        setIsWishlisted(wishlist.some((s) => s._id === stay._id))
        setIsLoading(false)
    }, [userId, stay._id])

    async function toggle() {
        const updated = toggleWishlistStay(userId, stay)
        setIsWishlisted(updated.some((s) => s._id === stay._id))
    }

    return { isWishlisted, toggle, isLoading }
}
