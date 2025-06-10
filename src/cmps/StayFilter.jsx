import { useState, useEffect } from 'react'
import { searchSvg } from '../../data/svgExport'
import { AddGuests } from './AddGuests'
import { SearchDes } from './SearchDes'
import { FilterCalender } from './calender/FilterCaleder.jsx'
import { gu } from 'date-fns/locale'

export function StayFilter({ filterBy, onSetFilterBy }) {
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

  const [openModal, setOpenModal] = useState('')
  const [location, setLocation] = useState('')
  const [guest, setGuest] = useState('')
  console.log(guest)
  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ])

  console.log(range)

  function formatRangeDates(date) {
    const options = { month: 'short', day: 'numeric' }
    const dateToShow = date.toLocaleDateString('en-US', options)

    return dateToShow;
  }

  // console.log(openModal)
  // console.log(openModal === 'calenderCheckIn')
  // useEffect(() => {
  //   onSetFilterBy(filterToEdit)
  // }, [filterToEdit])

  function handleChange(ev) {
    const type = ev.target.type
    const field = ev.target.name
    let value

    switch (type) {
      case 'text':
      case 'radio':
        value = field === 'sortDir' ? +ev.target.value : ev.target.value
        if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
        break
      case 'number':
      case 'range':
        value = +ev.target.value
        break
    }
    // setFilterToEdit({ ...filterToEdit, [field]: value })
  }

  function openFilterModal(modal) {
    if (openModal === modal) setOpenModal('')
    else setOpenModal(modal)
  }

  const guestsToShow = ''


  function guestSummary() {
    const labelMap = {
      adults: ['Adult', 'Adults'],
      children: ['Child', 'Children'],
      infants: ['Infant', 'Infants'],
      pet: ['Pet', 'Pets']
    };

    return Object.entries(guest)
      .filter(([_, count]) => count > 0)
      .map(([key, count]) => {
        const [singular, plural] = labelMap[key]
        const label = count === 1 ? singular : plural
        return `${count} ${label}`
      })
      .join(', ')
  }



  const isAnyInputActive = openModal ? true : false

  return (
    <section className={'stay-filter ' + (isAnyInputActive ? 'open' : '')}>
      <div className={'input-section flex column ' + (openModal === 'search' ? 'active' : '')}
        onClick={() => openFilterModal('search')}>
        <label>Where</label>
        <input
          type="text"
          name="txt"
          value={location}
          placeholder="Search Destinations"
          onChange={handleChange}
          required
        />
      </div>

      <div className={'input-section flex column ' + (openModal === 'calenderCheckIn' ? 'active' : '')}
        onClick={() => openFilterModal('calenderCheckIn')}>
        <label>
          Check in
        </label>
        <p className={range[0].startDate ? 'chosen-value' : ''}>{range[0].startDate ? formatRangeDates(range[0].startDate) : 'Add dates'}</p>
      </div>

      <div className={'input-section flex column ' + (openModal === 'calenderCheckOut' ? 'active' : '')}
        onClick={() => openFilterModal('calenderCheckOut')}>
        <label>
          Check out
        </label>
        <p className={range[0].startDate ? 'chosen-value' : ''}>{range[0].endDate ? formatRangeDates(range[0].endDate) : 'Add dates'}</p>
      </div>


      <div className={'input-section flex column ' + (openModal === 'guests' ? 'active' : '')}
        onClick={() => openFilterModal('guests')}>
        <label>
          Who
        </label>
        <p className={guest ? 'chosen-value' : ''}>{guest ? guestSummary() : 'Add guests'}</p>
      </div>

      <button className="search-btn">{searchSvg}</button>


      {openModal === 'guests' && <AddGuests setGuest={setGuest} />}
      {openModal === 'search' && <SearchDes setLocation={setLocation} setOpenModal={setOpenModal} />}
      {(openModal === 'calenderCheckIn' || openModal === 'calenderCheckOut') && <FilterCalender range={range} setRange={setRange} setOpenModal={setOpenModal} openModal={openModal} />}

    </section>
  )
}
