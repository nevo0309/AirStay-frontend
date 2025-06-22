export function MiniReservationCard({ price, onReserve }) {
  return (
    <div className='mini-reservation-card'>
      <div>
        <span>₪{price}</span> / night
      </div>
      <button onClick={onReserve}>Reserve</button>
    </div>
  )
}
