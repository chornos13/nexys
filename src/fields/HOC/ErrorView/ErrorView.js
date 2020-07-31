import React from 'react'
import { connect, getIn } from 'formik'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import CastPath from 'fields/HOC/ErrorView/CastPath'

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

function ErrorView(props) {
  const { name, formik, style } = props
  const error = getIn(formik.errors, name)
  const touch = isTouch(props)
  if (!isString(error)) {
    return <React.Fragment />
  }

  const isShowError = error && touch

  return (
    <div
      style={{ color: 'red', ...(style || { marginTop: isShowError ? 5 : 0 }) }}
    >
      {isShowError ? error : null}
    </div>
  )
}

ErrorView.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  formik: PropTypes.shape({
    errors: PropTypes.object,
  }),
}

export default connect(ErrorView)
