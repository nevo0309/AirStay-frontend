import { useState, useEffect } from 'react'
import { searchSvg } from '../../data/svgExport'
import { AddGuests } from './AddGuests'
import { SearchDes } from './SearchDes'
import { FilterCalender } from './calender/FilterCaleder.jsx'

export function StayFilter({ filterBy, onSetFilterBy }) {
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))

  const [openModal, setOpenModal] = useState('')
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


  const isAnyInputActive = openModal ? true : false

  return (
    <section className={'stay-filter ' + (isAnyInputActive ? 'open' : '')}>
      <div className={'input-section flex column ' + (openModal === 'search' ? 'active' : '')}
        onClick={() => openFilterModal('search')}>
        <label>Where</label>
        <input
          type="text"
          name="txt"
          // value={filterToEdit.txt}
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
        <p>Add dates</p>
      </div>

      <div className={'input-section flex column ' + (openModal === 'calenderCheckOut' ? 'active' : '')}
        onClick={() => openFilterModal('calenderCheckOut')}>
        <label>
          Check out
        </label>
        <p>Add dates</p>
      </div>


      <div className={'input-section flex column ' + (openModal === 'guests' ? 'active' : '')}
        onClick={() => openFilterModal('guests')}>
        <label>
          Who
        </label>
        <p>Add guests</p>
      </div>

      <button className="search-btn">{searchSvg}</button>


      {openModal === 'guests' && <AddGuests />}
      {openModal === 'search' && <SearchDes />}
      {(openModal === 'calenderCheckIn' || openModal === 'calenderCheckOut') && <FilterCalender />}

    </section>
  )
}
