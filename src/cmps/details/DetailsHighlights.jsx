import { iconLibrary } from "../../../data/svgExport"

export function DetailsHighlights() {
  const highlights = [
    {
      title: "Self check-in",
      description: "Check yourself in with the lockbox.",
      icon: "Key"
    },
    {
      title: "Peace and quiet",
      description: "Guests say this home is in a quiet area.",
      icon: "Location"
    },
    {
      title: "Free cancellation before Dec 4",
      description: "Get a full refund if you change your mind.",
      icon: "Calendar"
    }
  ]

  return (
    <section className='stay-highlights'>
      {highlights.map((highlight, idx) => (
        <div className='highlight-host' key={idx}>
          <div className='highlight-icon'>{iconLibrary[highlight.icon]}</div>
          <div className='highlight-text'>
            <h4 className='highligh-title'>{highlight.title}</h4>
            <p className='highlight-description'>{highlight.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
