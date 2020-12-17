import React from 'react'
import { Input } from 'antd'
import { InputProps } from 'antd/lib/input'
import { FormikContextType, useField } from 'formik'
import useTitleAndError, {
  UseTitleAndErrorProps,
} from 'fields/useTitleAndError/useTitleAndError'

type FInputProps<Values> = InputProps &
  UseTitleAndErrorProps & {
    formik?: FormikContextType<Values>
  }

function FInput<Values extends object>(props: FInputProps<Values>) {
  const [field] = useField(props as any)
  const [title, error] = useTitleAndError(props)

  return (
    <React.Fragment>
      {title}
      <Input {...field} {...props} />
      {error}
    </React.Fragment>
  )
}

export default FInput
