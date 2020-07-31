import React from 'react'
import { Select } from 'antd'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCSelect from 'fields/CSelect/CSelect.module.scss'
import IconDownOutlined from 'icons/IconDownOutlined'
import { LoadingOutlined } from '@ant-design/icons'

const ComField = (formikProps) => {
  const {
    field,
    className,
    style,
    form,
    dropdownClassname,
    onAfterChange,
    loading,
    mode,
    options,
    labelInValue,
    ...props
  } = formikProps
  const { name } = field

  const isMultiple = mode === 'multiple'
  const isSingle = !['multiple', 'tags'].includes(mode)
  return (
    <Select
      className={cx(
        cssCSelect.containerSelect,
        { [cssCSelect.marginInput]: !isMultiple },
        className,
      )}
      suffixIcon={
        loading ? (
          <LoadingOutlined style={{ color: 'black' }} />
        ) : (
          <IconDownOutlined />
        )
      }
      dropdownClassName={cx(cssCSelect.dropdown, dropdownClassname)}
      {...field}
      loading={loading}
      mode={mode}
      options={options}
      style={{
        width: '100%',
        ...style,
      }}
      labelInValue={labelInValue}
      onBlur={() => {
        form.setFieldTouched(name, true)
      }}
      onChange={(v) => {
        const value = isSingle ? [v] : v
        let data
        if (labelInValue) {
          const findValue = value.map((x) =>
            options.find((i) => i.value === x.value),
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
      {...props}
    />
  )
}

export default withTitleAndError(ComField)
