import React from 'react'
import { ReactComponentLike } from 'prop-types'
import Header from 'layouts/containers/Public/Header'
import Footer from 'layouts/containers/Public/Footer'
import Content from 'components/Content/Content'
import { Card } from 'antd'

interface IProps {
  Component: ReactComponentLike
}

const HEIGHT_HEADER = 56
const HEIGHT_FOOTER = 110

function PublicContainer(props: IProps) {
  const { Component } = props

  return (
    <div>
      <Header />
      <Content style={{ padding: 0 }}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{
            minHeight: `calc(100vh - ${HEIGHT_HEADER + HEIGHT_FOOTER}px)`,
          }}
        >
          <Component {...props} />
        </Card>
      </Content>
      <Footer />
    </div>
  )
}

export default PublicContainer
