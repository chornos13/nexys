import QueryUrl from '@nexys/hooks/useUrlQuery/QueryUrl'

describe('test basic query url', () => {
  test('should add filtered', () => {
    const queryUrl = new QueryUrl()

    queryUrl.filtered.set('anyId', 'anyValue')

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

    queryUrl.sorted.set('anyId', true)

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
