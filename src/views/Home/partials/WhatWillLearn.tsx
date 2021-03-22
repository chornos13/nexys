import React from 'react'
import { Button, Card, Col, Row } from 'antd'
import Title from 'components/Typography/Title'
import { CardProps } from 'antd/lib/card'
import Link from 'next/link'

interface LearnItemProps extends CardProps {
  urlTitleIcon?: string
  urlDocumentation?: string
  urlExample?: string
  title?: string | React.ReactNode
  totalFiles?: number
  directory?: string
}

function LearnItem(props: LearnItemProps) {
  const {
    style,
    bodyStyle,
    urlTitleIcon,
    children,
    title,
    urlDocumentation,
    urlExample,
    totalFiles,
    directory,
    ...restProps
  } = props

  const curUrlExample =
    urlExample || (totalFiles > 1 ? `/examples/${directory}` : null)

  return (
    <Card
      {...restProps}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...style,
      }}
      bodyStyle={{
        flex: 1,
        ...bodyStyle,
      }}
      actions={
        [curUrlExample, urlDocumentation].find((value) => value) &&
        [
          urlDocumentation && (
            <Link href={urlDocumentation}>
              <a target={'_blank'} style={{ display: 'inline' }}>
                <Button>Go to Documentation</Button>
              </a>
            </Link>
          ),
          curUrlExample && (
            <Link href={curUrlExample}>
              <a>
                <Button type={'primary'}>View Example</Button>
              </a>
            </Link>
          ),
        ].filter((item) => Boolean(item))
      }
      title={
        <div>
          {urlTitleIcon && (
            <React.Fragment>
              <img alt={title as string} width={24} src={urlTitleIcon} />
              &nbsp;
            </React.Fragment>
          )}

          {title}
        </div>
      }
    >
      {children}
    </Card>
  )
}

interface WhatWillLearnProps {
  data: LearnItemProps[]
}

function WhatWillLearn(props: WhatWillLearnProps) {
  const { data } = props
  return (
    <Row>
      <Col xs={24} style={{ textAlign: 'center' }}>
        <Title size={30}>What will you learn?</Title>
      </Col>
      <Col xs={24}>
        <Row gutter={[20, 20]} justify={'center'}>
          <Col xs={24}>
            <Title noMargin>Library</Title>
          </Col>
          {data.map((learnItem) => {
            return (
              <Col xs={24} md={12} key={learnItem.urlDocumentation}>
                <LearnItem {...learnItem} />
              </Col>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default WhatWillLearn
