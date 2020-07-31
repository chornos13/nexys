import { useRef, useState } from 'react'
import useSWR, { keyInterface, responseInterface, ConfigInterface } from 'swr'
import isFunction from 'lodash/isFunction'
import debounce from 'lodash/debounce'
import set from 'lodash/set'
import QueryTableManager from 'helpers/QueryTableManager'
import queryString from 'query-string'
import Fetcher from 'services/Fetcher'

type FetchType = (queryManager: QueryTableManager) => void | string

export interface IUseParamSWR extends responseInterface<any, Error> {
  total?: number
  fetch(value: FetchType)
  fetchDebounce(value: FetchType)
  getData(value: FetchType)
  isLoading: boolean
  page: number
  pageSize: number
  isError: object
  mutateByKeyData(
    key: string,
    data?: any | Promise<any> | mutateCallback<any>,
    shouldRevalidate?: boolean,
  )
}

export interface IConfigUseParamSWR {
  shouldInitialFetch?: boolean
  queryTableManager?: QueryTableManager
  fetcher?: <T>(url) => Promise<T>
  param?: string
}

declare type mutateCallback<Data = any> = (
  currentValue: Data,
) => Promise<Data> | Data

function getParam(queryManager: QueryTableManager) {
  if (queryManager.isContainQuery()) {
    return `?${queryString.stringify(queryManager.getStringifyQuery())}`
  }
  return ''
}

export function getKey(key) {
  if (isFunction(key)) {
    return key()
  }
  return key
}

function useParamSWR(
  key: keyInterface,
  configs?: IConfigUseParamSWR,
  options?: ConfigInterface,
): IUseParamSWR {
  const refQueryManager = useRef(null)
  const { current: curConfigs }: { current: IConfigUseParamSWR } = useRef(
    configs,
  )

  if (
    (!curConfigs || !curConfigs.queryTableManager) &&
    !refQueryManager.current
  ) {
    refQueryManager.current = new QueryTableManager()
  }

  const {
    shouldInitialFetch = true,
    queryTableManager = refQueryManager.current,
    fetcher = (url) => {
      return Fetcher.withAuth.get(url).then((res) => res.data)
    },
  } = curConfigs || {}

  const { current: queryManager } = useRef(queryTableManager)
  const [config, setConfig] = useState({
    param: `${getParam(queryManager)}`,
    page: queryManager.queryObject.page,
    pageSize: queryManager.queryObject.pageSize,
    shouldInitialFetch,
  })

  const swr = useSWR(
    () => (config.shouldInitialFetch ? `${getKey(key)}${config.param}` : null),
    fetcher,
    options,
  )

  const getData = (val) => {
    if (isFunction(val)) {
      const newQueryManager = new QueryTableManager()
      val(newQueryManager)
      return fetcher(`${getKey(key)}${getParam(newQueryManager)}`)
    }
    return fetcher(`${getKey(key)}/${val}`)
  }

  const fetch = (val) => {
    if (isFunction(val)) {
      val(queryManager)
      const { page, pageSize } = queryManager.queryObject
      setConfig({
        param: `${getParam(queryManager)}`,
        page,
        pageSize,
        shouldInitialFetch: true,
      })
    } else {
      const { page, pageSize } = queryManager.queryObject
      setConfig({
        param: `/${val}`,
        page,
        pageSize,
        shouldInitialFetch: true,
      })
    }
  }

  const { error, data } = swr
  const { page, pageSize } = queryManager.queryObject

  let extraProps = {}

  if (!config.shouldInitialFetch) {
    extraProps = {
      ...extraProps,
      isLoading: false,
      isError: error,
    }
  }

  const mutateByKeyData = (key, data, shouldRevalidate) => {
    const newData = set(swr.data, key, data)
    swr.mutate(newData, shouldRevalidate)
  }

  return {
    isLoading: !error && !data,
    isError: error,
    ...swr,
    ...extraProps,
    page,
    pageSize,
    fetch,
    fetchDebounce: debounce(fetch, 800),
    mutateByKeyData,
    getData,
  }
}

export default useParamSWR
