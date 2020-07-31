import React from 'react'
import { Select as AntSelect, Space } from 'antd'
import { SelectProps, SelectValue } from 'antd/lib/select'
import cx from 'shortcuts/cx'
import Text from 'components/Typography/Text'
import cssSelect from './Select.module.scss'

export interface CustomSelectProps extends SelectProps<SelectValue> {
  title?: string
}

function Select(props: CustomSelectProps) {
  const { className, dropdownClassName, title, ...otherProps } = props

  return (
    <Space size={8} direction={'vertical'} style={{ width: '100%' }}>
      {title && (
        /* @ts-ignore */
        <Text color={'#4F4F4F'}>{title}</Text>
      )}
      <AntSelect
        className={cx(cssSelect.select, className)}
        dropdownClassName={cx(cssSelect.dropdown, dropdownClassName)}
        {...otherProps}
      />
    </Space>
  )
}

export default Select
