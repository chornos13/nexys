import { Form, Formik } from 'formik'
import React from 'react'
import PropTypes from 'shortcuts/PropTypes'

function BasePersist(props) {
  const { Component } = props
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {(formikProps) => {
        const { handleSubmit } = formikProps
        return <Form onSubmit={handleSubmit}>{<Component {...props} />}</Form>
      }}
    </Formik>
  )
}

BasePersist.propTypes = {
  Component: PropTypes.element,
}

export default BasePersist
