import React from 'react'
import { Input } from 'antd'
import cx from 'shortcuts/cx'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cssInput from './CInput.module.scss'

const ComField = (formikProps) => {
  const { field, className, Module, form, ...props } = formikProps
  return (
    <Module
      onPressEnter={form.handleSubmit}
      className={cx(cssInput.containerInput, className, cssFont.normal)}
      {...field}
      {...props}
    />
  )
}

ComField.defaultProps = {
  Module: Input,
}

export default withTitleAndError(ComField)
