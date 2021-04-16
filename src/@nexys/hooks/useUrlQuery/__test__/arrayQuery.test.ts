import ArrayQuery from '@nexys/hooks/useUrlQuery/ArrayQuery'

describe('test basic function', () => {
  test('should set query', () => {
    const sut = new ArrayQuery()
    const id = 'anyId'
    const value = 'anyValue'

    sut.set(id, value)

    expect(sut.find(id)).toBeTruthy()
  })

  test('should not duplicate value query with the same id', () => {
    const sut = new ArrayQuery()
    const id = 'anyId'
    const value = 'anyValue'

    sut.set(id, value)
    sut.set(id, 'anyReplaceValue')

    expect(sut.toArrayStringify()).toEqual(
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

    sut.set(id, value)
    sut.remove(id)

    expect(sut.isExist(id)).toEqual(false)
  })

  test('should filter value when given with filterValue option', () => {
    const sut = new ArrayQuery({
      filterValue: {
        exclude: [null, undefined, ''],
      },
    })

    sut.set('anyId1', null)
    sut.set('anyId2', undefined)
    sut.set('anyId3', '')
    sut.set('anyId4', 'anyValidValue')

    expect(sut.count()).toEqual(1)
  })

  test('should remove query when given invalid value with filterValue exclude option', () => {
    const sut = new ArrayQuery({
      filterValue: {
        exclude: [null, undefined, ''],
      },
    })

    sut.set('anyId1', 'anyValidValue')
    sut.set('anyId1', null)
    sut.set('anyId2', 'anyValidValue')
    sut.set('anyId2', undefined)
    sut.set('anyId3', 'anyValidValue')
    sut.set('anyId3', '')

    expect(sut.count()).toEqual(0)
  })

  test('should remove query when given invalid value with filterValue only option', () => {
    const sut = new ArrayQuery({
      filterValue: {
        only: [true, false],
      },
    })

    sut.set('anyId1', true)
    sut.set('anyId1', 'anyInvalidValue')

    sut.set('anyId2', false)
    sut.set('anyId2', 'anyInvalidValue')

    sut.set('anyId3', 'anyInvalidvalue')

    expect(sut.count()).toEqual(0)
  })

  test('should stringify value', () => {
    const sut = new ArrayQuery()

    sut.set('anyId', 'anyValue')

    expect(sut.toArrayStringify()).toEqual(
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

    sut.set('anyId1', 'anyInvalidValue1')
    sut.set('anyId2', 'anyInvalidValue2')
    sut.set('anyId3', 'anyInvalidValue3')
    sut.set('anyId4', true)
    sut.set('anyId5', false)

    expect(sut.count()).toEqual(2)
  })

  test('should return isExist with given id', () => {
    const sut = new ArrayQuery()

    const id = 'anyId'
    sut.set(id, 'anyValue')

    expect(sut.isExist('anyId')).toEqual(true)
  })

  test('should set initial value with given initalValue', () => {
    const sut = new ArrayQuery({
      initialValue: {
        anyId: 'anyValue',
      },
    })

    expect(sut.isExist('anyId')).toEqual(true)
  })

  test('should set default value when set in options', () => {
    const sut = new ArrayQuery({
      defaultValue: {
        anyId: 'anyValue',
      },
    })

    expect(sut.isExist('anyId')).toEqual(true)
  })

  test('should set default value when given invalid value in exclude filterValue', () => {
    const sut = new ArrayQuery({
      defaultValue: {
        anyId: 'anyValue',
      },
      filterValue: {
        exclude: ['anyInvalidValue'],
      },
    })

    sut.set('anyId', 'anyInvalidValue')

    expect(sut.isExist('anyId')).toEqual(true)
  })

  test('should set default value when given invalid value in only filterValue', () => {
    const sut = new ArrayQuery({
      defaultValue: {
        anyId: 'anyValue',
      },
      filterValue: {
        only: ['anyValidValue'],
      },
    })

    sut.set('anyId', 'anyInvalidValue')

    expect(sut.isExist('anyId')).toEqual(true)
  })
})
