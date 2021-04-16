import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Router from 'next/router'
import Loading from '@nexys/components/Loading/Loading'

interface UseLoadingPageOptions {
  loading: ReactNode
}

function useLoadingPage(options?: UseLoadingPageOptions) {
  const refLoading = useRef<HTMLDivElement>()
  const [isMounted, setIsMounted] = useState(false)

  const { start, done } = useMemo(() => {
    return {
      start: () => {
        refLoading.current.style.visibility = 'visible'
      },
      done: () => {
        refLoading.current.style.visibility = 'hidden'
      },
    }
  }, [Boolean(refLoading.current)])

  const listenLoading = useCallback(
    (isListen) => {
      const event = isListen ? 'on' : 'off'
      Router.events[event]('routeChangeStart', start)
      Router.events[event]('routeChangeComplete', done)
      Router.events[event]('routeChangeError', done)
    },
    [Boolean(refLoading.current)],
  )
  useEffect(() => {
    setIsMounted(true)
    listenLoading(true)

    return () => {
      listenLoading(false)
    }
  }, [])

  const {
    loading = (
      <Loading
        ref={(ref) => {
          if (ref && !refLoading?.current) {
            refLoading.current = ref
            refLoading.current.style.visibility = 'hidden'
          }
        }}
        style={{
          display: 'none',
        }}
      />
    ),
  } = options || {}

  return isMounted ? loading : null
}

export default useLoadingPage
