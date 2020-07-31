import React from 'react'
// import { Layout } from 'antd'
import routes from 'layouts/routes'
import { SWRConfig, ConfigInterface } from 'swr'

const config: ConfigInterface = {
  dedupingInterval: 10000,
  // onSuccess(data, key, config) {
  //   console.log(data, key, config)
  // },
}

function getSiteLayout(appProps) {
  const { Component, pageProps, router } = appProps
  const { route } = router

  for (let i = 0; i < routes.length; i += 1) {
    const curRoute = routes[i]
    const { exact, path, layout: PageLayout, ...layoutProps } = curRoute
    if ((exact && path === route) || (!exact && route.startsWith(path))) {
      return (
        <SWRConfig value={config}>
          {PageLayout ? (
            <PageLayout {...appProps} layoutProps={layoutProps} />
          ) : (
            <Component {...pageProps} key={router.route} />
          )}
        </SWRConfig>
      )
    }
  }

  return (
    <SWRConfig value={config}>
      <Component {...pageProps} key={router.route} />
    </SWRConfig>
  )
}

export default getSiteLayout
