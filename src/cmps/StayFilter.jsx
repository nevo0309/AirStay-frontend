import { useState, useEffect } from 'react'

export function StayFilter({ filterBy, onSetFilterBy,onToggleCalendar}) {
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))


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



  return (
    <section className="stay-filter">
      <div className='input-section flex column'>
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


      <div className='input-section flex column' >
        <label>
          Who
        </label>

        <input
          type="txt"
          name="who"
          // value={filterToEdit.minSpeed}
          placeholder="Add guests"
          onChange={handleChange}
          required
        />
      </div>





      {/* <button className="btn-clear" onClick={clearFilter}>
        Clear
      </button>
      <h3>Sort:</h3> */}
      {/* <div className="sort-field">
        <label>
          <span>Speed</span>
          <input
            type="radio"
            name="sortField"
            value="speed"
            checked={filterToEdit.sortField === 'speed'}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Vendor</span>
          <input
            type="radio"
            name="sortField"
            value="vendor"
            checked={filterToEdit.sortField === 'vendor'}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Owner</span>
          <input
            type="radio"
            name="sortField"
            value="owner"
            checked={filterToEdit.sortField === 'owner'}
            onChange={handleChange}
          />
        </label>
      </div> */}
      {/* <div className="sort-dir">
        <label>
          <span>Asce</span>
          <input
            type="radio"
            name="sortDir"
            value="1"
            checked={filterToEdit.sortDir === 1}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Desc</span>
          <input
            type="radio"
            name="sortDir"
            value="-1"
            onChange={handleChange}
            checked={filterToEdit.sortDir === -1}
          />
        </label>
      </div> */}
      {/* <button className="btn-clear" onClick={clearSort}>
        Clear
      </button> */}
    </section>
  )
}
