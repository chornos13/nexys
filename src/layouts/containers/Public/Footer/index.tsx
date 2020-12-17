import React from 'react'
import Content from 'components/Content/Content'
import { Col, Row } from 'antd'

function Footer() {
  return (
    <Content
      component={(props) => <footer {...props} />}
      style={{
        padding: 16,
        color: 'white',
      }}
      styleContainer={{
        backgroundColor: '#0b6dc6',
      }}
    >
      <Row gutter={[0, 16]}>
        <Col xs={24}>
          <div>Powered By</div>
          <img
            src={'https://avatars1.githubusercontent.com/u/20974979'}
            alt={'logo'}
            style={{ maxWidth: 40, borderRadius: '50%' }}
          />
        </Col>
      </Row>
    </Content>
  )
}

export default Footer
