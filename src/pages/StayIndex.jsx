import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadStays, loadStaysByCity, removeStay, updateStay } from '../store/stay.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

import { StayList } from '../cmps/StayList'
import { StayListSkeleton } from '../cmps/carousel/StayListSkeleton'

export function StayIndex({ isStayFilterOpen }) {
  const staysByCity = useSelector(s => s.stayModule.staysByCity)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cities = [
      'Eilat',
      'New York',
      'Barcelona',
      'Athens',
      'Budapest',
      'Rome',
      'Paris',
      'Haifa',
      'London',
      'Madrid',
    ]

    let done = 0 // how many requests finished

    cities.forEach(city =>
      loadStaysByCity(city).finally(() => {
        // this runs on success or failure
        done += 1 // mark one city as “done”
        if (done === cities.length) setLoading(false) // all 10 finished → hide skeleton
      })
    )
  }, [])

  return (
    <main className={'stay-index ' + (isStayFilterOpen ? '' : 'after-closed-header')}>
      {loading ? <StayListSkeleton /> : <StayList staysByCity={staysByCity} />}
    </main>
  )
}
