// src/components/TripsPage.jsx
import React from 'react'

export function TripsPage({ orders }) {
  const list = orders ?? []

  return (
    <div className="trips-page">
      <h1 className="trips-heading">Trips</h1>
      <p className="trips-count">
        {list.length} {list.length === 1 ? 'trip' : 'trips'}
      </p>

      <table className="trips-table">
        <thead>
          <tr>
            <th className="th-destination">Destination</th>
            <th className="th-host">Host</th>
            <th className="th-checkin">Check‐in</th>
            <th className="th-checkout">Checkout</th>
            <th className="th-guests">Guests</th>
            <th className="th-price">Total Price</th>
            <th className="th-status">Status</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-trips">
                No trips to display.
              </td>
            </tr>
          ) : (
            list.map(order => {
              const {
                _id,
                stay: { name: stayName, imgUrl: stayImg },
                host: { fullname: hostName },
                startDate,
                endDate,
                guests: { adults, kids },
                totalPrice,
                status,
              } = order

              const priceFormatted = `$${totalPrice.toFixed(2)}`

              const statusText = status.charAt(0).toUpperCase() + status.slice(1)

              const statusClass =
                status.toLowerCase() === 'pending' ? 'status-pending' : 'status-completed'

              return (
                <tr key={_id}>
                  <td>
                    <div className="trip-destination">
                      <img src={stayImg} alt={stayName} className="trip-image" />
                      <span className="trip-title">{stayName}</span>
                    </div>
                  </td>

                  {/* Host */}
                  <td className="td-host">{hostName}</td>

                  {/* Check‐in */}
                  <td className="td-checkin">{startDate}</td>

                  {/* Checkout */}
                  <td className="td-checkout">{endDate}</td>

                  {/* Guests */}
                  <td className="td-guests">
                    {adults} adult{adults !== 1 ? 's' : ''}, {kids} kid{kids !== 1 ? 's' : ''}
                  </td>

                  {/* Total Price */}
                  <td className="td-price">{priceFormatted}</td>

                  {/* Status */}
                  <td className={`td-status ${statusClass}`}>{statusText}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
