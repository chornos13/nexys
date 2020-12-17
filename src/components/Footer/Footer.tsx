import React from 'react'
import Content from 'components/Content/Content'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssFooter from './Footer.module.scss'

function RawFooter(props) {
  const { children, ...otherProps } = props
  return <footer {...otherProps}>{children}</footer>
}

RawFooter.propTypes = {
  children: PropTypes.node,
}

function Footer(props) {
  return (
    <Content className={cx(cssFooter.footer)} component={RawFooter} {...props}>
      Footer
    </Content>
  )
}

export default Footer
