import React, { CSSProperties } from 'react'
import { connect, FormikContextType, getIn } from 'formik'
import { get } from 'lodash'
import CastPath from '@nexys/fields/ErrorView/CastPath'

function isString(str) {
  return typeof str === 'string' || str instanceof String
}

function isTouch(props) {
  const touch = getIn(props.formik.touched, props.name)
  if (touch === undefined) {
    const path = CastPath.stringToPath(props.name)
    if (path.length >= 3) {
      const pathArray = path.slice(0, path.length - 2)
      const pathBoolean = path.slice(0, path.length - 1)
      const isArrayValue = Array.isArray(
        get(props.formik.touched, pathArray.join('.'), null),
      )
      if (isArrayValue) {
        return getIn(props.formik.touched, pathBoolean)
      }
    }
  }
  return touch
}

interface ErrorViewProps {
  name: string
  // eslint-disable-next-line react/forbid-prop-types
  style?: CSSProperties
  formik?: FormikContextType<any>
}

function ErrorView(props: ErrorViewProps) {
  const { name, formik, style } = props

  const error = getIn(formik.errors, name)
  const touch = isTouch(props)
  if (!isString(error)) {
    return <React.Fragment />
  }

  const isShowError = error && touch

  return (
    <div
      id={'errorFormik'}
      style={{ color: 'red', ...(style || { marginTop: isShowError ? 5 : 0 }) }}
    >
      {isShowError ? error : null}
    </div>
  )
}

export default connect(ErrorView)
