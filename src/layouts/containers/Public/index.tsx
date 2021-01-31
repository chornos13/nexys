import React from 'react'
import { ReactComponentLike } from 'prop-types'
import Header from 'layouts/containers/Public/Header'
import Footer from 'layouts/containers/Public/Footer'
import { BackTop } from 'antd'

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
      <div
        style={{
          minHeight: `calc(100vh - ${HEIGHT_HEADER + HEIGHT_FOOTER}px)`,
        }}
      >
        <Component {...props} />
      </div>
      <Footer />

      <BackTop duration={50} />
    </div>
  )
}

export default PublicContainer
