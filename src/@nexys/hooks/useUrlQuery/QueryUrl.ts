import ArrayQuery, {
  ArrayQueryOptions,
} from '@nexys/hooks/useUrlQuery/ArrayQuery'

export interface QueryUrlOptions {
  filtered?: ArrayQueryOptions
  sorted?: ArrayQueryOptions
  query?: ArrayQueryOptions
}

class QueryUrl {
  public filtered: ArrayQuery

  public sorted: ArrayQuery

  public query: ArrayQuery

  private options: QueryUrlOptions

  constructor(options?: QueryUrlOptions) {
    this.options = { ...options }

    this.filtered = new ArrayQuery({
      keyId: 'id',
      keyValue: 'value',
      filterValue: {
        exclude: [undefined, ''],
      },
      ...this.options.filtered,
    })

    this.sorted = new ArrayQuery({
      keyId: 'id',
      keyValue: 'desc',
      filterValue: {
        only: [true, false],
      },
      ...this.options.sorted,
    })

    this.query = new ArrayQuery({
      filterValue: {
        exclude: [undefined, ''],
      },
      ...this.options.query,
    })
  }
}

export default QueryUrl
