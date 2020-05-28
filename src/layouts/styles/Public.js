import React from 'react'
import Page from 'layouts/core/Page'
import Footer from 'components/Footer/Footer'
import PropTypes from 'prop-types'
import HeaderPublic from 'components/Header/HeaderPublic'

function Layout(props) {
  const { Component, pageProps, router } = props

  return (
    <React.Fragment>
      <HeaderPublic />
      <Page>
        <Component {...pageProps} key={router.route} />
      </Page>
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
