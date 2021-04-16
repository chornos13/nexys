import { renderHook, act } from '@testing-library/react-hooks'
import useToggle from '@nexys/hooks/useToggle/useToggle'

describe('basic function', () => {
  test('should isToggled false for default state', () => {
    // arrange
    const { result } = renderHook(() => useToggle())

    // assert
    expect(result.current.isToggled).toEqual(false)
  })

  test('should set default state when passing argument configs', () => {
    // arrange
    const initialState = {
      anyDefaultState: 'anyDefaultValue',
    }
    const { result } = renderHook(() =>
      useToggle({
        initialToggle: true,
        initialState,
      }),
    )

    // assert
    expect(
      result.current.isToggled === true &&
        result.current.state === initialState,
    ).toBeTruthy()
  })

  test('should set isToggled true when call toggle function', () => {
    // arrange
    const { result } = renderHook(() => useToggle())

    // act
    act(() => {
      result.current.toggle()
    })

    // assert
    expect(result.current.isToggled).toEqual(true)
  })

  test('should set isToggled false when call untoggle function', () => {
    // arrange
    const { result } = renderHook(() => useToggle())

    // act
    act(() => {
      result.current.untoggle()
    })

    // assert
    expect(result.current.isToggled).toEqual(false)
  })

  test('should set state when passing argument state in toggle function', () => {
    // arrange
    const state = {
      anyData: 'anyValue',
    }
    const { result } = renderHook(() => useToggle())

    // act
    act(() => {
      result.current.toggle(state)
    })

    // assert
    expect(result.current.state).toEqual(state)
  })

  test('should set state when passing argument state in untoggle function', () => {
    // arrange
    const state = {
      anyData: 'anyValue',
    }
    const { result } = renderHook(() => useToggle())

    // act
    act(() => {
      result.current.untoggle(state)
    })

    // assert
    expect(result.current.state).toEqual(state)
  })

  test('should merge state when set a new state', () => {
    // arrange
    const initialState = {
      anyInitialData: 'anyInitialValue',
    }
    const firstNewState = {
      anyFirstData: 'anyFirstValue',
    }
    const newState = {
      anyNewData: 'anyNewValue',
    }
    const { result } = renderHook(() =>
      useToggle({
        initialState,
      }),
    )

    // act
    act(() => {
      result.current.toggle(firstNewState)
      result.current.toggle(newState)
    })

    // assert
    expect(result.current.state).toEqual({
      ...initialState,
      ...firstNewState,
      ...newState,
    })
  })

  test('should reset state to initial value when call reset function', () => {
    // arrange
    const initialState = {
      anyInitialData: 'anyInitialValue',
    }
    const initialToggle = false
    const { result } = renderHook(() =>
      useToggle({
        initialToggle,
        initialState,
      }),
    )

    // act
    act(() => {
      result.current.toggle({
        anyInitialData: 'anyChangedValue',
      })

      result.current.reset()
    })

    // assert
    expect(result.current.state).toEqual(initialState)
    expect(result.current.isToggled).toEqual(initialToggle)
  })
})
