/* eslint-disable no-param-reassign */
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Loading from 'components/Loading/Loading'
import App from 'next/app'
import getSiteLayout from 'layouts/core/DefaultLayout'
// import 'antd/dist/antd.css'
// import 'styles/vars.css'
// import 'styles/global.css'

const listenLoading = (isListen, refLoading) => {
  const start = () => {
    refLoading.style.visibility = 'visible'
  }
  const done = () => {
    refLoading.style.visibility = 'hidden'
  }
  const event = isListen ? 'on' : 'off'
  Router.events[event]('routeChangeStart', start)
  Router.events[event]('routeChangeComplete', done)
  Router.events[event]('routeChangeError', done)
}

class MyApp extends App {
  constructor(props) {
    super(props)
    this.cacheURL = []
    this.refLoading = React.createRef()
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      // prevent duplication listener
      Router.events.on('routeChangeComplete', this.refreshStyle)
    }

    this.refLoading.current.style.visibility = 'hidden'
    listenLoading(true, this.refLoading.current)
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV !== 'production') {
      Router.events.off('routeChangeComplete', this.refreshStyle)
    }
    listenLoading(false)
  }

  refreshStyle = (url) => {
    if (this.cacheURL.includes(url)) return
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]',
    )
    const timestamp = new Date().valueOf()
    for (let i = 0; i < els.length; i += 1) {
      if (els[i].rel === 'stylesheet') {
        els[i].href = `./_next/static/css/styles.chunk.css?v=${timestamp}`
        this.cacheURL.push(url)
        break
      }
    }
  }

  render() {
    const siteLayout = getSiteLayout(this.props)

    return (
      <React.Fragment>
        {siteLayout}
        <Loading ref={this.refLoading} />
      </React.Fragment>
    )
  }
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.objectOf(PropTypes.any),
  router: PropTypes.shape({
    route: PropTypes.string,
  }),
}

export default MyApp
