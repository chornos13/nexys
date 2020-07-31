import { cloneDeep, get, isFunction, isNil } from 'lodash'

const startPage = 1

const GET_CONFIG = () => ({
  initFilter: {},
  defaultFilter: {},
  initQuery: { page: startPage, pageSize: 10 },
})

interface IConfig {
  initFilter?: object
  defaultFilter?: object
  initQuery?: {}
}

class QueryTableManager {
  readonly configs: {
    defaultFilter: object
    initFilter: object
    initQuery: object
  }

  private filtered: { id: string; value: any }[]

  public queryObject: any

  private sorted: { id: string; desc: boolean }[]

  private isCustomConfig: boolean = false

  constructor(configs?: IConfig) {
    if (configs) {
      this.isCustomConfig = true
    }

    const defaultConfig = GET_CONFIG()

    this.configs = {
      ...defaultConfig,
      ...configs,
    }
    this.filtered = []
    this.sorted = []
    this.queryObject = {
      ...defaultConfig.initQuery,
      ...cloneDeep(this.configs.initQuery),
    }

    this.setFilteredByObject(this.configs.initFilter)
    this.setFilteredByObject(this.configs.defaultFilter)
  }

  isContainQuery(): boolean {
    const { filtered, sorted, queryObject } = this
    return (
      Boolean(filtered.length) ||
      Boolean(sorted.length) ||
      (this.isCustomConfig && Boolean(Object.keys(queryObject).length))
    )
  }

  getStringifyQuery(): object {
    return {
      ...this.queryObject,
      filtered: JSON.stringify(this.filtered),
      sorted: JSON.stringify(this.sorted),
    }
  }

  setQueryObject = (obj): void => {
    this.isCustomConfig = true
    this.queryObject = obj
  }

  isValidFilterValue = (val): boolean => {
    return !isNil(val) && val !== ''
  }

  getFilterByKey = (key): { id: string; value: any } | null | undefined => {
    return this.filtered.find((x) => x.id === key)
  }

  setFilteredValue = async (id, value, callback?) => {
    const { defaultFilter } = this.configs
    let curVal = value
    if (isFunction(value)) {
      curVal = await value(get(this.getFilterByKey(id), 'value'))
    }

    // set default filter kalo gk valid
    if (!this.isValidFilterValue(curVal) && !isNil(get(defaultFilter, id))) {
      curVal = cloneDeep(defaultFilter[id])
    }

    const filter = this.filtered.find((x) => x.id === id)
    if (!filter) {
      if (this.isValidFilterValue(curVal)) {
        this.filtered.push({
          id,
          value: curVal,
        })
      }
    } else if (!this.isValidFilterValue(curVal)) {
      this.filtered = this.filtered.filter((x) => x.id !== filter.id)
    } else {
      filter.value = curVal
    }
    this.setQueryObject({
      ...this.queryObject,
      page: startPage,
    })
    if (callback) {
      callback()
    }
  }

  setSortedValue(id, desc, callback?) {
    const sorted = this.sorted.find((x) => x.id === id)
    if (!sorted) {
      this.sorted.push({
        id,
        desc,
      })
    } else {
      sorted.desc = desc
    }

    if (callback) {
      callback()
    }
  }

  setFilteredByObject = (obj) => {
    const filterKeys = Object.keys(obj)
    for (let i = 0; i < filterKeys.length; i += 1) {
      const filterKey = filterKeys[i]
      const value = obj[filterKey]
      this.setFilteredValue(filterKey, value)
    }
  }

  setSorted(value) {
    this.sorted = [...(value || [])]
  }
}

export default QueryTableManager
