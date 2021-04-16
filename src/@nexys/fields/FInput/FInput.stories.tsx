import React from 'react'
import FInput, { FInputProps } from '@nexys/fields/FInput/FInput'
import { Story } from '@storybook/react'
import withFormik from 'storybook-formik'

const Template: Story<FInputProps> = (args) => <FInput {...args} />

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
