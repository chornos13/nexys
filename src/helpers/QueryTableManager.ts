import { cloneDeep, get, isFunction, isNil } from 'lodash'

const startPage = 1

function getArrayById(list: any[], key: any) {
  return list.find((x) => x.id === key)
}

function isValidValue(val): boolean {
  return !isNil(val) && val !== ''
}

const GET_CONFIG = () => ({
  initFilter: {},
  initSorted: {},
  defaultFilter: {},
  initQuery: { page: startPage, pageSize: 10 },
})

export interface IConfig {
  initFilter?: object
  initSorted?: object
  defaultFilter?: object
  initQuery?: {}
}

interface ISetQueryConfig {
  defaultFilter?: any
  valueKey: string
  onInsert: (id, value) => void
  onInvalidValue: (id, value) => void
  onValueChanged: (id, value, data) => void
  onFinish?: () => void
  callback?: () => void
}

async function setQueryArrayValue(
  list: any[],
  id: any,
  value: any,
  configs: ISetQueryConfig,
) {
  const {
    defaultFilter = undefined,
    valueKey,
    onInsert,
    onInvalidValue,
    onValueChanged,
    onFinish,
    callback,
  } = configs || {}
  let curVal = value
  if (isFunction(value)) {
    curVal = value(get(getArrayById(list, id), valueKey))
  }

  // set default filter kalo gk valid
  if (!isValidValue(curVal) && !isNil(get(defaultFilter, id))) {
    curVal = cloneDeep(defaultFilter[id])
  }

  const filter = list.find((x) => x.id === id)
  if (!filter) {
    if (isValidValue(curVal)) {
      onInsert(id, curVal)
    }
  } else if (!isValidValue(curVal)) {
    onInvalidValue(filter.id, curVal)
  } else {
    onValueChanged(id, value, filter)
  }

  if (onFinish) {
    onFinish()
  }

  if (callback) {
    callback()
  }
}

class QueryTableManager {
  readonly configs: {
    defaultFilter: object
    initFilter: object
    initSorted: object
    initQuery: object
  }

  public filtered: { id: string; value: any }[]

  public queryObject: any

  public sorted: { id: string; desc: boolean }[]

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
    this.setSortedByObject(this.configs.initSorted)
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
      filtered: JSON.stringify(this.filtered),
      sorted: JSON.stringify(this.sorted),
      ...this.queryObject,
    }
  }

  setQueryObject = (obj): void => {
    this.isCustomConfig = true
    this.queryObject = obj
  }

  getFilteredValue = (id: any): any => {
    const dataFilter = this.filtered.find((x) => x.id === id)
    return dataFilter?.value
  }

  setFilteredValue = async (id, value, callback?) => {
    return setQueryArrayValue(this.filtered, id, value, {
      valueKey: 'value',
      onInsert: (id, value) => {
        this.filtered.push({
          id,
          value,
        })
      },
      onInvalidValue: (id) => {
        this.filtered = this.filtered.filter((x) => x.id !== id)
      },
      onValueChanged: (id, value) => {
        const curData = this.filtered.find((x) => x.id === id)
        curData.value = value
      },
      onFinish: () => {
        this.setQueryObject({
          ...this.queryObject,
          page: startPage,
        })
      },
      callback,
    })
  }

  resetSorted = () => {
    this.sorted = []
  }

  resetFiltered = () => {
    this.filtered = []
  }

  setSortedValue = (id, desc, reset?: boolean) => {
    if (reset) {
      this.resetSorted()
    }
    return setQueryArrayValue(this.sorted, id, desc, {
      valueKey: 'desc',
      onInsert: (id, value) => {
        this.sorted.push({
          id,
          desc: value,
        })
      },
      onInvalidValue: (id) => {
        this.sorted = this.sorted.filter((x) => x.id !== id)
      },
      onValueChanged: (id, value) => {
        const curData = this.sorted.find((x) => x.id === id)
        curData.desc = value
      },
    })
  }

  setFilteredByObject = (obj, reset?: boolean) => {
    if (reset) {
      this.resetFiltered()
    }
    const filterKeys = Object.keys(obj || {})
    for (let i = 0; i < filterKeys.length; i += 1) {
      const filterKey = filterKeys[i]
      const value = obj[filterKey]
      this.setFilteredValue(filterKey, value)
    }
  }

  async setSortedByObject(obj) {
    const sortedKeys = Object.keys(obj)
    for (let i = 0; i < sortedKeys.length; i += 1) {
      const sortedKey = sortedKeys[i]
      const desc = obj[sortedKey]
      // eslint-disable-next-line no-await-in-loop
      await this.setSortedValue(sortedKey, desc)
    }
  }
}

export default QueryTableManager
