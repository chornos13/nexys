import React from 'react'
import FInput, { FInputProps } from 'fields/FInput/FInput'
// import { Formik, Form } from 'formik'
import { Story } from '@storybook/react'
import withFormik from 'storybook-formik'

const Template: Story<FInputProps> = (args) => <FInput {...args} />
//
// const FormikDecorator = (Story) => {
//   return (
//     <Formik
//       onSubmit={() => {}}
//       initialValues={{
//         anyFieldName: 'anyDefaultValue',
//       }}
//     >
//       <Form>{Story()}</Form>
//     </Formik>
//   )
// }

export const Default = Template.bind({})
Default.args = {
  name: 'anyFieldName',
}

export const Title = Template.bind({})
Title.args = {
  name: 'anyFieldName',
  title: 'anyTitle',
}

export default {
  title: 'Fields/FInput',
  component: FInput,
  // argTypes: {
  //   onChange: { action: 'changed' },
  // },
  parameters: {
    formik: {
      initialValues: {
        anyFieldName: 'anyValue',
      },
    },
  },
  decorators: [withFormik],
}
