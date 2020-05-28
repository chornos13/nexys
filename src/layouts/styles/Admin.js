import React from 'react'
import Page from 'layouts/Page'
import Footer from 'components/Footer/Footer'
import PropTypes from 'prop-types'
import { Empty } from 'antd'
import HeaderPublic from 'components/Header/HeaderPublic'

function Layout(props) {
  const { Component, pageProps, router } = props

  return (
    <React.Fragment>
      <HeaderPublic />

      <Page>
        <Empty />
        <Component {...pageProps} key={router.route} />
      </Page>
      {/* <Loading ref={this.refLoading} /> */}
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.objectOf(PropTypes.any),
  router: PropTypes.shape({
    route: PropTypes.string,
  }),
}

const Public = Layout

export default Public
