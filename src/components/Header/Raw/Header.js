import React from 'react'
import Content from 'components/Layout/Content'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssHeader from './Header.scss'

function RawHeader(props) {
  const { children, ...otherProps } = props
  return <header {...otherProps}>{children}</header>
}

RawHeader.propTypes = {
  children: PropTypes.node,
}

function Header(props) {
  const { children, ...otherProps } = props
  return (
    <Content
      className={cx(cssHeader.header)}
      component={RawHeader}
      isComponentContainer
      {...otherProps}
    >
      {children}
    </Content>
  )
}

Header.propTypes = {
  children: PropTypes.node,
}

export default Header
