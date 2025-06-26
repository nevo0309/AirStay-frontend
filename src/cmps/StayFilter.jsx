import { useState, useEffect, useRef } from 'react'
import { searchSvg } from '../../data/svgExport'
import { AddGuests } from './AddGuests'
import { SearchDes } from './SearchDes'
import { FilterCalender } from './calender/FilterCaleder.jsx'
import { setFilterBy } from '../store/stay.actions.js'
import { useSelector } from 'react-redux'
import { gu } from 'date-fns/locale'
import { useNavigate } from "react-router"
import { formatCalenderDate } from '../services/util.service.js'

export function StayFilter() {
  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  // const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
  const [openModal, setOpenModal] = useState('')
  const [locationToSearch, setLocationToSearch] = useState('')
  const [guest, setGuest] = useState('')
  const navigate = useNavigate()

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ])
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
    const { startDate, endDate } = ranges.selection
    const currentStart = range[0].startDate
    const currentEnd = range[0].endDate

    if (openModal === 'calenderCheckIn') {
      setRange([{
        startDate,
        endDate: currentEnd,
        key: 'selection',
      }])
    }

    if (openModal === 'calenderCheckOut') {
      if (currentStart >= endDate) {
        setRange([{
          startDate: currentStart,
          endDate: null,
          key: 'selection',
        }])

      } else {
        setRange([{
          startDate: currentStart,
          endDate,
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


  function onSearchFilter() {
    openFilterModal('')
    setFilterBy({ location: locationToSearch, checkIn: range[0].startDate, checkOut: range[0].endDate, guest })
    navigate('/search')
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
        <p className={range[0].startDate ? 'chosen-value' : ''}>{range[0].startDate ? formatCalenderDate(range[0].startDate) : 'Add dates'}</p>
      </div>

      <div className={'input-section flex column ' + (openModal === 'calenderCheckOut' ? 'active' : '')}
        onClick={() => openFilterModal('calenderCheckOut')}>
        <label>
          Check out
        </label>
        <p className={range[0].startDate ? 'chosen-value' : ''}>{range[0].endDate ? formatCalenderDate(range[0].endDate) : 'Add dates'}</p>
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
      {(openModal === 'calenderCheckIn' || openModal === 'calenderCheckOut') && <FilterCalender range={range} setRange={handleSelect} setOpenModal={setOpenModal} openModal={openModal} cmp={'header'} />}
      {openModal === 'search' && <SearchDes setLocation={setLocationToSearch} setOpenModal={setOpenModal} />}


    </section>
  )
}
