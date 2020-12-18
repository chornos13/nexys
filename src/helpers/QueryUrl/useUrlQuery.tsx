import QueryUrl from 'helpers/QueryUrl/QueryUrl'
import { useMemo, useState } from 'react'
import queryString from 'query-string'

function useUrlQuery() {
  const queryUrl = new QueryUrl()
  const [filtered, setFiltered] = useState('[]')
  const [sorted, setSorted] = useState('[]')
  const [localQuery, _setLocalQuery] = useState({})

  const strLocalQuery = JSON.stringify(localQuery)

  const setQuery = useMemo(() => {
    return function setQuery(objValue: { [key: string]: any }) {
      _setLocalQuery({
        ...localQuery,
        ...objValue,
      })
    }
  }, [strLocalQuery])

  const removeQuery = useMemo(() => {
    return (id: any) => {
      const dupQuery = {
        ...localQuery,
      }
      delete dupQuery[id]
      _setLocalQuery({
        ...dupQuery,
      })
    }
  }, [strLocalQuery])

  const getStringQuery = useMemo(() => {
    return function getStringQuery(url?: string) {
      const strQuery = queryString.stringify({
        filtered,
        sorted,
        ...localQuery,
      })

      if (!url) {
        return strQuery
      }
      return [url, strQuery].join('')
    }
  }, [filtered, sorted, strLocalQuery])

  const extraSetter = useMemo(() => {
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
      setFiltered(id, val) {
        queryUrl.filtered.setQuery(id, val)
        setFiltered(queryUrl.filtered.stringify())
      },
      setSorted(id, val) {
        queryUrl.sorted.setQuery(id, val)
        setSorted(queryUrl.sorted.stringify())
      },
    }
  }, [filtered, sorted, strLocalQuery])

  return {
    ...queryUrl,
    ...extraSetter,
    setQuery,
    removeQuery,
  }
}
export default useUrlQuery
