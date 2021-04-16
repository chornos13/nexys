import { useFormikContext } from 'formik'
import usePreviousValue from '@nexys/hooks/usePreviousValue/usePreviousValue'
import { useEffect } from 'react'
import { set, isObject } from 'lodash'

function FormikTouchErrorAfterSubmit() {
  const { errors, submitCount, touched, setTouched } = useFormikContext()
  const prevSubmitCount = usePreviousValue(submitCount)
  const lengthError = Object.keys(errors).length
  const isError = lengthError > 0
  function reduceObject(acc, curVal) {
    const [key, val] = curVal
    if (isObject(val)) {
      Object.entries(val)
        .map(([xkey, xval]) => [[key, xkey].join('.'), xval])
        .reduce(reduceObject, acc)
    } else {
      set(acc, key, true)
    }
    return acc
  }

  useEffect(() => {
    if (submitCount > prevSubmitCount && isError) {
      const curTouched = {
        ...touched,
        ...Object.entries(errors).reduce(reduceObject, {}),
      }
      setTouched(curTouched, false)
    }
  }, [submitCount, isError, lengthError])

  return null
}

export default FormikTouchErrorAfterSubmit
