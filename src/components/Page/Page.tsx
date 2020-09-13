import React from 'react'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssPage from 'components/Page/Page.module.scss'

function Page(props) {
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

Page.propTypes = {
  children: PropTypes.node,
}

export default Page
