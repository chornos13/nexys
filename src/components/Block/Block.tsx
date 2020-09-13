import React, { CSSProperties, ReactNode } from 'react'
import Media from 'react-media'
import util from 'components/Block/util'

const queries = {
  xs: '(max-width: 576px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

interface BlockProps {
  defaultSize?: string | number
  size?: string | number | object
  end?: boolean
  start?: boolean
  center?: boolean
  autoSize?: boolean
  children: ReactNode
  // eslint-disable-next-line react/forbid-prop-types
  style?: CSSProperties
}

function Block(props: BlockProps) {
  const {
    size,
    end,
    start,
    center,
    defaultSize,
    autoSize,
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
              display: autoSize ? 'table' : undefined,
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

export default Block
