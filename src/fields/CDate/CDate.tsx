import React from 'react'
import { DatePicker } from 'antd'
import { DatePickerProps } from 'antd/lib/date-picker'
import cx from 'shortcuts/cx'
import { FieldProps } from 'formik'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cssDate from 'fields/CDate/CDate.module.scss'
import moment from 'moment'

type DateFieldProps = DatePickerProps & FieldProps

const ComField = (formikProps: DateFieldProps) => {
  const { field, className, form, ...props } = formikProps

  return (
    <DatePicker
      className={cx(cssDate.container, className)}
      {...field}
      {...props}
      onChange={(date, dateString) => {
        form.setFieldValue(
          field.name,
          dateString ? moment(new Date(dateString)) : '',
        )
      }}
      value={field.value}
    />
  )
}

export default withTitleAndError(ComField)
