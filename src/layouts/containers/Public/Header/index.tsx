import React from 'react'
import { Col, Button } from 'antd'
import Text from 'components/Typography/Text'
import Link from 'next/link'
import BaseHeader from 'components/BaseHeader/BaseHeader'

function Header() {
  return (
    <BaseHeader>
      <Col>
        <Link href={'/'}>
          <a>
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'green',
                borderRadius: '50%',
              }}
            />
          </a>
        </Link>
      </Col>
      <Col>
        <Button type={'primary'}>
          <Text color={'white'} fontFamily={'bold'}>
            Login
          </Text>
        </Button>
      </Col>
    </BaseHeader>
  )
}

export default Header
