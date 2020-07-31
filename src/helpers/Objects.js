import isObject from 'lodash/isObject'

const toValueStringify = (data) => {
  const keys = Object.keys(data)
  const obj = {}
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    const value = data[key]

    if (isObject(value)) {
      obj[key] = JSON.stringify(value)
    } else {
      obj[key] = data[key]
    }
  }
  return obj
}
const sanitize = (data) => {
  return JSON.parse(toValueStringify({ data }).data)
}

const Objects = {
  toValueStringify,
  sanitize,
}

export default Objects
