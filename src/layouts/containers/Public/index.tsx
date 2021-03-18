import React, { useEffect, useRef, useState } from 'react'
import { ReactComponentLike } from 'prop-types'
import Header from 'layouts/containers/Public/Header'
import Footer from 'layouts/containers/Public/Footer'
import { BackTop } from 'antd'

interface IProps {
  Component: ReactComponentLike
  pageProps: any
}

function PublicContainer(props: IProps) {
  const { Component, pageProps } = props
  const refHeader = useRef<HTMLElement>()
  const refFooter = useRef<HTMLElement>()
  const [heightHeaderFooter, setHeightHeaderFooter] = useState(0)

  useEffect(() => {
    if (refFooter.current && refHeader.current) {
      const headerHeight = refHeader.current?.clientHeight
      const footerHeight = refFooter.current?.clientHeight
      setHeightHeaderFooter(headerHeight + footerHeight)
    }
  }, [Boolean(refHeader.current), Boolean(refFooter.current)])

  return (
    <div>
      <Header refContent={refHeader} />
      <div
        style={{
          minHeight: `calc(100vh - ${heightHeaderFooter}px)`,
        }}
      >
        <Component {...pageProps} />
      </div>
      <Footer refContent={refFooter} />

      <BackTop duration={50} />
    </div>
  )
}

export default PublicContainer
