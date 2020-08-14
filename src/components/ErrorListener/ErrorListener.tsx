import React, { useState } from 'react'
import { isEqual } from 'lodash'
import { useFormikContext } from 'formik'

// I'm not sure if errors are memoized by default
const defaultShouldTriggerErrors = (errors, nextErrors) =>
  !isEqual(errors, nextErrors)

export const ErrorListener = ({
  onError,
  shouldTriggerErrors: _shouldTriggerErrors,
}) => {
  const shouldTriggerErrors = _shouldTriggerErrors || defaultShouldTriggerErrors
  const formik = useFormikContext()
  const [errors, updateErrors] = useState(formik.errors)

  React.useEffect(() => {
    if (shouldTriggerErrors(errors, formik.errors)) {
      onError(formik.errors)

      updateErrors(errors)
    }
  }, [formik.errors])

  return null
}

export default ErrorListener
