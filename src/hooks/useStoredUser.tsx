import { useState } from 'react'

function useStoredUser() {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue] = useState(() => {
    try {
      // Get from local storage by key
      const user = window.localStorage.getItem('data_user')
      // Parse stored json or if none return initialValue

      return JSON.parse(user)
    } catch (error) {
      // If error also return initialValue
      // console.log(error)
      // return error
    }
  })

  return storedValue
}

export default useStoredUser
