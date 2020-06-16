import React, { useState } from 'react'
import {
  Layout,
  Input,
  Row,
  Col,
  Button,
  Dropdown,
  Menu,
  Avatar,
  Typography,
  Popover,
  AutoComplete,
  Space,
} from 'antd'
import cx from 'classnames'
import {
  getSbContainerClassName,
  getSearchboxProps,
} from 'components/Searchbox/Searchbox'
import { BellOutlined, DownOutlined } from '@ant-design/icons'
import cssFont from 'css/cssFont.scss'
import CustomText from 'components/Typography/Text'
import AdvancedForm from './AdvanceSearch'
import cssHeader from './Header.module.scss'

const { Header } = Layout
const { Text } = Typography
const nama = 'Admin'
const listNotif = [
  {
    title: 'Judul Notifikasi',
    isi: 'Isi Notifikasi',
    pengirim: 'Pengirim Notifikasi',
  },
]

const renderTitle = (title) => (
  <Space size={'large'} style={{ padding: 10 }}>
    <CustomText color={'black'}>{title}</CustomText>
  </Space>
)

const options = [
  {
    label: renderTitle('Libraries'),
  },
  {
    label: renderTitle('Solutions'),
  },
  {
    label: renderTitle('Articles'),
  },
]

function HeaderAdmin() {
  const [visible, setVisible] = useState(false)

  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Pengaturan</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  )
  return (
    <Header
      className={cx(cssHeader.custom, cssFont.font, cssHeader.customPopover)}
    >
      <Row align={'middle'} style={{ width: '100%', flexWrap: 'nowrap' }}>
        <Col flex={1}>
          <Row
            className={getSbContainerClassName(false, cssHeader.autoComplete)}
            align={'middle'}
            style={{
              flexWrap: 'nowrap',
            }}
          >
            <Col flex={1} style={{ lineHeight: 0 }}>
              <AutoComplete
                dropdownMatchSelectWidth={500}
                options={options}
                style={{
                  width: '100%',
                }}
                dropdownClassName={cx(cssHeader.dropdownAutocomplete)}
              >
                <Input.Search
                  {...getSearchboxProps(cx(cssHeader.searchbox))}
                  placeholder="Search..."
                  isNoContainer
                />
              </AutoComplete>
            </Col>
            <Col style={{ lineHeight: 0 }}>
              <Popover
                content={AdvancedForm}
                overlayStyle={{ height: 1 }}
                placement={'bottomRight'}
                trigger="click"
                onVisibleChange={(visible) => {
                  setVisible(visible)
                }}
              >
                <Button
                  icon={
                    <DownOutlined
                      style={{
                        position: 'relative',
                        verticalAlign: 'middle',
                        transition: '.2s all',
                        transform: `rotate(${visible ? 180 : 0}deg)`,
                        top: visible ? -2 : 0,
                      }}
                    />
                  }
                  style={{ padding: 0, height: 35 }}
                />
              </Popover>
            </Col>
          </Row>
        </Col>
        <Col>
          <Popover
            trigger="click"
            title="Notifikasi"
            overlayStyle={{ width: 300 }}
            className={cx(cssFont.normal)}
            content={
              <div className={cx(cssHeader.scrollbar, cssFont.font)}>
                {listNotif.map((item) => (
                  <div className={cx(cssHeader.notifContent)}>
                    <Text className={cx(cssFont['font-sm-normal'])}>
                      {item.title}
                    </Text>
                    <Text
                      className={cx(cssFont.gray, cssFont['font-xs-normal'])}
                    >
                      {`(${item.pengirim})`}
                    </Text>
                    <Text className={cx(cssFont['font-xs-normal'])}>
                      {item.isi}
                    </Text>
                  </div>
                ))}
              </div>
            }
          >
            <Button
              icon={<BellOutlined />}
              size="large"
              className={cx(cssHeader.notifikasi)}
            />
          </Popover>
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={cx(cssHeader.profile)}>
              <Avatar style={{ marginRight: '13px' }} />
              <Text className={cx(cssHeader.name)}>
                {nama.length > 10 ? `${nama.substr(0, 7)}...` : nama}
              </Text>
              <DownOutlined />
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderAdmin
