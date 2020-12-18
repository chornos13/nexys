import ArrayQuery from 'helpers/QueryUrl/ArrayQuery'

describe('test basic function', () => {
  test('should set query', () => {
    const sut = new ArrayQuery()
    const id = 'anyId'
    const value = 'anyValue'

    sut.setQuery(id, value)

    expect(sut.find(id)).toBeTruthy()
  })

  test('should not duplicate value query with the same id', () => {
    const sut = new ArrayQuery()
    const id = 'anyId'
    const value = 'anyValue'

    sut.setQuery(id, value)
    sut.setQuery(id, 'anyReplaceValue')

    expect(sut.stringify()).toEqual(
      JSON.stringify([
        {
          id,
          value: 'anyReplaceValue',
        },
      ]),
    )
  })

  test('should remove query with given id', () => {
    const sut = new ArrayQuery()
    const id = 'anyId'
    const value = 'anyValue'

    sut.setQuery(id, value)
    sut.remove(id)

    expect(sut.count(id)).toEqual(0)
  })

  test('should filter value when given with filterValue option', () => {
    const sut = new ArrayQuery({
      filterValue: {
        exclude: [null, undefined, ''],
      },
    })

    sut.setQuery('anyId1', null)
    sut.setQuery('anyId2', undefined)
    sut.setQuery('anyId3', '')
    sut.setQuery('anyId4', 'anyValidValue')

    expect(sut.getQueries().length).toEqual(1)
  })

  test('should remove query when given invalid value with filterValue exclude option', () => {
    const sut = new ArrayQuery({
      filterValue: {
        exclude: [null, undefined, ''],
      },
    })

    sut.setQuery('anyId1', 'anyValidValue')
    sut.setQuery('anyId1', null)
    sut.setQuery('anyId2', 'anyValidValue')
    sut.setQuery('anyId2', undefined)
    sut.setQuery('anyId3', 'anyValidValue')
    sut.setQuery('anyId3', '')

    expect(sut.getQueries().length).toEqual(0)
  })

  test('should remove query when given invalid value with filterValue only option', () => {
    const sut = new ArrayQuery({
      filterValue: {
        only: [true, false],
      },
    })

    sut.setQuery('anyId1', true)
    sut.setQuery('anyId1', 'anyInvalidValue')

    sut.setQuery('anyId2', false)
    sut.setQuery('anyId2', 'anyInvalidValue')

    sut.setQuery('anyId3', 'anyInvalidvalue')

    expect(sut.getQueries().length).toEqual(0)
  })

  test('should stringify value', () => {
    const sut = new ArrayQuery()

    sut.setQuery('anyId', 'anyValue')

    expect(sut.stringify()).toEqual(
      JSON.stringify([
        {
          id: 'anyId',
          value: 'anyValue',
        },
      ]),
    )
  })

  test('should only added valid value with given options filterValue', () => {
    const sut = new ArrayQuery({
      filterValue: {
        only: [true, false],
      },
    })

    sut.setQuery('anyId1', 'anyInvalidValue1')
    sut.setQuery('anyId2', 'anyInvalidValue2')
    sut.setQuery('anyId3', 'anyInvalidValue3')
    sut.setQuery('anyId4', true)
    sut.setQuery('anyId5', false)

    expect(sut.getQueries().length).toEqual(2)
  })

  test('should return count with given id', () => {
    const sut = new ArrayQuery()

    const id = 'anyId'
    sut.setQuery(id, 'anyValue')
    sut.getQueries().filter = jest.fn().mockImplementation((filterFn) => {
      const result = filterFn({
        id,
      })
      return {
        length: result ? 1 : 0,
      }
    })

    expect(sut.count('anyId')).toEqual(1)
  })
})
