/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Checkbox } from 'antd'
import { CheckboxProps } from 'antd/lib/checkbox'
import { FormikContextType, useField } from 'formik'
import useTitleAndError, {
  UseTitleAndErrorProps,
} from '@nexys/fields/useTitleAndError/useTitleAndError'
import Text from '@nexys/components/Typography/Text'

export type FCheckboxProps = CheckboxProps &
  UseTitleAndErrorProps & {
    /**
     * Formik Context
     */
    formik?: FormikContextType<any>
  }

function FCheckbox(props: FCheckboxProps) {
  const [field] = useField(props as any)
  const [, error] = useTitleAndError(props)

  return (
    <React.Fragment>
      <Checkbox {...field} {...props}>
        <Text style={{ lineHeight: '30px', fontWeight: 'bold' }}>
          {props.title}
        </Text>
      </Checkbox>
      {error}
    </React.Fragment>
  )
}

export default FCheckbox
