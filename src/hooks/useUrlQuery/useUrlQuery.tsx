import QueryUrl, { QueryUrlOptions } from 'hooks/useUrlQuery/QueryUrl'
import { useMemo, useRef, useState } from 'react'
import queryString from 'query-string'
import _ from 'lodash'

export type UseUrlQueryOptions = {} & QueryUrlOptions

const DEBOUNCE_WAIT = 500

type QueryUrlReadOnly<T> = Omit<T, 'set' | 'remove'>
function useUrlQuery(_options?: UseUrlQueryOptions) {
  const { ...queryUrlOptions } = { ..._options }

  const refQueryUrl = useRef(new QueryUrl(queryUrlOptions))
  const queryUrl = refQueryUrl.current
  const [count, setCount] = useState(0)

  const getStringQuery = useMemo(() => {
    return function getStringQuery(url?: string) {
      const strQuery = queryString.stringify({
        filtered: queryUrl.filtered.toArrayStringify(),
        sorted: queryUrl.sorted.toArrayStringify(),
        ...queryUrl.query.get(),
      })

      if (!url) {
        return strQuery
      }
      return [url, strQuery].join('')
    }
  }, [count])

  const extraSetter = useMemo(() => {
    async function setQuery(fn: (helper: QueryUrl) => void | Promise<void>) {
      await fn(queryUrl)
      setCount((prevState) => prevState + 1)
    }

    function setQuerySync(fn: (helper: QueryUrl) => void) {
      fn(queryUrl)
      setCount((prevState) => prevState + 1)
    }
    return {
      transformUrl(keys: string) {
        return getStringQuery(keys)
      },
      transformKey(keys: string | any[]) {
        if (Array.isArray(keys)) {
          return [...keys, getStringQuery()]
        }
        return [keys, getStringQuery()]
      },
      setQuery,
      setQuerySync,
      setQueryDebounce: _.debounce(setQuery, DEBOUNCE_WAIT),
      setQuerySyncDebounce: _.debounce(setQuerySync, DEBOUNCE_WAIT),
      query: queryUrl.query as QueryUrlReadOnly<typeof queryUrl.query>,
      sorted: queryUrl.sorted as QueryUrlReadOnly<typeof queryUrl.sorted>,
      filtered: queryUrl.filtered as QueryUrlReadOnly<typeof queryUrl.filtered>,
    }
  }, [count])

  return {
    ...extraSetter,
  }
}
export default useUrlQuery
