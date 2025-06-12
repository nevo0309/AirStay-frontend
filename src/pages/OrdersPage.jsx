import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { loadHostOrders, updateOrderStatus } from "../store/order.actions"
import { forDateRange } from "../services/util.service"
export function OrdersPage() {
  const dispatch = useDispatch()
  const { stayId } = useParams()

  // const orders = useSelector((state) => state.orderModule.hostOrders) || []

  const orders = [
    {
      _id: "o1350",
      host: { _id: "u108", fullname: "Sophia Blake", imgUrl: "..." },
      guest: { _id: "u110", fullname: "Daniel Cruz" },
      totalPrice: 285,
      startDate: "2025-09-28",
      endDate: "2025-10-03", // 🟡 Crosses months
      guests: { adults: 2, Children: 1, Infants: 1, Pets: 0 },
      stay: {
        _id: "h208",
        name: "Forest Cabin",
        imgUrl: "https://example.com/forest.jpg"
      },
      msgs: [],
      status: "Confirmed"
    },
    {
      _id: "o1351",
      host: { _id: "u109", fullname: "Liam Turner", imgUrl: "..." },
      guest: { _id: "u112", fullname: "Natalie Kim" },
      totalPrice: 410,
      startDate: "2025-11-12",
      endDate: "2025-11-16",
      guests: { adults: 2, kids: 2 },
      stay: {
        _id: "h209",
        name: "Ocean Breeze Bungalow",
        imgUrl: "https://example.com/ocean.jpg"
      },
      msgs: [],
      status: "Pending"
    },
    {
      _id: "o1352",
      host: { _id: "u107", fullname: "Ethan Gray", imgUrl: "..." },
      guest: { _id: "u113", fullname: "Maya Singh" },
      totalPrice: 355,
      startDate: "2025-10-29",
      endDate: "2025-11-04", // 🟡 Crosses months
      guests: { adults: 1, kids: 0 },
      stay: {
        _id: "h210",
        name: "City View Apartment",
        imgUrl: "https://example.com/city.jpg"
      },
      msgs: [],
      status: "Declined"
    },
    {
      _id: "o1353",
      host: { _id: "u110", fullname: "Olivia Hart", imgUrl: "..." },
      guest: { _id: "u114", fullname: "Lucas Reed" },
      totalPrice: 600,
      startDate: "2025-12-20",
      endDate: "2025-12-26",
      guests: { adults: 3, kids: 1 },
      stay: {
        _id: "h211",
        name: "Lakeside Villa",
        imgUrl: "https://example.com/lake.jpg"
      },
      msgs: [],
      status: "Confirmed"
    },
    {
      _id: "o1354",
      host: { _id: "u111", fullname: "Noah Pierce", imgUrl: "..." },
      guest: { _id: "u115", fullname: "Isabella Flores" },
      totalPrice: 520,
      startDate: "2025-08-14",
      endDate: "2025-08-18",
      guests: { adults: 2, kids: 1 },
      stay: {
        _id: "h212",
        name: "Desert Dream House",
        imgUrl: "https://example.com/desert.jpg"
      },
      msgs: [],
      status: "Pending"
    },
    {
      _id: "o1355",
      host: { _id: "u112", fullname: "Ava Brooks", imgUrl: "..." },
      guest: { _id: "u116", fullname: "Ethan Morgan" },
      totalPrice: 450,
      startDate: "2025-06-30",
      endDate: "2025-07-05", // 🟡 Crosses months
      guests: { adults: 2, kids: 0 },
      stay: {
        _id: "h213",
        name: "Riverfront Hideout",
        imgUrl: "https://example.com/river.jpg"
      },
      msgs: [],
      status: "Confirmed"
    },
    {
      _id: "o1356",
      host: { _id: "u113", fullname: "Jackson Lee", imgUrl: "..." },
      guest: { _id: "u117", fullname: "Chloe Bennett" },
      totalPrice: 390,
      startDate: "2025-10-27",
      endDate: "2025-10-31",
      guests: { adults: 1, kids: 2 },
      stay: {
        _id: "h214",
        name: "Countryside Farmhouse",
        imgUrl: "https://example.com/farm.jpg"
      },
      msgs: [],
      status: "Declined"
    }
  ]

  useEffect(() => {
    if (stayId) {
      dispatch(loadHostOrders(stayId))
    }
  }, [stayId, dispatch])

  const onUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus(orderId, newStatus))
  }

  return (
    <div className='trips-page'>
      <h1>Welcome,Puki Host!</h1>

      <h2 className='trips-heading'>Your reservations</h2>

      <table className='trips-table'>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Stay</th>
            <th>Dates</th>
            <th>Paymnet</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.guest?.fullname}</td>
              <td>{order.stay?.name}</td>

              <td>{forDateRange(order.startDate, order.endDate)}</td>
              <td>${order.totalPrice}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "Pending" ? (
                  <>
                    <button
                      className='btn'
                      style={{ background: "#32AB4D" }}
                      onClick={() => onUpdateStatus(order._id, "Confirmed")}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => onUpdateStatus(order._id, "Declined")}
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
