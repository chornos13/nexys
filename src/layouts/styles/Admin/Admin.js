import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from 'layouts/styles/Admin/components/Sidebar/Sidebar'
import Header from 'layouts/styles/Admin/components/Header/Header'
import { Layout } from 'antd'
import cx from 'classnames'
import cssAdmin from './Admin.module.scss'

function Admin(props) {
  const { Component, pageProps, router } = props
  return (
    <React.Fragment>
      <Layout>
        <Sidebar />
        <Layout className={cx(cssAdmin.contentContainer)}>
          <Header />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </Layout>
    </React.Fragment>
  )
}

Admin.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.objectOf(PropTypes.any),
  router: PropTypes.shape({
    route: PropTypes.string,
  }),
}

const Public = Admin

export default Public
