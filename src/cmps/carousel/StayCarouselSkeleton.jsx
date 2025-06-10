import React from 'react'
import { StayPreviewSkeleton } from './StayPreviewSkeleton'

export function StayCarouselSkeleton() {
  const skeletonItems = Array.from({ length: 7 }, (emptyArr, idx) => idx)

  return (
    <div className="carousel-section">
      <div className="embla-wrapper">
        <div className="embla-header">
          <div className="skeleton-text skeleton-header-title"></div>
          <div className="embla-header__arrows">
            <button className="embla__button embla__button--prev" type="button" disabled>
              <svg className="embla__button__svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button className="embla__button embla__button--next" type="button" disabled>
              <svg className="embla__button__svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>

        <section className="embla">
          <div className="embla__viewport">
            <div className="embla__container">
              {skeletonItems.map(idx => (
                <div className="embla__slide" key={idx}>
                  <StayPreviewSkeleton />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
