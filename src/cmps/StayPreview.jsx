import React from 'react'
import { useLocation } from "react-router-dom"
import { heartSvg } from '../../data/svgExport.jsx'
import { ImgCarousel } from './imgCarosel.jsx'

export function StayPreview({ stay }) {
  const location = useLocation()
  return (
    <article className="preview">
      {location.pathname.startsWith("/search") ?
        <ImgCarousel stay={stay} /> :
        <img src={stay.imgUrls?.[0]} alt={stay.name} />}
      <div className="heart-icon">{heartSvg}</div>

      <div className="preview-content">
        <h3>{stay.name}</h3>
        <div className="stay-dates">May 30 – Jun 1</div>
        <span className="stay-price-preview"><span>{stay.price}₪ </span>· 2 nights</span>
      </div>
    </article>
  )
}
