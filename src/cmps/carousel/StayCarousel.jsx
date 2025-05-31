import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { StayPreview } from '../StayPreview'

export function StayCarousel({ stays, title }) {
  const options = {
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
  }
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <div className="carousel-section">
      <div className="embla-wrapper">
        <div className="embla-header">
          <h2 className="embla-header__title">{title}</h2>
          <div className="embla-header__arrows">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>

        <section className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {stays.map(stay => (
                <div className="embla__slide" key={stay._id}>
                  <StayPreview stay={stay} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
