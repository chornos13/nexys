import React from 'react'
import { Button, Col, Row, Upload } from 'antd'
import cx from 'shortcuts/cx'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cssInput from 'fields/CFile/CFile.module.scss'
import { FieldProps } from 'formik'
import { DraggerProps } from 'antd/lib/upload/Dragger'

type ComFieldProp = DraggerProps & FieldProps

const ComField = (formikProps: ComFieldProp) => {
  const { field, className, form, ...props } = formikProps

  const { name, value } = field

  const curValue = value || []

  return (
    <Upload.Dragger
      className={cx(cssInput.containerInput, className, cssFont.normal)}
      {...field}
      {...props}
      fileList={value}
      beforeUpload={(file, fileList) => {
        form.setFieldValue(name, [...fileList, ...curValue])
        return false
      }}
      onRemove={(file) => {
        const index = curValue.indexOf(file)
        const newFileList = curValue.slice()
        newFileList.splice(index, 1)
        form.setFieldValue(name, newFileList)
      }}
      onChange={() => {}}
    >
      <Row align={'middle'} justify={'space-between'}>
        <Col>Drop File Here</Col>
        <Col>
          <Button style={{ borderRadius: 8 }}>Browse</Button>
        </Col>
      </Row>
    </Upload.Dragger>
  )
}

export default withTitleAndError(ComField)
