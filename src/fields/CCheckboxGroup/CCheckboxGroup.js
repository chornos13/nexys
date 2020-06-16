import React from 'react'
import { Checkbox } from 'antd'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCCheckboxGroup from './CCheckboxGroup.module.scss'

const ComField = (formikProps) => {
  const { field, className, style, form, options, ...props } = formikProps
  const { name } = field
  return (
    <Checkbox.Group
      className={cx(className, cssCCheckboxGroup.customFont)}
      options={options}
      {...props}
      {...field}
      style={{
        width: '100%',
        ...style,
      }}
      onChange={(value) => {
        console.log(value)
        form.setFieldValue(name, value)
      }}
    />
  )
}

export default withTitleAndError(ComField)
