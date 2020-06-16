import React from 'react'
import { Select, Divider, Input, Button, Row, Col } from 'antd'
import cssFont from 'css/cssFont.scss'
import withTitleAndError from 'fields/HOC/ErrorView/withTitleAndError'
import cx from 'shortcuts/cx'
import cssCSelect from 'fields/CCreateSelect/CCreateSelect.module.scss'
import IconDownOutlined from 'icons/IconDownOutlined'
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select
class ComField extends React.Component {
  state = {
    items: ['jack', 'lucy'],
    nama: '',
  }

  onNameChange = (event) => {
    this.setState({
      nama: event.target.value,
    })
  }

  addItem = () => {
    const { items, nama } = this.state
    if (nama) {
      this.setState({
        items: [...items, nama],
        nama: '',
      })
    }
  }

  render() {
    const {
      field,
      className,
      style,
      form,
      dropdownClassname,
      ...props
    } = this.props
    const { name } = field
    const { items, nama } = this.state
    return (
      <Select
        className={cx(cssCSelect.containerSelect, className)}
        suffixIcon={<IconDownOutlined />}
        dropdownClassName={cx(cssCSelect.dropdown, dropdownClassname)}
        {...props}
        {...field}
        style={{
          width: '100%',
          ...style,
        }}
        onChange={(value) => {
          form.setFieldValue(name, value)
        }}
        dropdownRender={(menu) => (
          <div>
            <Row className={cx(cssCSelect.inputSelectContainer)}>
              <Col md={21}>
                <Input
                  style={{ flex: 'auto' }}
                  value={nama}
                  onChange={this.onNameChange}
                />
              </Col>
              <Col md={3}>
                <Button
                  type="link"
                  onClick={this.addItem}
                  className={cx(cssFont.normal)}
                >
                  <PlusOutlined />
                  Buat Baru
                </Button>
              </Col>
            </Row>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
          </div>
        )}
      >
        {items.map((item) => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    )
  }
}

export default withTitleAndError(ComField)
