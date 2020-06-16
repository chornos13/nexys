import React from 'react'
import { Radio } from 'antd'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'

class ComField extends React.Component {
  handleChange = (e) => {
    const { field, form } = this.props
    const { name } = field
    form.setFieldValue(name, e.target.value)
  }

  render() {
    const { className, style, form, field, ...props } = this.props
    return (
      <Radio.Group
        className={cx(className, cssFont.normal)}
        {...props}
        {...field}
        style={{
          width: '100%',
          ...style,
        }}
        onChange={this.handleChange}
      />
    )
  }
}

export default withTitleAndError(ComField)
