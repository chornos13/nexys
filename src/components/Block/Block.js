import React from 'react'
import PropTypes from 'shortcuts/PropTypes'
import Media from 'react-media'
import util from './util'

const queries = {
  xs: '(max-width: 576px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

function Block(props) {
  const {
    size,
    end,
    start,
    center,
    defaultSize,
    children,
    style,
    ...extraProps
  } = props

  return (
    <Media queries={queries}>
      {(matches) => {
        return (
          <div
            style={{
              marginLeft: (util.getSize(matches, end) || center) && 'auto',
              marginRight: (start || center) && 'auto',
              maxWidth: util.getSize(matches, size) || defaultSize,
              ...style,
            }}
            {...extraProps}
          >
            {children}
          </div>
        )
      }}
    </Media>
  )
}

Block.propTypes = {
  defaultSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  end: PropTypes.bool,
  start: PropTypes.bool,
  center: PropTypes.bool,
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
}

export default Block
