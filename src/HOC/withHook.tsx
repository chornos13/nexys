import React from 'react'

function withHook(Component: React.ElementType, hook: () => object) {
  return function WithPropHooks(props) {
    const propHooks = hook()
    return <Component {...props} {...propHooks} />
  }
}

export default withHook
