import { formatFullDate } from '../services/util.service'

export function OrdersCards({ order, hasMsg, onOpenMsg, onApprove, onDecline }) {
  const status = (order.status || 'unknown').toLowerCase()
  const dateRange = `${formatFullDate(order.startDate)} – ${formatFullDate(order.endDate)}`

  return (
    <div className="order-card">
      {/* header */}
      <div className="card-head">
        <div>
          <span className={`status-badge status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <div className="stay-name">{order.stay?.name || 'Unknown Stay'}</div>
        </div>

        <div className="avatar-box">
          <img
            className="avatar"
            src={
              order.guest?.imgUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }
            alt={order.guest?.fullname || 'Guest'}
          />
        </div>
        {!order.isHostMsgRead && <span className="new-dot" />}
      </div>

      {/* body */}
      <div className="card-body">
        <div className="guest-name">{order.guest?.fullname || 'Guest'}</div>
        <div className="dates">{dateRange}</div>
      </div>

      {/* approve / decline – always visible side-by-side on the card */}
      {status === 'pending' && (
        <div className="card-actions">
          <button className="btn-approve" onClick={onApprove}>
            Approve
          </button>
          <button className="btn-decline" onClick={onDecline}>
            Decline
          </button>
        </div>
      )}

      {/* message button (opens modal) */}
      {hasMsg && (
        <button className="card-btn" onClick={onOpenMsg}>
          View message
        </button>
      )}
    </div>
  )
}
