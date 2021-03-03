import { useMemo, useReducer } from 'react'

interface UseToggleConfigs<T> {
  initialToggle?: boolean
  initialState?: T
}

const TOGGLE_ACTION_TYPE = {
  TOGGLE: 'toggle',
  UNTOGGLE: 'untoggle',
}

const INITIAL_COUNTER = 0

function useToggle<T>(configs?: UseToggleConfigs<T>) {
  const { initialToggle = false, initialState = {} } = { ...configs }

  const [data, dispatch] = useReducer(
    ([, prevState, counter], action) => {
      const isToggled = action.type === TOGGLE_ACTION_TYPE.TOGGLE
      return [isToggled, { ...prevState, ...action.state }, counter + 1]
    },
    [initialToggle, initialState, INITIAL_COUNTER],
  )

  const [isToggled, state, counter] = data

  return useMemo(() => {
    function setState(type: 'toggle' | 'untoggle' | string, state) {
      dispatch({
        type,
        state,
      })
    }

    function toggle(state?: T | any) {
      setState(TOGGLE_ACTION_TYPE.TOGGLE, state)
    }

    function untoggle(state?: T | any) {
      setState(TOGGLE_ACTION_TYPE.UNTOGGLE, state)
    }

    function reset() {
      setState(
        initialToggle ? TOGGLE_ACTION_TYPE.TOGGLE : TOGGLE_ACTION_TYPE.UNTOGGLE,
        initialState,
      )
    }

    return {
      isToggled,
      state: state as T,
      toggle,
      untoggle,
      reset,
    }
  }, [counter])
}

export default useToggle
