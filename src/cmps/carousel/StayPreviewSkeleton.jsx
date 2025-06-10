import React from 'react'

export function StayPreviewSkeleton() {
  return (
    <div className="preview skeleton-preview">
      <div className="skeleton-image"></div>
      <div className="preview-content">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-subtitle"></div>
        <div className="skeleton-text skeleton-price"></div>
      </div>
    </div>
  )
}
