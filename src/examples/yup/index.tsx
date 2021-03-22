import React from 'react'
import { Avatar } from 'antd'

export default {
  order: 7,
  title: (
    <React.Fragment>
      <Avatar
        style={{
          background: 'black',
        }}
        size={'small'}
      >
        Y
      </Avatar>
      &nbsp; Yup
    </React.Fragment>
  ),
  children:
    'Yup is a JavaScript schema builder for value parsing and validation. ' +
    'Define a schema, transform a value to match, ' +
    'validate the shape of an existing value, or both. ' +
    'Yup schema are extremely expressive and allow modeling complex, ' +
    'interdependent validations, or value transformations.',
  urlDocumentation: 'https://github.com/jquense/yup',
}
