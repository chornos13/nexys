import React from 'react'
import Content, { ContentProps } from '@nexys/components/Content/Content'
import { Col, Row } from 'antd'
import Text from '@nexys/components/Typography/Text'
import LazyImgwrapper from '@nexys/components/LazyImgWrapper'

function Footer(props: ContentProps) {
  return (
    <Content
      id={'contributors'}
      component={(props) => <footer {...props} />}
      style={{
        padding: 16,
        color: 'white',
      }}
      styleContainer={{
        backgroundColor: 'black',
      }}
      {...props}
    >
      <Row gutter={[0, 16]}>
        <Col xs={24}>
          <div style={{ marginBottom: 10 }}>
            <Text size={16}>Contributors</Text>
          </div>
          <a
            href={'https://github.com/chornos13'}
            rel="noreferrer"
            target={'_blank'}
          >
            <LazyImgwrapper height={40} placeholder={'logo'}>
              <img
                src={'https://avatars1.githubusercontent.com/u/20974979'}
                alt={'logo'}
                style={{ maxWidth: 40, borderRadius: '50%' }}
              />
            </LazyImgwrapper>
          </a>
        </Col>
      </Row>
    </Content>
  )
}

export default Footer
