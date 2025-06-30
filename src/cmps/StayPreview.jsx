import React from "react"
import { useLocation } from "react-router-dom"
import { heartSvg } from "../../data/svgExport.jsx"
import { ImgCarousel } from "./imgCarosel.jsx"
import { sumNights } from "../services/util.service.js"
import { useSelector } from "react-redux"
import { formatCalenderDate } from "../services/util.service.js"
import { WishlistHeart } from "./WishlistHeart.jsx"

export function StayPreview({ stay }) {
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const location = useLocation()

  const reviewCount = stay.reviews.reduce(
    (acc, { stars }) => {
      acc[stars]++
      return acc
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  )

  function formatAvg(avg) {
    const fixed = avg.toFixed(2)
    if (fixed.endsWith("00")) {
      return avg.toFixed(1)
    } else if (fixed.endsWith("0")) {
      return avg.toFixed(1)
    } else {
      return fixed
    }
  }

  const totalReview = Object.values(reviewCount).reduce((sum, n) => sum + n, 0)
  const avg =
    totalReview > 0
      ? stay.reviews.reduce((sum, { stars }) => sum + stars, 0) / totalReview
      : 0

  return (
    <article className='preview'>
      {location.pathname.startsWith("/search") ? (
        <ImgCarousel stay={stay} />
      ) : (
        <img
          src={stay.imgUrls?.[0]}
          alt={stay.name}
        />
      )}
      {/* <div className="heart-icon">{heartSvg}</div> */}

      <WishlistHeart stay={stay} />

      <div className='preview-content'>
        <h3>{stay.name}</h3>
        {location.pathname.startsWith("/search") &&
        filterBy.checkIn &&
        filterBy.checkOut ? (
          <div className='stay-dates'>{`${formatCalenderDate(
            filterBy.checkIn
          )}-${formatCalenderDate(filterBy.checkOut)}`}</div>
        ) : (
          <div className='stay-dates'>May 30 – Jun 1</div>
        )}

        {location.pathname.startsWith("/search") ? (
          <span className='stay-price-preview'>
            <span>{stay.price}₪ </span>night ·{" "}
            <span className='total-price'>{`₪${
              sumNights(filterBy.checkIn, filterBy.checkOut) * stay.price
            }  total`}</span>
          </span>
        ) : (
          <span className='stay-price-preview'>
            <span>{stay.price * 2}₪ </span>· 2 nights
          </span>
        )}
        <div className='stay-review'>
          <span className='dot'> · </span>★
          <span>
            {formatAvg(avg)}{" "}
            <span className='review-count'>{`(${stay.reviews.length})`}</span>{" "}
          </span>
        </div>
      </div>
    </article>
  )
}
