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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.guest?.fullname}</td>
              <td>{order.stay?.name}</td>
              <td>{formatFullDate(order.startDate)}</td>
              <td>{formatFullDate(order.endDate)}</td>
              <td>${order.totalPrice}</td>
              <td>
                <span
                  className={`status-cell status-${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </td>

              <td>
                {order.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(order._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(order._id, "Declined")}
                    >
                      Decline
                    </button>
                  </>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
