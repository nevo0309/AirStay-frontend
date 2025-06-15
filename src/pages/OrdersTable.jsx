import { formatFullDate } from "../services/util.service"

export function OrdersTable({ orders = [], onStatusChange }) {
  const handleStatusChange = (orderId, newStatus) => {
    if (onStatusChange) onStatusChange(orderId, newStatus)
  }

  return (
    <div className='trips-page custom-font'>
      <table className='trips-table custom-font'>
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
                {/* <td>{guestName}</td> */}
                <td className='guest-info'>
                  <img
                    src={
                      order.guest?.imgUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }
                    alt={guestName}
                    className='avatar'
                    onError={(e) => {
                      e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    }}
                  />
                  <div className='guest-text'>
                    <div className='guest-name'>{guestName}</div>
                    <div className='guest-role'>Guest</div>
                  </div>
                </td>

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
                        className='btn-approve custom-font'
                        onClick={() =>
                          handleStatusChange(order._id, "Approved")
                        }
                        aria-label={`Approve reservation for ${guestName}`}
                      >
                        Approve
                      </button>
                      <button
                        className='btn-decline custom-font'
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
