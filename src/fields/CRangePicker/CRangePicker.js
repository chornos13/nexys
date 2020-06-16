import React from 'react'
import { DatePicker } from 'antd'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssFont from 'css/cssFont.scss'
import cssRange from './CRangePicker.module.scss'

const { RangePicker } = DatePicker
const ComField = (formikProps) => {
  const { field, className, style, form, ...props } = formikProps
  const { name } = field
  return (
    <RangePicker
      className={cx(cssRange.container, className, cssFont.normal)}
      {...props}
      {...field}
      style={{
        width: '100%',
        ...style,
      }}
      onChange={(value) => {
        form.setFieldValue(name, value)
      }}
    />
  )
}

export default withTitleAndError(ComField)
