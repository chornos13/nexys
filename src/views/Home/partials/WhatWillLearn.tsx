import React from 'react'
import { Avatar, Button, Card, Col, Row } from 'antd'
import Title from 'components/Typography/Title'
import { CardProps } from 'antd/lib/card'
import Link from 'next/link'

interface LearnItemProps extends CardProps {
  urlTitleIcon?: string
  urlDocumentation?: string
  urlExample?: string
  title?: string | React.ReactNode
}

const dataLearnItems: LearnItemProps[] = [
  {
    title: 'React',
    urlTitleIcon:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
    urlDocumentation: 'https://reactjs.org',
    children: 'A JavaScript library for building user interfaces',
  },
  {
    urlTitleIcon: 'https://nextjs.org/static/favicon/favicon-32x32.png',
    title: 'Next.js',
    urlDocumentation: 'https://nextjs.org',
    children:
      'Next.js gives you the best developer experience with all the features ' +
      'you need for production: hybrid static & server rendering, TypeScript support, ' +
      'smart bundling, route pre-fetching, and more. No config needed.',
  },
  {
    urlTitleIcon:
      'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
    title: 'AntDesign',
    urlDocumentation: 'https://ant.design/components/overview/',
    children:
      'A design system for enterprise-level products.' +
      '\nCreate an efficient and enjoyable work experience.',
  },
  {
    title: 'Formik',
    urlTitleIcon: 'https://formik.org/images/favicon.png',
    urlDocumentation: 'https://formik.org/docs/overview',
    children: 'Build forms in React, without the tears',
    urlExample: '/formik/basic-input',
  },
  {
    title: 'React Query',
    urlTitleIcon:
      'https://react-query.tanstack.com/_next/static/images/favicon-eed8346421218b24d8fd0fd55c2f9e35.png',
    urlDocumentation: 'https://react-query.tanstack.com/overview',
    urlExample: '/react-query/basic-view-data',
    children:
      'Performant and powerful data synchronization.' +
      '\nFetch, cache and update data ' +
      'in your React and React Native applications all without touching any "global state".',
  },
  {
    title: (
      <React.Fragment>
        <Avatar
          style={{
            background: 'black',
          }}
          size={'small'}
        >
          Y
        </Avatar>
        &nbsp; Yup
      </React.Fragment>
    ),
    children:
      'Yup is a JavaScript schema builder for value parsing and validation. ' +
      'Define a schema, transform a value to match, ' +
      'validate the shape of an existing value, or both. ' +
      'Yup schema are extremely expressive and allow modeling complex, ' +
      'interdependent validations, or value transformations.',
    urlDocumentation: 'https://github.com/jquense/yup',
  },
  {
    title: 'Storybook',
    children: 'Build bulletproof UI components faster',
    urlTitleIcon: 'https://storybook.js.org/images/logos/icon-storybook.png',
    urlDocumentation: 'https://storybook.js.org/',
  },
  {
    title: 'Jest',
    children:
      'Jest is a delightful JavaScript Testing Framework with a focus on simplicity.',
    urlTitleIcon: 'https://jestjs.io/img/favicon/favicon.ico',
    urlDocumentation: 'https://jestjs.io/',
  },
]

function LearnItem(props: LearnItemProps) {
  const {
    style,
    bodyStyle,
    urlTitleIcon,
    children,
    title,
    urlDocumentation,
    urlExample,
    ...restProps
  } = props
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
        [urlExample, urlDocumentation].find((value) => value) &&
        [
          urlDocumentation && (
            <Link href={urlDocumentation}>
              <a target={'_blank'}>
                <Button>Go to Documentation</Button>
              </a>
            </Link>
          ),
          urlExample && (
            <Link href={urlExample}>
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

function WhatWillLearn() {
  return (
    <Row>
      <Col xs={24} style={{ textAlign: 'center' }}>
        <Title size={30}>What will you learn?</Title>
      </Col>
      <Col xs={24}>
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <Title noMargin>Library</Title>
          </Col>
          {dataLearnItems.map((learnItem, key) => {
            return (
              <Col xs={12} key={key}>
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
