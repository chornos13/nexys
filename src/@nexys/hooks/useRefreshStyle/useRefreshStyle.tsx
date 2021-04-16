import { useCallback, useEffect, useRef } from 'react'
import Router from 'next/router'

function useRefreshStyle() {
  const refCacheUrl = useRef([])
  const cacheUrl = refCacheUrl.current

  const refreshStyle = useCallback((url) => {
    if (process.env.NODE_ENV === 'production') {
      const els = document.querySelectorAll('link[rel="preload"][as="style"]')
      els.forEach((el) => {
        el.setAttribute('rel', 'stylesheet')
      })
    } else {
      if (cacheUrl.includes(url)) return
      const els = document.querySelectorAll(
        'link[href*="/_next/static/css/styles.chunk.css"]',
      ) as any
      const timestamp = new Date().valueOf()
      for (let i = 0; i < els.length; i += 1) {
        if (els[i].rel === 'stylesheet') {
          els[i].href = `/_next/static/css/styles.chunk.css?v=${timestamp}`
          cacheUrl.push(url)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    Router.events.on('routeChangeComplete', refreshStyle)
    return () => {
      Router.events.off('routeChangeComplete', refreshStyle)
    }
  }, [])

  return null
}

export default useRefreshStyle
