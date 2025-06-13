import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadStays, removeStay, addStay, updateStay } from '../store/stay.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay'
import { StayList } from '../cmps/StayList'
import { StayListSkeleton } from '../cmps/carousel/StayListSkeleton'

export function StayIndex({ isStayFilterOpen }) {
  // const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter())

  const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
  const [loading, setLoading] = useState(true)

  const stays = useSelector(storeState => storeState.stayModule.stays)

  console.log(filterBy)
  useEffect(() => {
    async function fetch() {
      setLoading(true)
      try {
        await loadStays(filterBy)
      } catch (err) {
        console.error('Could not load stays', err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [filterBy])

  function onSetFilterBy(updatedFilter) {
    setFilterBy(prev => ({ ...prev, ...updatedFilter }))
  }

  async function onRemoveStay(stayId) {
    try {
      await removeStay(stayId)
      showSuccessMsg('Stay removed')
    } catch {
      showErrorMsg('Cannot remove stay')
    }
  }

  // async function onAddStay() {
  //   const stay = stayService.getEmptyStay()

  //   try {
  //     const saved = await addStay(stay)
  //     showSuccessMsg(`Stay added (id: ${saved._id})`)
  //   } catch {
  //     showErrorMsg('Cannot add stay')
  //   }
  // }

  async function onUpdateStay(stay) {
    const speed = +prompt('New speed?', stay.speed)
    if (!speed) return
    try {
      const saved = await updateStay({ ...stay, speed })
      showSuccessMsg(`Stay updated, new speed: ${saved.speed}`)
    } catch {
      showErrorMsg('Cannot update stay')
    }
  }

  return (
    <main className={'stay-index ' + (isStayFilterOpen ? '' : 'after-closed-header')}>
      {loading ? (
        <StayListSkeleton />
      ) : (
        <StayList stays={stays} onRemoveStay={onRemoveStay} onUpdateStay={onUpdateStay} />
      )}
    </main>
  )
}
