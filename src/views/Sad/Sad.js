import {
  Form,
  Select,
  InputNumber,
  Switch,
  Slider,
  Button,
  DatePicker,
} from 'antd'

import Link from 'next/link'
import React from 'react'
import Content from 'components/Layout/Content'

const FormItem = Form.Item
const Option = Select.Option

const content = {
  marginTop: '100px',
}

export default function Home() {
  return (
    <Content>
      <div className="text-center mb-5">
        <Link href="#">
          <a className="logo mr-0">
            {/*<SmileFilled size={48} strokeWidth={1} />*/}
          </a>
        </Link>

        <p className="mb-0 mt-3 text-disabled">Welcoaaame to the world !</p>
      </div>
      <div>
        <Form layout="horizontal">
          <FormItem
            label="Input Number"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              size="large"
              min={1}
              max={10}
              style={{ width: 100 }}
              defaultValue={3}
              name="inputNumber"
            />
          </FormItem>

          <FormItem
            label="Switch"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Switch defaultChecked name="switch" />
          </FormItem>

          <FormItem
            label="Slider"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Slider defaultValue={70} />
          </FormItem>

          <FormItem
            label="Select"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Select
              size="large"
              defaultValue="lucy"
              style={{ width: 192 }}
              name="select"
            >
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="disabled" disabled>
                disabled
              </Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </FormItem>
          <Link href={'/'}>
            <a>Ke indexz yuk :D</a>
          </Link>
          <FormItem
            label="DatePicker"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <DatePicker name="startDate" />
          </FormItem>
          <FormItem
            style={{ marginTop: 48 }}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Button size="large" type="primary" htmlType="submit">
              OK
            </Button>
            <Button size="large" style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </FormItem>
        </Form>
      </div>
    </Content>
  )
}
