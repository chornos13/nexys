import React from 'react'
import PropTypes from 'shortcuts/PropTypes'

function Block(props) {
  const { size, end, start, center, children, style, ...extraProps } = props

  return (
    <div
      style={{
        marginLeft: (end || center) && 'auto',
        marginRight: (start || center) && 'auto',
        maxWidth: size,
        ...style,
      }}
      {...extraProps}
    >
      {children}
    </div>
  )
}

Block.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  end: PropTypes.bool,
  start: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

export default Block
