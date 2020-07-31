import React from 'react'
import { Select } from 'antd'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCMultiSelect from 'fields/CMultiSelect/CMultiSelect.module.scss'
import { PlusSquareOutlined } from '@ant-design/icons'

const ComField = (formikProps) => {
  const {
    field,
    className,
    style,
    form,
    onClick,
    dropdownClassname,
    onIconClick,
    options,
    labelInValue,
    onAfterChange,
    ...props
  } = formikProps
  const { name } = field

  const dropdownProps =
    onClick || onIconClick
      ? {
          dropdownRender: () => {
            return null
          },
          dropdownStyle: {
            boxShadow: 'none',
          },
        }
      : {}

  const isSingle = !['multiple', 'tags'].includes('multiple')

  const curOptions = options || field.value
  return (
    <Select
      className={cx(cssCMultiSelect.containerSelect, className)}
      dropdownClassName={cx(
        cssCMultiSelect.dropdown,
        {
          [cssCMultiSelect.displayNone]: onClick || onIconClick,
        },
        dropdownClassname,
      )}
      {...props}
      {...field}
      style={{
        width: '100%',
        ...style,
      }}
      suffixIcon={
        <PlusSquareOutlined onClick={onIconClick} style={{ fontSize: 18 }} />
      }
      mode={'multiple'}
      options={curOptions}
      labelInValue={labelInValue}
      showArrow
      onBlur={() => {
        form.setFieldTouched(name, true)
      }}
      onChange={(v) => {
        const value = isSingle ? [v] : v
        let data
        if (labelInValue) {
          const findValue = value.map((x) =>
            (curOptions || v).find((i) => i.value === x.value),
          )

          data = isSingle ? findValue[0] : findValue
        } else {
          data = isSingle ? value[0] : value
        }

        form.setFieldValue(name, data)

        if (onAfterChange) {
          onAfterChange(data)
        }
      }}
      onClick={onClick}
      {...dropdownProps}
    />
  )
}

export default withTitleAndError(ComField)
