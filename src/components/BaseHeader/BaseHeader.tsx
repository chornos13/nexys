import React, { ReactNode } from 'react'
import Content, { ContentProps } from 'components/Content/Content'
import cssHeader from 'layouts/containers/Public/Header/Header.module.scss'
import { Card, Row } from 'antd'
import cx from 'shortcuts/cx'

interface BaseHeaderProps extends ContentProps {
  children?: ReactNode
  style?: CSSStyleDeclaration & any
  absolute?: boolean
}

function BaseHeader(props: BaseHeaderProps) {
  const {
    absolute,
    children,
    className,
    style,
    styleContainer,
    ...otherProps
  } = props

  return (
    <Content
      {...otherProps}
      component={(props) => <header {...props} />}
      className={cx(cssHeader.container, className)}
      style={{
        padding: 0,
        ...style,
      }}
      styleContainer={{
        ...(absolute
          ? {
              position: 'absolute',
              top: 0,
              width: '100%',
              maxWidth: 576,
            }
          : {}),
        ...styleContainer,
      }}
    >
      <Card bodyStyle={{ padding: 0 }}>
        <Row
          justify={'space-between'}
          align={'middle'}
          style={{
            padding: '8px 16px',
            height: 56,
          }}
        >
          {children}
        </Row>
      </Card>
    </Content>
  )
}

export default BaseHeader
