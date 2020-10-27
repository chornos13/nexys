import React from 'react'
import Content, { ContentProps } from 'components/Layout/Content'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssHeader from './Header.module.scss'

function RawHeader(props) {
  const { children, ...otherProps } = props
  return <header {...otherProps}>{children}</header>
}

RawHeader.propTypes = {
  children: PropTypes.node,
}

interface HeaderProps extends ContentProps {}

function Header(props: HeaderProps) {
  const { children, ...otherProps } = props
  return (
    <Content
      classNameContainer={cx(cssHeader.container)}
      className={cx(cssHeader.header)}
      component={RawHeader}
      isComponentContainer
      {...otherProps}
    >
      {children}
    </Content>
  )
}

export default Header
