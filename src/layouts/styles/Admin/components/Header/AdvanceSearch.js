import React from 'react'
import { Formik, Form, Field } from 'formik'
import CInput from 'fields/CInput'
import CSelect from 'fields/CSelect'
import cx from 'shortcuts/cx'
import Block from 'components/Block'
import Button from 'components/Button'
import cssFont from 'css/cssFont.scss'
import CRangePicker from 'fields/CRangePicker'
import { Typography, Input, DatePicker, Row, Col, Divider } from 'antd'

const { Text } = Typography
function AdvanceForm() {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        console.log(values)
      }}
    >
      {(formikProps) => (
        <Form>
          <Text className={cx(cssFont.normal, cssFont['font-md-normal'])}>
            Advanced Search
          </Text>
          <Divider />
          <Field
            component={CInput}
            title={'Dari'}
            name="pengirim"
            placeholder="Masukkan Pengirim"
          />
          <Field
            component={CInput}
            title={'Tujuan'}
            name="tujuan"
            placeholder="Masukkan Tujuan"
          />
          <Field
            component={CInput}
            title={'Perihal'}
            name="perihal"
            placeholder="Masukkan Perihal"
          />
          <Field
            component={CInput}
            title={'Isi'}
            name="isi"
            style={{ height: '200px !important' }}
            placeholder="Masukkan isi"
            Module={Input.TextArea}
          />
          <Row gutter={32}>
            <Col md={12}>
              <Field
                component={CSelect}
                title={'Tanggal'}
                name="TanggalId"
                placeholder="Pilih Tanggal"
              />
            </Col>
            <Col md={12}>
              <Field component={CRangePicker} title={'Selang'} name="tanggal" />
            </Col>
            <Col md={12}>
              <Field
                component={CSelect}
                title={'Tempat Pencarian'}
                name="PencarianId"
                placeholder="Pilih Tempat Pencarian"
              />
            </Col>
          </Row>
          <Block size={150} end style={{ marginTop: 50 }}>
            <Button type="primary" block>
              Search
            </Button>
          </Block>
        </Form>
      )}
    </Formik>
  )
}

export default AdvanceForm
