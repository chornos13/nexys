interface ArrayQueryOptions {
  keyId?: string
  keyValue?: string
  filterValue?: {
    only?: any[]
    exclude?: any[]
  }
}

interface Queries {
  [key: string]: any
}

class ArrayQuery {
  private keyId: string

  private keyValue: string

  private options: ArrayQueryOptions

  private queries: Queries[] = []

  constructor(options?: ArrayQueryOptions) {
    this.options = options || {}

    const { keyId = 'id', keyValue = 'value' } = this.options
    this.keyId = keyId
    this.keyValue = keyValue
  }

  count(id: string) {
    return this.getQueries().filter((q) => q[this.keyId] === id).length
  }

  setQuery(id: string, value: any) {
    const { filterValue: { exclude, only } = {} } = this.options
    // prevent duplication
    this.remove(id)

    if (only && !only.includes(value)) {
      return
    }

    if (exclude && exclude.includes(value)) {
      return
    }

    this.queries.push({
      [this.keyId]: id,
      [this.keyValue]: value,
    })
  }

  getQueries() {
    return this.queries
  }

  find(id: string) {
    return this.queries.find((query) => query[this.keyId] === id)
  }

  remove(id: string) {
    this.queries = this.queries.filter((query) => query[this.keyId] !== id)
  }

  stringify() {
    return JSON.stringify(this.queries)
  }
}

export default ArrayQuery
