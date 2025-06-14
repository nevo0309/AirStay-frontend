import { useState, useEffect, useRef } from 'react'
import { searchSvg } from '../../data/svgExport'
import { AddGuests } from './AddGuests'
import { SearchDes } from './SearchDes'
import { FilterCalender } from './calender/FilterCaleder.jsx'
import { setFilterBy } from '../store/stay.actions.js'
import { useSelector } from 'react-redux'
import { gu } from 'date-fns/locale'

export function StayFilter() {
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
  const [openModal, setOpenModal] = useState('')
  const [locationToSearch, setLocationToSearch] = useState('')
  const [guest, setGuest] = useState('')

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ])
  
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
    // setFilterByToEdit({ ...filterByToEdit, [field]: value })
  }

  function openFilterModal(modal) {
    if (openModal === modal) setOpenModal('')
    else setOpenModal(modal)
  }


  function handleSelect(ranges) {
    const { startDate, endDate } = ranges.selection;
    const currentStart = range[0].startDate;
    const currentEnd = range[0].endDate;

    if (!currentStart || (currentStart && !currentEnd)) {
      // Initial selection or selecting the end date
      setRange([{
        ...range[0],
        startDate,
        endDate: startDate === endDate ? null : endDate,
      }])
    } else {
      // If user clicks a new date AFTER current start date, update endDate
      if (startDate > currentStart) {
        setRange([{
          ...range[0],
          startDate: currentStart,
          endDate: startDate,
        }])
      } else {
        // If clicked date is before or same as current start, treat it as a new start
        setRange([{
          startDate,
          endDate: null,
          key: 'selection',
        }])
      }
    }
  }


  function guestSummary() {
    const labelMap = {
      guests: ['guest', 'guests'],
      infants: ['infant', 'infants'],
      pet: ['pet', 'pets']
    };

    const totalGuests = (guest.adults) + (guest.children)
    const totalGuestsSummary = [];

    if (totalGuests > 0) {
      const [singular, plural] = labelMap.guests;
      const label = totalGuests === 1 ? singular : plural
      totalGuestsSummary.push(`${totalGuests} ${label}`)
    }

    ['infants', 'pet'].forEach((key) => {
      const count = guest[key] || 0
      if (count > 0) {
        const [singular, plural] = labelMap[key];
        const label = count === 1 ? singular : plural;
        totalGuestsSummary.push(`${count} ${label}`);
      }
    });

    return totalGuestsSummary.join(', ')
  }


  function onSearchFilter(){
    openFilterModal('')
    setFilterBy({location: locationToSearch ,checkIn:range[0].startDate ,checkOut:range[0].endDate,guest })
  }


  const isAnyInputActive = openModal ? true : false

 
  return (
    <section className={'stay-filter ' + (isAnyInputActive ? 'open' : '')}>
      <div className={'input-section flex column ' + (openModal === 'search' ? 'active' : '')}
        onClick={() => openFilterModal('search')}>
        <label>Where</label>
        <input
          type="text"
          name="location"
          value={locationToSearch}
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

      <button className="search-btn" onClick={onSearchFilter}>{searchSvg}</button>


      {openModal === 'guests' && <AddGuests setGuest={setGuest} />}
      {openModal === 'search' && <SearchDes setLocation={setLocation} setOpenModal={setOpenModal} />}
      {(openModal === 'calenderCheckIn' || openModal === 'calenderCheckOut') && <FilterCalender range={range} setRange={handleSelect} setOpenModal={setOpenModal} openModal={openModal} />}
      {openModal === 'search' && <SearchDes setLocation={setLocationToSearch} setOpenModal={setOpenModal} />}
      {(openModal === 'calenderCheckIn' || openModal === 'calenderCheckOut') && <FilterCalender range={range} setRange={setRange} setOpenModal={setOpenModal} openModal={openModal} />}

    </section>
  )
}
