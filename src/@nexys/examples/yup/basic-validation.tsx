import React, { useState } from 'react'
import * as yup from 'yup'
import { Modal } from 'antd'

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup
    .number()
    .required('umur wajib diisi') // for custom message just pass string to the function
    .positive()
    .typeError('inputan harus angka')
    .integer(),
  email: yup.string().email(),
  website: yup.string().url(),
})

function useInputForm(defaultValue?: string) {
  const [value, setValue] = useState(defaultValue)

  return {
    onChange: (e) => {
      const { value } = e.target
      setValue(value)
    },
    value,
  }
}

function BasiValidation() {
  const name = useInputForm('')
  const age = useInputForm('')
  const email = useInputForm('')
  const website = useInputForm('')

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <input placeholder={'Input name'} {...name} />
        <input placeholder={'Input age'} {...age} />
        <input placeholder={'Input email'} {...email} />
        <input placeholder={'Input website'} {...website} />
      </div>
      <button
        onClick={() => {
          try {
            const data = {
              name: name.value,
              age: age.value,
              email: email.value,
              website: website.value,
            }
            schema.validateSync(data, {
              abortEarly: false,
            })
            Modal.success({
              title: 'Success',
              content: (
                <div style={{ whiteSpace: 'pre-line' }}>
                  {JSON.stringify(data, null, 2)}
                </div>
              ),
            })
          } catch (e) {
            Modal.error({
              title: 'Error',
              content: (
                <div
                  style={{
                    whiteSpace: 'pre-line',
                  }}
                >
                  {`${e.errors.join('\r\n')}`}
                </div>
              ),
            })
          }
        }}
        type={'button'}
      >
        validation
      </button>
    </div>
  )
}

export const $metadata = {
  title: 'Basic Validation',
  description: 'this example show you how to use yup as validation',
}

export default BasiValidation
