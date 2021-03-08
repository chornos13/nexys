import React, { useRef } from 'react'
import { ReactComponentLike } from 'prop-types'
import Header from 'layouts/containers/Public/Header'
import Footer from 'layouts/containers/Public/Footer'
import { BackTop } from 'antd'

interface IProps {
  Component: ReactComponentLike
}

function PublicContainer(props: IProps) {
  const { Component } = props
  const refHeader = useRef<HTMLElement>()
  const refFooter = useRef<HTMLElement>()

  const headerHeight = refHeader.current?.clientHeight
  const footerHeight = refFooter.current?.clientHeight

  return (
    <div>
      <Header refContent={refHeader} />
      <div
        style={{
          minHeight: `calc(100vh - ${headerHeight + footerHeight}px)`,
        }}
      >
        <Component {...props} />
      </div>
      <Footer refContent={refFooter} />

      <BackTop duration={50} />
    </div>
  )
}

export default PublicContainer
