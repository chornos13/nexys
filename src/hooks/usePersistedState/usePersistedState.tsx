import { useEffect, useState } from 'react'

function usePersistedState<T = any>(key: string, defaultValue: any) {
  const [isLoading, setIsLoading] = useState(true)
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const persistedValue = localStorage.getItem(key)
    if (![null, undefined].includes(persistedValue)) {
      let savedValue
      try {
        savedValue = JSON.parse(persistedValue)
      } catch (e) {
        savedValue = persistedValue
      }
      setValue(savedValue)
    }
    setIsLoading(false)
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue, isLoading] as const
}

export default usePersistedState
