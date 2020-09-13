import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

export interface ITransform {
  label: string
  value: any
  original: any
  key: any
}

// transform to labelInValue select AntDesign
function transform(
  list,
  labelKey?,
  valueKey?,
  separator?: string | ((values: string | string[], item, index) => string),
): ITransform[] {
  if (!list) return []

  return list.map((item, index) => {
    const name = []
    if (isArray(labelKey)) {
      labelKey.forEach((key) => {
        name.push(get(item, key))
      })
    } else if (isNil(labelKey)) {
      name.push(item)
    } else {
      name.push(get(item, labelKey))
    }

    let value
    if (isNil(valueKey)) {
      value = item
    } else if (isArray(valueKey)) {
      for (let i = 0; i < valueKey.length; i += 1) {
        const val = get(item, valueKey[i])
        if (val !== undefined) {
          value = val
          // stop loop jika value ada
          break
        }
      }
    } else {
      value = get(item, valueKey)
    }

    const label = isFunction(separator)
      ? // @ts-ignore
        separator(name.length <= 1 ? name[0] : name, item, index)
      : // @ts-ignore
        name.join(separator || ' - ')
    return {
      label,
      original: item,
      value,
      key: value,
    }
  })
}

const Lists = {
  transform,
}

export default Lists
