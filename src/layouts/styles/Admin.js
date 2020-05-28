import React from 'react'
import Header from 'components/Header/Header'
import Main from 'components/Layout/Page'
import Footer from 'components/Footer/Footer'
import PropTypes from 'prop-types'

function Layout(props) {
  const { Component, pageProps, router } = props

  return (
    <React.Fragment>
      <Header />
      <Main>
        <Component {...pageProps} key={router.route} />
      </Main>
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
