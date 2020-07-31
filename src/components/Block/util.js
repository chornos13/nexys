const _ = require('lodash')

const arrBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const arrPriorityBreakpoints = [...arrBreakpoints].reverse()

function getSize(matches, value) {
  const mapScreenValue = {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: null,
  }
  if (!_.isObject(value)) {
    mapScreenValue.xs = value
  } else {
    arrPriorityBreakpoints.forEach((breakpoint) => {
      mapScreenValue[breakpoint] = value[breakpoint]
    })
  }

  for (let i = 0; i < arrPriorityBreakpoints.length; i += 1) {
    const breakpoint = arrPriorityBreakpoints[i]
    const isMatch = matches[breakpoint]
    const value = mapScreenValue[breakpoint]
    if (isMatch && value) {
      return value
    }
  }

  return mapScreenValue.xs
}

module.exports = {
  getSize,
}
