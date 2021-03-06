import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { Breakpoint, ScreenMap } from 'antd/lib/_util/responsiveObserve'

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
export const priorityBreakpoint = [...breakpoints].reverse()

type UseValueBreakpointConfigs<T> = {
  [key in Breakpoint]?: T
}

function useValueBreakpoint<T>(
  configs: UseValueBreakpointConfigs<T>,
): { screens: ScreenMap; value: T } {
  const curConfigs = { ...configs }
  const screenMap = useBreakpoint()

  for (let i = 0; i < priorityBreakpoint.length; i += 1) {
    const screen = priorityBreakpoint[i]
    const isMatch = screenMap[screen]

    if (isMatch && Object.prototype.hasOwnProperty.call(curConfigs, screen)) {
      return { screens: screenMap, value: curConfigs[screen] }
    }
  }

  // return default value
  return { screens: screenMap, value: curConfigs.xs }
}

export default useValueBreakpoint
