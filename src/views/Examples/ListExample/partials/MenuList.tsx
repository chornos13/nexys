import React, { useMemo } from 'react'
import { Anchor, Button, Col, Drawer, Row } from 'antd'
import MenuOutlined from '@ant-design/icons/lib/icons/MenuOutlined'
import Title from 'components/Typography/Title'
import cssListExample from 'views/Examples/ListExample/ListExample.module.scss'
import { ListExampleProps } from 'views/Examples/ListExample/ListExample'
import useToggle from 'hooks/useToggle'

function MenuList(props: ListExampleProps) {
  const { index } = props
  const stateDrawer = useToggle()

  const elAnchor = useMemo(() => {
    return (
      <Anchor targetOffset={10} onClick={() => stateDrawer.untoggle()}>
        {index.map((item) => {
          return (
            <Anchor.Link
              href={`#${item.filename}`}
              key={item.filename}
              title={item.title}
            />
          )
        })}
      </Anchor>
    )
  }, [])

  return (
    <React.Fragment>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'white',
          padding: '5px 0',
        }}
      >
        <Row align={'middle'} gutter={[10, 0]}>
          <Col flex={'none'}>
            <Button
              icon={<MenuOutlined />}
              onClick={() => stateDrawer.toggle()}
            />
          </Col>
          <Col flex={'auto'}>
            <Title noMargin>Examples</Title>
          </Col>
          <Col id={cssListExample.anchor} flex={'none'}>
            {elAnchor}
          </Col>
        </Row>
      </div>

      <Drawer
        title="Examples"
        placement={'left'}
        closable={false}
        onClose={() => stateDrawer.untoggle()}
        visible={stateDrawer.isToggled}
      >
        {elAnchor}
      </Drawer>
    </React.Fragment>
  )
}

export default MenuList
