import { renderHook, act } from '@testing-library/react-hooks'
import usePersistedState from '@nexys/hooks/usePersistedState/usePersistedState'

const mockGetItem = jest.fn()
const mockSetItem = jest.fn()
Storage.prototype.getItem = mockGetItem
Storage.prototype.setItem = mockSetItem

describe('basic function persisted state', () => {
  afterEach(() => {
    mockGetItem.mockReset()
    mockSetItem.mockReset()
  })

  test('should return defaultValue if no saved data', () => {
    // arrange
    mockGetItem.mockReturnValue(null)
    const defaultValue = 'anyDefaultValue'
    const { result } = renderHook(() =>
      usePersistedState('anyKey', defaultValue),
    )

    const [value] = result.current
    expect(value).toEqual(defaultValue)
  })

  test('should return stored value for that key if key hook changed', () => {
    // arrange
    mockGetItem.mockImplementation((key) => {
      return {
        anyInitialKey: 'anyValueInitialKey',
        anyChangedKey: 'anyValueChangedKey',
      }[key]
    })
    const { result, rerender } = renderHook(
      (isNewKey) =>
        usePersistedState(
          isNewKey ? 'anyChangedKey' : 'anyInitialKey',
          'anyDefaultValue',
        ),
      {
        initialProps: false,
      },
    )
    expect(result.current[0]).toEqual('anyValueInitialKey')

    // act
    rerender(true)

    // assert
    expect(result.current[0]).toEqual('anyValueChangedKey')
  })

  test('should parsing JSON savedData from stored value', () => {
    // arrange
    const jsonData = JSON.stringify('anyJSONData')
    mockGetItem.mockReturnValue(jsonData)
    const { result } = renderHook(() =>
      usePersistedState('anyKey', 'anyDefaultValue'),
    )

    const [value] = result.current
    expect(value).toEqual(JSON.parse(jsonData))
  })

  test('should return stored value if failed parsing to JSON', () => {
    // arrange
    const invalidJSONData = 'anyInvalidJSONData'
    mockGetItem.mockReturnValue(invalidJSONData)
    const { result } = renderHook(() =>
      usePersistedState('anyKey', 'anyDefaultValue'),
    )

    const [value] = result.current
    expect(value).toEqual(invalidJSONData)
  })

  test('should saved data to localStorage when call setValue', () => {
    // arrange
    const savedData = 'anyStoreData'
    const { result } = renderHook(() =>
      usePersistedState('anyKey', 'anyDefaultValue'),
    )
    mockSetItem.mockImplementation((key, value) => {
      mockGetItem.mockReturnValue(value)
    })

    // act
    const [, setValue] = result.current
    act(() => setValue(savedData))

    expect(mockGetItem.getMockImplementation()()).toEqual(
      JSON.stringify(savedData),
    )
  })
})
