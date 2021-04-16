import { renderHook } from '@testing-library/react-hooks'
import useValueBreakpoint, {
  breakpoints,
} from '@nexys/hooks/useValueBreakpoint/useValueBreakpoint'
import mockWindowMatchMedia from '@nexys/hooks/useValueBreakpoint/__mocks__/mockWindowMatchMedia'

describe('basic function', () => {
  const configs = {
    xs: 'anyXsValue',
    sm: 'anySmValue',
    md: 'anyMdValue',
    lg: 'anyLgValue',
    xl: 'anyXlValue',
    xxl: 'anyXxlValue',
  }

  test.each(breakpoints)(
    'should return value "%s" that match in breakpoint value',
    (curScreen) => {
      // arrange
      mockWindowMatchMedia(curScreen)
      const { result } = renderHook(() => useValueBreakpoint(configs))
      expect(result.current.value).toBe(configs[curScreen])
    },
  )
})
