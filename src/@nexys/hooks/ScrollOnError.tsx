import { useFormikContext } from 'formik'
import { useEffect, useRef } from 'react'
import usePreviousValue from '@nexys/hooks/usePreviousValue/usePreviousValue'

function scrollToView(element, offset) {
  const bodyRect = document.body.getBoundingClientRect().top
  const elementRect = element.getBoundingClientRect().top
  const elementPosition = elementRect - bodyRect
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}
function ScrollOnError({ refForm }: any) {
  const { errors, submitCount } = useFormikContext()
  const mapError = useRef({})
  const prevSubmitCount = usePreviousValue(submitCount || 0)
  const isError = Object.keys(errors).length > 0

  useEffect(() => {
    if (
      (submitCount > prevSubmitCount && isError) ||
      (submitCount > 0 && !mapError.current[submitCount] && isError)
    ) {
      mapError.current[submitCount] = true
      const el = document.getElementById('errorFormik')

      scrollToView(el || refForm, 100)
    }
  }, [submitCount, isError])

  return null
}

export default ScrollOnError
