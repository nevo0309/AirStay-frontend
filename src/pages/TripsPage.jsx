import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadOrders } from '../store/order.actions'

export function TripsPage() {
  useEffect(() => {
    loadOrders()
  }, [])

  const orders = useSelector(store => store.orderModule.orders)

  return (
    <div className="trips-page">
      <h1 className="trips-heading">Trips</h1>
      <p className="trips-count">
        {orders.length} {orders.length === 1 ? 'trip' : 'trips'}
      </p>

      <table className="trips-table">
        <thead>
          <tr>
            <th className="th-destination">Destination</th>
            <th className="th-host">Host</th>
            <th className="th-checkin">Check-in</th>
            <th className="th-checkout">Checkout</th>
            <th className="th-booked">Booked</th>
            <th className="th-price">Total Price</th>
            <th className="th-status">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-trips">
                No trips to display.
              </td>
            </tr>
          ) : (
            orders.map(order => {
              const {
                _id,
                stay: { name: stayName, imgUrl: stayImg },
                host: { fullname: hostName },
                startDate,
                endDate,

                createdAt,
                totalPrice,
                status,
              } = order

              const priceFormatted = `₪${totalPrice.toFixed(2)}`
              const statusClass = status === 'pending' ? 'status-pending' : 'status-completed'
              const statusText = status[0].toUpperCase() + status.slice(1)
              const orderDate = new Date(createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')
              return (
                <tr key={_id}>
                  <td>
                    <div className="trip-destination">
                      <img src={stayImg} alt={stayName} className="trip-image" />
                      <span className="trip-title">{stayName}</span>
                    </div>
                  </td>
                  <td className="td-host">{hostName}</td>
                  <td className="td-checkin">{startDate}</td>
                  <td className="td-checkout">{endDate}</td>
                  <td className="td-booked">{orderDate}</td>
                  <td className="td-price">{priceFormatted}</td>
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
