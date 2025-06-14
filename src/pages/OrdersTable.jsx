import { formatFullDate } from "../services/util.service"

export function OrdersTable({ orders = [], onStatusChange }) {
  const handleStatusChange = (orderId, newStatus) => {
    if (onStatusChange) onStatusChange(orderId, newStatus)
  }

  return (
    <div className='trips-page'>
      <table className='trips-table'>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Stay</th>
            <th>Check-in</th>
            <th>Checkout</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const guestName = order.guest?.fullname || "Unknown Guest"
            const stayName = order.stay?.name || "Unknown Stay"
            const checkIn = formatFullDate(order.startDate)
            const checkOut = formatFullDate(order.endDate)
            const status = order.status || "Unknown"

            return (
              <tr key={order._id}>
                <td>{guestName}</td>
                <td>{stayName}</td>
                <td>{checkIn}</td>
                <td>{checkOut}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <span
                    className={`status-cell status-${status.toLowerCase()}`}
                  >
                    {status}
                  </span>
                </td>
                <td>
                  {status === "Pending" ? (
                    <div className='action-buttons'>
                      <button
                        className='btn-approve'
                        onClick={() =>
                          handleStatusChange(order._id, "Approved")
                        }
                        aria-label={`Approve reservation for ${guestName}`}
                      >
                        Approve
                      </button>
                      <button
                        className='btn-decline'
                        onClick={() =>
                          handleStatusChange(order._id, "Declined")
                        }
                        aria-label={`Decline reservation for ${guestName}`}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
