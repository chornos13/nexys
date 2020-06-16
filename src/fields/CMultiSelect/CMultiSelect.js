import React from 'react'
import { Select } from 'antd'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCSelect from 'fields/CMultiSelect/CMultiSelect.module.scss'
import { PlusSquareOutlined } from '@ant-design/icons'

const ComField = (formikProps) => {
  const {
    field,
    className,
    style,
    form,
    onClick,
    dropdownClassname,
    ...props
  } = formikProps
  const { name } = field

  const dropdownProps = onClick
    ? {
        dropdownRender: () => {
          return null
        },
        dropdownStyle: {
          boxShadow: 'none',
        },
      }
    : {}

  return (
    <Select
      className={cx(cssCSelect.containerSelect, className)}
      dropdownClassName={cx(cssCSelect.dropdown, dropdownClassname)}
      {...props}
      {...field}
      style={{
        width: '100%',
        ...style,
      }}
      suffixIcon={<PlusSquareOutlined style={{ fontSize: 18 }} />}
      mode={'multiple'}
      showArrow
      onChange={(value) => {
        form.setFieldValue(name, value)
      }}
      onClick={onClick}
      {...dropdownProps}
    />
  )
}

export default withTitleAndError(ComField)
