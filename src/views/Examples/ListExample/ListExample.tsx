import React, { useEffect, useState } from 'react'
import Content from 'components/Content/Content'
import { Col, Row } from 'antd'
import DemoIndex from 'views/Examples/ListExample/partials/DemoIndex'
import Head from 'next/dist/next-server/lib/head'
import Title from 'components/Typography/Title'
import Text from 'components/Typography/Text'
import MenuList from 'views/Examples/ListExample/partials/MenuList'

export interface ListExampleProps {
  index: {
    title: string
    description: string
    filename: string
    url: string
    sourceCode: string
  }[]
  folder: string
  information: {
    title: string
    urlTitleIcon: string
    urlDocumentation: string
    children: string
    urlExample: string
  }
}

function ListExample(props: ListExampleProps) {
  const { index, folder } = props
  const [metaData, setMetaData] = useState(null)

  useEffect(() => {
    import(`examples/${folder}`).then((module) => {
      setMetaData(module.default)
    })
  })

  return (
    <React.Fragment>
      <Head>
        <title>{`Nexys${metaData ? ` | ${metaData?.title}` : ''}`}</title>
      </Head>

      <Content style={{ marginBottom: 20 }}>
        <div style={{ marginTop: 20 }}>
          <Title style={{ textAlign: 'center' }}>
            {metaData?.urlTitleIcon && (
              <React.Fragment>
                <img
                  alt={metaData?.title}
                  width={29}
                  src={metaData?.urlTitleIcon}
                />
                &nbsp;
              </React.Fragment>
            )}

            {metaData?.title}
          </Title>
        </div>
        <Text
          style={{
            maxWidth: 600,
            margin: 'auto',
            display: 'block',
            textAlign: 'center',
          }}
        >
          {metaData?.children}
        </Text>

        <MenuList {...props} />

        <Row gutter={[0, 15]}>
          {index.map((item) => {
            return (
              <Col xs={24} key={item.filename}>
                <DemoIndex folder={folder} {...item} />
              </Col>
            )
          })}
        </Row>
      </Content>
    </React.Fragment>
  )
}

export default ListExample
