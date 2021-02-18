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
  const _configs = { ...configs }
  const screenMap = useBreakpoint()
  let value = _configs.xs
  const curBreakpoints = priorityBreakpoint.map((key) => {
    return [key, screenMap[key]]
  })

  for (let i = 0; i < curBreakpoints.length; i += 1) {
    const [screen, isMatch] = curBreakpoints[i]

    if (isMatch && Object.prototype.hasOwnProperty.call(_configs, screen)) {
      value = _configs[screen]
      break
    }
  }

  return { screens: screenMap, value }
}

export default useValueBreakpoint
