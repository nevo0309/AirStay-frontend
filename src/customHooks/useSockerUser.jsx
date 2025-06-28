import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socketUser } from '../services/socket.service'

export function useSocketUser() {
  const userId = useSelector(s => s.userModule.user?._id)

  useEffect(() => {
    if (!userId) return
    socketUser.set(userId)
    return () => socketUser.unset()
  }, [userId])
}
