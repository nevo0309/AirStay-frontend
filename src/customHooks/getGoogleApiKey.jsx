// useGoogleMapsKey.js
import { useEffect, useState } from 'react'
import { stayService } from '../services/stay/stay.service.remote'

export function getGoogleApiKey() {
  const [key, setKey] = useState(null)

  useEffect(() => {
    stayService
      .getGoogleApi()
      .then(setKey)
      .catch(err => console.error('Cannot load Google key', err))
  }, [])

  return key
}
