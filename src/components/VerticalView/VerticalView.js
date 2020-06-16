import React from 'react'
import cx from 'shortcuts/cx'
import cssVerticalView from 'components/VerticalView/VerticalView.module.scss'
import PropTypes from 'shortcuts/PropTypes'

function VerticalView(props) {
  const { children, flexGrow, style, className } = props
  return (
    <div
      className={cx(cssVerticalView.container, className)}
      style={{
        flexGrow,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

VerticalView.propTypes = {
  children: PropTypes.node,
  flexGrow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
}

export default VerticalView
