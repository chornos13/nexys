import React from 'react'
import { Button, Col, Row } from 'antd'
import Title from '@nexys/components/Typography/Title'
import Text from '@nexys/components/Typography/Text'
import Image from 'next/dist/client/image'
import Link from 'next/link'

function Welcome() {
  return (
    <Row gutter={[10, 0]}>
      <Col xs={24} sm={12} style={{ alignSelf: 'center' }}>
        <Row gutter={[0, 10]}>
          <Col xs={24}>
            <Title size={30} noMargin>
              Hello Team!
            </Title>
          </Col>
          <Col xs={24}>
            <Text size={24}>
              Mulai pelajari cara mudah mengembangkan Front-End menggunakan
              Framework Next.js
            </Text>
          </Col>
          <Col xs={24}>
            <Link href={'/#whatWillLearn'}>
              <a>
                <Button size={'large'} type={'primary'}>
                  <Text>PELAJARI</Text>
                </Button>
              </a>
            </Link>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={12}>
        <Image
          width={444}
          height={306}
          src={'/static/images/character.png'}
          alt={'illustration'}
        />
      </Col>
    </Row>
  )
}

export default Welcome
