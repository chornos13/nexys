import ArrayQuery from 'helpers/QueryUrl/ArrayQuery'

class QueryUrl {
  public filtered: ArrayQuery

  public sorted: ArrayQuery

  constructor() {
    this.filtered = new ArrayQuery({
      keyId: 'id',
      keyValue: 'value',
      filterValue: {
        exclude: [undefined, ''],
      },
    })

    this.sorted = new ArrayQuery({
      keyId: 'id',
      keyValue: 'desc',
      filterValue: {
        only: [true, false],
      },
    })
  }
}

export default QueryUrl
