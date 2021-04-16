import { useEffect, useRef } from 'react'

// source: beautiful-react-hooks

/**
 * On each render returns the previous value of the given variable/constant.
 */
function usePreviousValue<T>(value: T) {
  const prevValue = useRef<T>()

  useEffect(() => {
    prevValue.current = value

    return () => {
      prevValue.current = undefined
    }
  })

  return prevValue.current
}

export default usePreviousValue
