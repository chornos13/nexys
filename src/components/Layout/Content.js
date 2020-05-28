import React from 'react'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssContent from 'components/Layout/Content.module.scss'

export function Section(props) {
  const { children, ...comProps } = props
  return <section {...comProps}>{children}</section>
}

Section.propTypes = {
  children: PropTypes.node,
}

export function Div(props) {
  const { children, ...comProps } = props
  return <div {...comProps}>{children}</div>
}

Div.propTypes = {
  children: PropTypes.node,
}

function Content(props) {
  const {
    classNameContainer,
    styleContainer,
    children,
    component: Component,
    className,
    style,
    isComponentContainer,
    ...comProps
  } = props
  const containerProps = {
    className: cx(cssContent.container, classNameContainer),
    style: styleContainer,
  }

  const sectionProps = {
    className: cx(cssContent.section, className),
    style: {
      ...style,
    },
  }

  if (isComponentContainer) {
    return (
      <Component {...containerProps}>
        <div {...sectionProps} {...comProps}>
          {children}
        </div>
      </Component>
    )
  }

  return (
    <div {...containerProps}>
      <Component {...sectionProps} {...comProps}>
        {children}
      </Component>
    </div>
  )
}

Content.defaultProps = {
  component: Section,
}

Content.propTypes = {
  classNameContainer: PropTypes.string,
  styleContainer: PropTypes.shape(PropTypes.object),
  className: PropTypes.string,
  style: PropTypes.shape(PropTypes.object),
  children: PropTypes.node,
  isComponentContainer: PropTypes.bool,
  component: PropTypes.func,
}

export default Content
