import React from 'react'
import isObject from 'lodash/isObject'
import PropTypes from 'shortcuts/PropTypes'

export const WithToggleProps = PropTypes.shape({
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
})

interface WithTogglePropsTS {
  isOpen: boolean
  toggle: void
}

interface WithToggleArgs {
  Component: React.ElementType
  toggles: object | string
}

function withToggle(configs: WithToggleArgs) {
  const { Component, toggles } = configs

  const curToggles = isObject(toggles)
    ? toggles
    : { [toggles as string]: false }

  return class WithModalProps extends React.Component<WithTogglePropsTS, {}> {
    constructor(props) {
      super(props)

      const createState = (propsKey, initProps) => {
        const extraProps =
          initProps === true ? { isOpen: true } : { ...initProps }
        return {
          [propsKey]: {
            isOpen: false,
            ...extraProps,
            toggle: () => {
              const { state } = this

              const curState = state[propsKey]
              const { isOpen } = curState
              curState.isOpen = !isOpen

              this.setState({
                [propsKey]: curState,
              })
            },
          },
        }
      }

      const keys = Object.keys(curToggles)
      this.state = keys.reduce((acc, key) => {
        let curAcc = acc

        curAcc = {
          ...curAcc,
          ...createState(key, curToggles[key] || {}),
        }
        return curAcc
      }, {})
    }

    render() {
      const { state } = this

      return <Component {...this.props} {...state} />
    }
  }
}

export default withToggle
