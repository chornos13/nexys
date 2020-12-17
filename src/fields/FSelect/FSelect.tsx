import React from 'react'
import { SelectProps, SelectValue } from 'antd/lib/select'
import useTitleAndError, {
  UseTitleAndErrorProps,
} from 'fields/useTitleAndError/useTitleAndError'
import { useField } from 'formik'
import { Select } from 'antd'

type FSelectProps<VT extends SelectValue = SelectValue> = SelectProps<VT> &
  UseTitleAndErrorProps

function FSelect(props: FSelectProps) {
  const [field, , helpers] = useField(props as any)
  const [title, error] = useTitleAndError(props)
  return (
    <React.Fragment>
      {title}
      <Select
        {...field}
        onBlur={() => {
          helpers.setTouched(true)
        }}
        onClear={() => {
          helpers.setTouched(true)
        }}
        onChange={(value) => {
          helpers.setValue(value)
        }}
        {...props}
      />
      {error}
    </React.Fragment>
  )
}

export default FSelect
