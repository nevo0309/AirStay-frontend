import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { useState } from "react"
import { arrowsSvg } from "./../../data/svgExport.jsx"
export function ImgCarousel({ stay }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [lastSlide, setLastSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created(slider) {
            setLastSlide(slider.track.details.slides.length - 1)
        }
    })
    console.log(lastSlide)

    return (
        <div className="carousel-wrapper">
            <div ref={sliderRef} className="keen-slider">
                {stay.imgUrls.map((img, idx) => (
                    <div key={idx} className="keen-slider__slide">
                        <img src={img} alt={`image ${idx + 1}`} className="carousel-img" />
                    </div>
                ))}
            </div>
            <button
                className={"nav left " + (currentSlide === 0 ? 'hidden' : '')}
                onClick={(ev) => {
                    ev.stopPropagation()
                    instanceRef.current?.prev()
                }}
            >
                {arrowsSvg.left}
            </button>
            <button
                className={"nav right " + (currentSlide === lastSlide ? 'hidden' : '')}
                onClick={(ev) => {
                    ev.stopPropagation()
                    instanceRef.current?.next()
                }}
            >
                {arrowsSvg.right}
            </button>
            <div className="dots">
                {stay.imgUrls.map((_, idx) => (
                    <button
                        key={idx}
                        className={`dot ${currentSlide === idx ? "active" : ""}`}
                        onClick={() => instanceRef.current?.moveToIdx(idx)}
                    />
                ))}
            </div>
        </div>

    )
}
