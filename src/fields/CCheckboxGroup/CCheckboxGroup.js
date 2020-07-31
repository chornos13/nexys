import React from 'react'
import { Checkbox } from 'antd'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCCheckboxGroup from './CCheckboxGroup.module.scss'

const ComField = (formikProps) => {
  const {
    field,
    className,
    style,
    form,
    options,
    direction,
    isNoContainer,
    ...props
  } = formikProps
  const { name } = field
  if (isNoContainer)
    return (
      <Checkbox.Group
        className={cx(
          className,
          cssFont.normal,
          cssCCheckboxGroup[`${direction || 'horizontal'}`],
        )}
        options={options || []}
        {...props}
        {...field}
        style={{ ...style }}
        onChange={(value) => {
          form.setFieldValue(name, value)
        }}
      />
    )
  return (
    <Checkbox.Group
      className={cx(
        cssCCheckboxGroup.customFont,
        cssCCheckboxGroup.customCheckbox,
        className,
      )}
      options={options || []}
      {...props}
      {...field}
      style={{
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
