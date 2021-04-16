export interface ArrayQueryOptions {
  keyId?: string
  keyValue?: string
  filterValue?: {
    only?: any[]
    exclude?: any[]
  }
  initialValue?: Queries
  defaultValue?: Queries
}

interface Queries {
  [key: string]: any
}

class ArrayQuery {
  private keyId: string

  private keyValue: string

  private options: ArrayQueryOptions

  private queries: Queries = {}

  constructor(options?: ArrayQueryOptions) {
    this.options = { ...options }

    const {
      keyId = 'id',
      keyValue = 'value',
      initialValue = {},
      defaultValue = {},
    } = this.options

    this.keyId = keyId
    this.keyValue = keyValue
    this.queries = {
      ...initialValue,
      ...defaultValue,
    }
  }

  isExist(id: string) {
    return id in this.queries
  }

  private insert(id: string, value: any) {
    this.queries = {
      ...this.queries,
      [id]: value,
    }
  }

  private setDefaultValueIfExists(id: string) {
    const { defaultValue } = this.options
    if (defaultValue && id in defaultValue) {
      this.insert(id, defaultValue[id])
    }
  }

  set(id: string, value: any) {
    const { filterValue: { exclude, only } = {} } = this.options
    // prevent duplication
    this.remove(id)

    if (only && !only.includes(value)) {
      this.setDefaultValueIfExists(id)
      return
    }

    if (exclude && exclude.includes(value)) {
      this.setDefaultValueIfExists(id)
      return
    }

    this.insert(id, value)
  }

  count() {
    return Object.keys(this.queries).length
  }

  find(id: string) {
    return this.queries[id]
  }

  remove(id: string) {
    delete this.queries[id]
  }

  get() {
    return {
      ...this.queries,
    }
  }

  toArrayStringify() {
    if (this.count() === 0) {
      return undefined
    }

    return JSON.stringify(
      Object.entries(this.queries).map((query) => {
        const [key, val] = query
        return {
          [this.keyId]: key,
          [this.keyValue]: val,
        }
      }),
    )
  }
}

export default ArrayQuery
