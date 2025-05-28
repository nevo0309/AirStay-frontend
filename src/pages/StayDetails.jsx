import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStay, addStayMsg } from '../store/stay.actions'

export function StayDetails() {
  const { stayId } = useParams()
  const stay = useSelector(storeState => storeState.stayModule.stay)

  useEffect(() => {
    loadStay(stayId)
  }, [stayId])

  async function onAddStayMsg(stayId) {
    try {
      await addStayMsg(stayId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Stay msg added`)
    } catch (err) {
      showErrorMsg('Cannot add stay msg')
    }
  }

  return (
    <section className="stay-details">
      <Link to="/stay">Back to list</Link>
      <h1>Stay Details</h1>
      {stay && (
        <div>
          <h3>{stay.vendor}</h3>
          <h4>${stay.price}</h4>
          <pre> {JSON.stringify(stay, null, 2)} </pre>
        </div>
      )}
      <button
        onClick={() => {
          onAddStayMsg(stay._id)
        }}
      >
        Add stay msg
      </button>
    </section>
  )
}
