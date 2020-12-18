import QueryUrl from 'helpers/QueryUrl/QueryUrl'

describe('test basic query url', () => {
  test('should add filtered', () => {
    const queryUrl = new QueryUrl()

    queryUrl.filtered.setQuery('anyId', 'anyValue')

    expect(queryUrl.filtered.toArrayStringify()).toEqual(
      JSON.stringify([
        {
          id: 'anyId',
          value: 'anyValue',
        },
      ]),
    )
  })

  test('should add sorted', () => {
    const queryUrl = new QueryUrl()

    queryUrl.sorted.setQuery('anyId', true)

    expect(queryUrl.sorted.toArrayStringify()).toEqual(
      JSON.stringify([
        {
          id: 'anyId',
          desc: true,
        },
      ]),
    )
  })
})
