import React from 'react'
import cssVerticalContainer from 'components/VerticalContainer/VerticalContainer.module.scss'
import cx from 'shortcuts/cx'

function VerticalContainer(props) {
  const { children } = props
  return (
    <div className={cx(cssVerticalContainer.container)} {...props}>
      {children}
    </div>
  )
}

export default VerticalContainer
