import React from 'react'
import { ButtonProps } from 'antd/lib/button/button'
import { Button as CurButton } from 'antd'
import cx from 'shortcuts/cx'
import cssButton from 'components/Button/Button.module.scss'

class Button extends React.Component<ButtonProps> {
  render() {
    const { className } = this.props

    return (
      <CurButton className={cx(cssButton.button, className)} {...this.props} />
    )
  }
}

export default Button
