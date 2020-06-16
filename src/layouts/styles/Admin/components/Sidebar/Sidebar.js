import React from 'react'
import {
  Col,
  Layout,
  Row,
  Popover,
  List,
  Typography,
  Dropdown,
  Select,
  Card,
  Menu,
} from 'antd'
import { withRouter } from 'next/router'
import { DownOutlined } from '@ant-design/icons'
import cx from 'shortcuts/cx'
import Button from 'components/Button'
import PropTypes from 'shortcuts/PropTypes'
import cssFont from 'css/cssFont.scss'
import MenuSidebar from 'layouts/styles/Admin/components/Sidebar/partials/MenuSidebar'
import LegendSidebar from 'layouts/styles/Admin/components/Sidebar/partials/LegendSidebar'
import cssSiderBar from 'layouts/styles/Admin/components/Sidebar/Siderbar.module.scss'

const { Sider } = Layout
const { Text } = Typography
const { Option } = Select

function ActionButton(props) {
  const { children, type, ...otherProps } = props
  return (
    <Button className={cx()} {...otherProps}>
      {children}
    </Button>
  )
}

ActionButton.defaultProps = {
  type: 'primary',
}

ActionButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
}

function Sidebar(props) {
  const { router } = props

  const data = [
    { id: 1, nama: 'Sekretaris Jenderal' },
    { id: 2, nama: 'Ketua Tim' },
    { id: 3, nama: 'Wakil Ketua Tim' },
    { id: 4, nama: 'Kepala Sub Bidang di Substansi Perorangan' },
  ]
  const content = (
    <Card className={cx(cssSiderBar.customCard, cssFont.normal)}>
      <div className={cx(cssSiderBar.menuContainer)}>
        <Menu className={cx(cssFont['font-sm-normal'])}>
          {data.map((item) => (
            <Menu.Item key={item.id}>{item.nama}</Menu.Item>
          ))}
        </Menu>
      </div>
      {/* <Button type="primary" style={{ width: '100%' }}>
        Ubah Role
      </Button> */}
    </Card>
  )
  return (
    <Sider
      className={cx(cssSiderBar.containerSidebar, cssSiderBar.backgroundSider)}
      breakpoint="lg"
      collapsedWidth="0"
      defaultCollapsed={false}
      onBreakpoint={(broken) => {
        console.log(broken)
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type)
      }}
      width={327}
    >
      <Row className={cx(cssSiderBar.logo)} gutter={16}>
        <Col>Sider</Col>
      </Row>
    </Sider>
  )
}

export default withRouter(Sidebar)
