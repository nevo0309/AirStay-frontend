import { forwardRef } from "react"

export const DetailsImageGallery = forwardRef(({ images }, ref) => {
  if (!images.length) return null

  return (
    <section
      className='details-image-gallery'
      ref={ref}>
      <div className='grid-container'>
        {images.map((url, idx) => (
          <div
            key={idx}
            className={`image-wrapper ${idx === 0 ? "main-image" : ""}`}>
            <img
              src={url}
              alt={`Stay image ${idx + 1}`}
              loading='lazy'
            />
          </div>
        ))}
      </div>
    </section>
  )
})
