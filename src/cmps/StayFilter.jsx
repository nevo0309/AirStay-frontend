import { useState, useEffect } from 'react'
import { searchSvg } from '../../data/svgExport'
import { AddGuests } from './AddGuests'
import { SearchDes } from './SearchDes'

export function StayFilter({ filterBy, onSetFilterBy, onToggleCalendar }) {
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
  const [isAddGuestsOpen, setIsAddGuestsOpen] = useState(false)
  const [isSearchDesOpen, setIsSearchDesOpen] = useState(false)

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
    setIsAddGuestsOpen(!isAddGuestsOpen)
  }
  function onToggleSearchDes() {
    setIsSearchDesOpen(!isSearchDesOpen)
  }


  return (
    <section className="stay-filter">
      <div className='input-section flex column' onClick={onToggleSearchDes}>
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

      <div className='input-section flex column' onClick={onToggleCalendar}>
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


      <div className='input-section flex column' onClick={onToggleAddGuests}>
        <label>
          Who
        </label>
        <p>Add guests</p>
      </div>

      <button className="search-btn">{searchSvg}</button>


      {isAddGuestsOpen && <AddGuests />}
      {isSearchDesOpen && <SearchDes />}

    </section>
  )
}
