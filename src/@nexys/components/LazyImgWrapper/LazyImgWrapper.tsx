import React from 'react'
import LazyLoad, { LazyLoadProps } from 'react-lazyload'

function LazyImgwrapper(props: LazyLoadProps) {
  const { style, ...restProps } = props
  return (
    <LazyLoad
      once
      style={{ display: 'inline-block', ...style }}
      {...restProps}
    />
  )
}

export default LazyImgwrapper
