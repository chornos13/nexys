import { useState } from 'react'

function useStoredToken(fnNoToken) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue] = useState(() => {
    try {
      // Get from local storage by key
      const token = window.localStorage.getItem('token')
      // Parse stored json or if none return initialValue

      if (!token && fnNoToken) {
        fnNoToken()
      }

      return token
    } catch (error) {
      // If error also return initialValue
      // console.log(error)
      // return error
    }
  })

  return storedValue
}

export default useStoredToken
