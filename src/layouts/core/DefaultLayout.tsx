import React from 'react'
// import { Layout } from 'antd'
import routes from 'layouts/routes'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      staleTime: 10000,
    },
  },
})

function getSiteLayout(appProps) {
  const { Component, pageProps, router } = appProps
  const { route } = router

  for (let i = 0; i < routes.length; i += 1) {
    const curRoute = routes[i]
    const { exact, path, layout: PageLayout, ...layoutProps } = curRoute
    if ((exact && path === route) || (!exact && route.startsWith(path))) {
      return (
        <ReactQueryCacheProvider queryCache={queryCache}>
          {PageLayout ? (
            <PageLayout {...appProps} layoutProps={layoutProps} />
          ) : (
            <Component {...pageProps} key={router.route} />
          )}
          <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>
      )
    }
  }

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Component {...pageProps} key={router.route} />
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  )
}

export default getSiteLayout
