import React from 'react'
import { heartSvg } from '../../data/svgExport.jsx'

export function StayPreview({ stay }) {
  return (
    <article className="preview">
      <img src={stay.imgUrls?.[0]} alt={stay.name} />
      <div className="heart-icon">{heartSvg}</div>

      <div className="preview-content">
        <h3>{stay.name}</h3>
        <div className="stay-dates">May 30 – Jun 1</div>
        <span className="stay-price-preview">{stay.price}₪ · 2 nights</span>
      </div>
    </article>
  )
}
