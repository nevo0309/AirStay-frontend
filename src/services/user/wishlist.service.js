const STORAGE_KEY = "wishlist"

// Get wishlist stays for a given userId (or guest fallback)
export function getUserWishlist(userId = "guest") {
    const data = localStorage.getItem(STORAGE_KEY)
    const wishlistMap = data ? JSON.parse(data) : {}

    return wishlistMap[userId] || []
}
// Toggle a stay (add/remove) in a user's wishlist
// Returns updated stays[]
export function toggleWishlistStay(userId = "guest", stay) {
    const data = localStorage.getItem(STORAGE_KEY)
    const wishlistMap = data ? JSON.parse(data) : {}

    const userWishlist = wishlistMap[userId] || []

    const idx = userWishlist.findIndex((s) => s._id === stay._id)
    if (idx !== -1) {
        userWishlist.splice(idx, 1)
    } else {
        userWishlist.push(stay)
    }

    wishlistMap[userId] = userWishlist
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistMap))

    return wishlistMap[userId]
}
