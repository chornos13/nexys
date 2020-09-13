import { useRef, useState } from 'react'
import useSWR, { keyInterface, responseInterface, ConfigInterface } from 'swr'
import isFunction from 'lodash/isFunction'
import debounce from 'lodash/debounce'
import set from 'lodash/set'
import QueryTableManager from 'helpers/QueryTableManager'
import queryString from 'query-string'
import Fetcher from 'services/Fetcher'
import getKeySWR from 'helpers/getKeySWR'

type FetchType = (queryManager: QueryTableManager) => void | string

export interface IUseParamSWR<Data = any>
  extends responseInterface<Data, Error> {
  total?: number
  response: Data
  fetch(value: FetchType)
  fetchDebounce(value: FetchType)
  getData(value: FetchType)
  isLoading: boolean
  page: number
  pageSize: number
  isError: object
  mutateByKeyData(
    key: string,
    data?: Data | Promise<Data> | mutateCallback<Data>,
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

function useParamSWR<Data = any>(
  key: keyInterface,
  configs?: IConfigUseParamSWR,
  options?: ConfigInterface,
): IUseParamSWR<Data> {
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

  const fnGetKey = getKeySWR(key, config.param)

  const swr = useSWR(
    config.shouldInitialFetch ? fnGetKey : null,
    fetcher,
    options,
  )

  const getData = (val) => {
    const baseURL = getKeySWR(key)()
    if (isFunction(val)) {
      const newQueryManager = new QueryTableManager()
      val(newQueryManager)
      return fetcher(`${baseURL}${getParam(newQueryManager)}`)
    }
    return fetcher(`${baseURL}/${val}`)
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
    response: data,
    page,
    pageSize,
    fetch,
    fetchDebounce: debounce(fetch, 800),
    mutateByKeyData,
    getData,
  }
}

export default useParamSWR
