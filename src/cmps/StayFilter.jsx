import { useState, useEffect } from 'react'
import { searchSvg } from '../../data/svgExport'
import { AddGuests } from './AddGuests'
import { SearchDes } from './SearchDes'
import { FilterCalender } from './calender/FilterCaleder.jsx'

export function StayFilter({ filterBy, onSetFilterBy, onToggleCalendar }) {
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
  const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(false)
  const [isSearchDesOpen, setIsSearchDesOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
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

  function onToggleAddGuests() {
    setIsSearchDesOpen(false)
    setIsCalendarOpen(false)
    setIsAddGuestsOpen(!isAddGuestsOpen)
  }
  function onToggleSearchDes() {
    setIsAddGuestsOpen(false)
    setIsCalendarOpen(false)
    setIsSearchDesOpen(!isSearchDesOpen)
  }
  function onToggleCalendar() {
    setIsAddGuestsOpen(false)
    setIsSearchDesOpen(false)
    setIsCalendarOpen(!isCalendarOpen)
  }

  const isAnyInputActive = isAddGuestsOpen || isCalendarOpen || isSearchDesOpen ? true : false

  return (
    <section className={'stay-filter ' + (isAnyInputActive ? 'open': '')}>
      <div className={'input-section flex column ' + (isSearchDesOpen ? 'active' : '')} onClick={onToggleSearchDes}>
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

      <div className={'input-section flex column ' + (isCalendarOpen ? 'active' : '')} onClick={onToggleCalendar}>
        <label>
          Check in
        </label>
        <p>Add dates</p>
      </div>

      <div className='input-section flex column' onClick={onToggleCalendar}>
        <label>
          Check out
        </label>
        <p>Add dates</p>
      </div>


      <div className={'input-section flex column ' + (isAddGuestsOpen ? 'active' : '')} onClick={onToggleAddGuests}>
        <label>
          Who
        </label>
        <p>Add guests</p>
      </div>

      <button className="search-btn">{searchSvg}</button>


      {isAddGuestsOpen && <AddGuests />}
      {isSearchDesOpen && <SearchDes />}
      {isCalendarOpen && <FilterCalender />}

    </section>
  )
}
