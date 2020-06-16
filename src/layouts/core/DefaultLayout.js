import React from 'react'
// import { Layout } from 'antd'
import routes from 'layouts/routes'

function getSiteLayout(appProps) {
  const { Component, pageProps, router } = appProps
  const { route } = router

  for (let i = 0; i < routes.length; i += 1) {
    const curRoute = routes[i]
    const { exact, path, layout: PageLayout } = curRoute

    if (exact) {
      if (path === route) {
        return <PageLayout {...appProps} />
      }
    } else if (route.startsWith(path)) {
      return <PageLayout {...appProps} />
    }
  }

  return <Component {...pageProps} key={router.route} />
}

export default getSiteLayout
