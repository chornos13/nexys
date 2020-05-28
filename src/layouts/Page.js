import React from 'react'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssPage from './Page.scss'

function Main(props) {
  const { children, ...comProps } = props
  return (
    <main
      className={cx(cssPage.container)}
      style={{
        height: '100%',
      }}
      {...comProps}
    >
      {children}
    </main>
  )
}

Main.propTypes = {
  children: PropTypes.node,
}

export default Main
