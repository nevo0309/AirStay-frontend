import { forwardRef } from "react"

export const DetailsImageGallery = forwardRef(({ images }, ref) => {
  // Filter out empty or invalid image URLs
  const validImages = images.filter(
    url => typeof url === "string" && url.trim()
  )

  if (!validImages.length) return null

  return (
    <section className='details-image-gallery' ref={ref}>
      <div className='grid-container'>
        {validImages.map((url, idx) => (
          <div
            key={idx}
            className={`image-wrapper ${idx === 0 ? "main-image" : ""}`}>
            <img src={url} alt={`Stay image ${idx + 1}`} loading='lazy' />
          </div>
        ))}
      </div>
    </section>
  )
})
