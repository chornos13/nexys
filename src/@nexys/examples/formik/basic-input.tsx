import React from 'react'
import { Form, Formik } from 'formik'
import FInput from '@nexys/fields/FInput/FInput'
import { Button, Col, Modal, Row } from 'antd'
import * as yup from 'yup'

const schemaBasicInput = yup.object().shape({
  title: yup.string().required('Title wajib diisi'),
})

// lets assume this is ApiCall/axios/useMutation
function postTitle(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // lets assume this is response from backend
      const response = {
        message: 'any message',
        data,
      }
      resolve(response)
    }, 2000)
  })
}

function BasicInput() {
  return (
    <Formik
      initialValues={{
        title: '',
      }}
      validationSchema={schemaBasicInput}
      onSubmit={(values, formikHelpers) => {
        postTitle(values).then((res) => {
          Modal.info({
            content: JSON.stringify(res),
          })
          formikHelpers.setSubmitting(false)
        })
      }}
    >
      {(formikHelpers) => {
        const { isSubmitting } = formikHelpers
        return (
          <Form>
            <Row gutter={[0, 5]}>
              <Col xs={24}>
                <FInput
                  title={'Form Title'}
                  name={'title'}
                  placeholder={'Masukkan Title'}
                />
              </Col>
              <Col xs={24} style={{ textAlign: 'end' }}>
                <Button
                  type={'primary'}
                  htmlType={'submit'}
                  loading={isSubmitting}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )
      }}
    </Formik>
  )
}

export const $metadata = {
  title: 'Basic Input and Validation',
  description: 'Example for basic input using Formik with Yup',
}

export default BasicInput
