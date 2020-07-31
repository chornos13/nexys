import React from 'react'
import { Radio } from 'antd'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssRadio from 'fields/CRadio/CRadio.module.scss'
import { RadioGroupProps } from 'antd/lib/radio'
import { FieldProps } from 'formik'

interface CustomProps {
  direction?: 'vertical' | 'horizontal'
  onAfterChange?: (value) => void
}

type RadioGroupFieldProps = RadioGroupProps & FieldProps & CustomProps

function ComField(formikProps: RadioGroupFieldProps) {
  const {
    className,
    style,
    form,
    field,
    direction,
    onAfterChange,
    ...props
  } = formikProps

  const handleChange = (e) => {
    const { value } = e.target
    const { name } = field
    form.setFieldValue(name, value)
    if (onAfterChange) {
      onAfterChange(value)
    }
  }

  return (
    <Radio.Group
      className={cx(
        className,
        cssFont.normal,
        direction === 'vertical'
          ? cssRadio.customDirection
          : cssRadio.customRadio,
      )}
      {...props}
      {...field}
      style={{
        width: '100%',
        ...style,
      }}
      onChange={handleChange}
    />
  )
}

export default withTitleAndError(ComField)
