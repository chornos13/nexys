import React from 'react'
import { Input } from 'antd'
import cx from 'shortcuts/cx'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cssInput from './CInput.module.scss'

const ComField = (formikProps) => {
  const { field, className, Module, form, isNumberOnly, ...props } = formikProps

  const { onChange } = field

  function handleNumber(e) {
    const { name, value } = e.target

    const sanitizedValue = value
      .toString()
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1')

    form.setFieldValue(
      name,
      sanitizedValue ? Number.parseInt(sanitizedValue, 0) : sanitizedValue,
    )
  }

  return (
    <Module
      onPressEnter={form.handleSubmit}
      className={cx(cssInput.containerInput, cssFont.normal, className)}
      {...field}
      {...props}
      onChange={isNumberOnly ? handleNumber : onChange}
    />
  )
}

ComField.defaultProps = {
  Module: Input,
}

export default withTitleAndError(ComField)
