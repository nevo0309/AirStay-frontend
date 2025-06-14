import { useState, useEffect, useMemo } from 'react'

export function DetailsSummary({ summary }) {
  if (!summary) return 'loading....'
  // console.log(summary, 'staysum')

  const trimmedSummary = useMemo(() => {
    const words = summary.trim().split(/\s+/)
    if (words.length <= 63) return summary
    return words.slice(0, 63).join(' ') + '…'
  }, [summary])

  return (
    <div className="stay-details-summary">
      <p className="stay-summary">{trimmedSummary}</p>
      <button className="show-more">Show more</button>
    </div>
  )
}
