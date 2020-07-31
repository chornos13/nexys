import React from 'react'
import { DatePicker, Space } from 'antd'
import cx from 'shortcuts/cx'
import Text from 'components/Typography/Text'
import { RangePickerProps } from 'antd/lib/date-picker'
import cssDate from './RangeDatePicker.module.scss'

const { RangePicker } = DatePicker

type IRangeDatePicker = RangePickerProps & {
  title?: React.ReactNode | string
}

function RangeDatePicker(props: IRangeDatePicker) {
  const { className, title, ...otherProps } = props

  return (
    <Space size={8} direction={'vertical'} style={{ width: '100%' }}>
      {title && (
        /* @ts-ignore */
        <Text color={'#4F4F4F'}>{title}</Text>
      )}
      <RangePicker className={cx(cssDate.custom, className)} {...otherProps} />
    </Space>
  )
}

export default RangeDatePicker
