import React from 'react'
import { ReactComponentLike } from 'prop-types'
import Header from 'layouts/containers/Public/Header'
import Footer from 'layouts/containers/Public/Footer'
import Content from 'components/Content/Content'

interface IProps {
  Component: ReactComponentLike
}

function PublicContainer(props: IProps) {
  const { Component } = props

  return (
    <div style={{ marginBottom: 64 }}>
      <Header />
      <Content style={{ padding: 0, minHeight: '62vh' }}>
        <Component {...props} />
      </Content>
      <Footer />
    </div>
  )
}

export default PublicContainer
