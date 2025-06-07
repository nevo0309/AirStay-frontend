import { doorSvg } from "../../../data/svgExport"

export function DetailsHighlights() {
  const highlights = [
    {
      title: "Self check-in",
      description: "Check yourself in with the lockbox.",
      icon: "lock"
    },
    {
      title: "Dedicated workspace",
      description: "A common area with wifi that's well-suited for working.",
      icon: "laptop"
    },
    {
      title: "Great location",
      description:
        "Guests who stayed here in the past year loved the location.",
      icon: "map-marker"
    }
  ]

  return (
    <section className='stay-highlights'>
      {highlights.map((highlight, idx) => (
        <div className='highlight-host' key={idx}>
          <div className='highlight-icon'>{doorSvg}</div>
          <div className='highlight-text'>
            <h4 className='highligh-title'>{highlight.title}</h4>
            <p className='highlight-description'>{highlight.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
