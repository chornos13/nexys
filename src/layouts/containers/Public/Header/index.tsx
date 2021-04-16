import React from 'react'
import { Col, Button, Row, Avatar } from 'antd'
import Text from '@nexys/components/Typography/Text'
import Link from 'next/link'
import BaseHeader, {
  BaseHeaderProps,
} from '@nexys/components/BaseHeader/BaseHeader'
import Title from '@nexys/components/Typography/Title'

function Header(props: BaseHeaderProps) {
  return (
    <BaseHeader {...props}>
      <Col flex={'none'}>
        <Row>
          <Col style={{ alignSelf: 'center' }}>
            <Link href={'/'}>
              <a>
                <Avatar
                  style={{
                    backgroundColor: '#e21d26',
                  }}
                  size={'large'}
                >
                  <Text bold>NX</Text>
                </Avatar>
              </a>
            </Link>
          </Col>
          <Col>
            <Title noMargin style={{ padding: 6 }}>
              Nexys
            </Title>
          </Col>
        </Row>
      </Col>
      <Col flex={'auto'} style={{ textAlign: 'end' }}>
        <Link href={'#contributors'}>
          <a>
            <Button danger>
              <Text fontFamily={'bold'}>Contributors</Text>
            </Button>
          </a>
        </Link>
      </Col>
    </BaseHeader>
  )
}

export default Header
