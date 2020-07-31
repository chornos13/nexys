import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'
import isNil from 'lodash/isNil'

// transform to labelInValue select AntDesign
function transform(list, labelKey, valueKey, separator = ' - ') {
  if (!list) return []

  return list.map((item) => {
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

    let value = get(item, valueKey)
    if (isNil(valueKey)) {
      value = item
    }

    const label = isFunction(separator)
      ? separator(name.length <= 1 ? name[0] : name)
      : name.join(separator)
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
