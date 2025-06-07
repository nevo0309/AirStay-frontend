export function DetailsHeader({ name }) {
  if (!name) return null

  return (
    <header className='details-header'>
      <h1 className='details-title'>{name}</h1>
    </header>
  )
}
