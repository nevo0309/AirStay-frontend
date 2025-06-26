
import { useLocation } from "react-router-dom"
import { useMemo } from "react"

// Returns a boolean: true if any pattern matches based on the chosen matchType.
/**
 * @param {string[]} patterns - Array of paths to match
 * @param {"startsWith" | "equals" | "endsWith"} matchType
 */
export function usePathMatch(patterns = [], matchType = "startsWith") {
    const location = useLocation()

    return useMemo(() => {
        return patterns.some((pattern) => {
            if (matchType === "equals") return location.pathname === pattern
            if (matchType === "endsWith") return location.pathname.endsWith(pattern)
            return location.pathname.startsWith(pattern)
        })
    }, [location.pathname, patterns.join(","), matchType])
}
