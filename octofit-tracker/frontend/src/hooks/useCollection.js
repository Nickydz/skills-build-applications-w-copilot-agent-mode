import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

export function useCollection(resource, endpoint) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchCollection(resource, endpoint)
      .then((nextItems) => {
        if (!active) return
        setItems(nextItems)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (!active) return
        setError(requestError.message)
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [resource, endpoint])

  return { items, status, error }
}
