import React, { CSSProperties, ReactNode } from 'react'
import PropTypes from 'shortcuts/PropTypes'
import cx from 'shortcuts/cx'
import cssContent from 'components/Layout/Content.module.scss'
import { ReactComponentLike } from 'prop-types'

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

interface ContentProps {
  classNameContainer?: string
  styleContainer?: CSSProperties
  className?: string
  style?: CSSProperties
  children?: ReactNode | string
  isComponentContainer?: boolean
  isFullHeight?: boolean
  component?: ReactComponentLike
}

function Content(props: ContentProps) {
  const {
    classNameContainer,
    styleContainer,
    children,
    component: Component = Section,
    className,
    style,
    isComponentContainer,
    isFullHeight,
    ...comProps
  } = props

  let extraStyle = {}

  if (isFullHeight) {
    extraStyle = { ...extraStyle, height: '100%' }
  }

  const containerProps = {
    className: cx(cssContent.container, classNameContainer),
    style: { ...styleContainer, ...extraStyle },
  }

  const sectionProps = {
    className: cx(cssContent.section, className),
    style: {
      ...style,
      ...extraStyle,
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

export default Content
