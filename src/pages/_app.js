/* eslint-disable no-param-reassign */
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Loading from 'components/Loading/Loading'
import App from 'next/app'
import getSiteLayout from 'layouts/core/DefaultLayout'
import Head from 'next/head'
// import 'antd/dist/antd.css'
import 'styles/vars.scss'
import 'styles/global.scss'
import 'styles/_breakpoints.scss'
import 'styles/_mixins.scss'

const title = 'Chornos13'
const description = 'Boilerplate Next.js By Chornos13'
const metaURL = 'https://www.athijab.com'
const metaImage = '/static/logo.png'
const webIconURL = '/static/favicon.png'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.cacheURL = []
    this.refLoading = React.createRef()
    this.state = { firstMount: false }
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      // prevent duplication listener
      Router.events.on('routeChangeComplete', this.refreshStyle)
    }
    this.setState({
      firstMount: true,
    })
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV !== 'production') {
      Router.events.off('routeChangeComplete', this.refreshStyle)
    }
    this.listenLoading(false)
  }

  listenLoading = (isListen, refLoading) => {
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

  refreshStyle = (url) => {
    if (this.cacheURL.includes(url)) return
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]',
    )
    const timestamp = new Date().valueOf()
    for (let i = 0; i < els.length; i += 1) {
      if (els[i].rel === 'stylesheet') {
        els[i].href = `/_next/static/css/styles.chunk.css?v=${timestamp}`
        this.cacheURL.push(url)
        break
      }
    }
  }

  render() {
    const siteLayout = getSiteLayout(this.props)
    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
          <meta name="title" content={title} />
          <link rel="shortcut icon" href={webIconURL} />
          <meta name="description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={metaURL} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={metaImage} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={metaURL} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={metaImage} />
          {/* <script type="application/ld+json"> */}
          {/*  {JSON.stringify(schemaORG)} */}
          {/* </script> */}
        </Head>
        {this.state.firstMount && (
          <Loading
            ref={(ref) => {
              if (ref && !this?.refLoading?.current) {
                this.refLoading.current = ref
                this.refLoading.current.style.visibility = 'hidden'
                this.listenLoading(true, this.refLoading.current)
              }
            }}
            style={{
              display: 'none',
            }}
          />
        )}
        {siteLayout}
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
