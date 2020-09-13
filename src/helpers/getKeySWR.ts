import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isNil from 'lodash/isNil'

function getKeySWR(...keys) {
  return () => {
    let result = []
    keys.forEach((key) => {
      let _key
      if (isFunction(key)) {
        _key = key()
      } else if (isArray(key)) {
        _key = getKeySWR(...key)()
      } else {
        _key = key
      }

      if (isNil(_key)) {
        result = null
        return
      }

      result.push(_key)
    })

    if (result === null) return null

    return result.join('')
  }
}

export default getKeySWR
