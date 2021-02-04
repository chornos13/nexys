import React from 'react'
import { Form, Formik } from 'formik'
import FInput from 'fields/FInput/FInput'
import { Button, Col, Row } from 'antd'
import * as yup from 'yup'
import Title from 'components/Typography/Title'

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
          alert(JSON.stringify(res))
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
                <Title noMargin>Basic Input and Validation</Title>
              </Col>
              <Col xs={24}>
                <FInput
                  title={'Title'}
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

export default BasicInput
