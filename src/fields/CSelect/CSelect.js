import React from 'react'
import { Select } from 'antd'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCSelect from 'fields/CSelect/CSelect.module.scss'
import { DownOutlined } from '@ant-design/icons'

const ComField = (formikProps) => {
  const {
    field,
    className,
    style,
    form,
    dropdownClassname,
    ...props
  } = formikProps
  const { name } = field
  return (
    <Select
      className={cx(cssCSelect.containerSelect, className)}
      suffixIcon={<DownOutlined />}
      dropdownClassName={cx(cssCSelect.dropdown, dropdownClassname)}
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
