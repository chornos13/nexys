import React from 'react'
import { Typography } from 'antd'
import cx from 'classnames'
import ErrorView from 'fields/HOC/ErrorView/ErrorView'
import cssWithTitleAndError from 'fields/HOC/ErrorView/withTitleAndError.module.scss'

const { Text } = Typography

function withTitleAndError(Content) {
  return function TitleAndError(formikProps) {
    const { field, required, title } = formikProps
    return (
      <div
        className={cx(cssWithTitleAndError.customFieldsInput)}
        style={
          {
            // marginTop: title ? 20 : 0,
          }
        }
      >
        <Text className={cx(cssWithTitleAndError.customTitle)}>
          {title}
          {title && required && (
            <div className={cx(cssWithTitleAndError.requiredLabel)}>*</div>
          )}
        </Text>
        <Content {...formikProps} />
        <ErrorView name={field.name} />
      </div>
    )
  }
}

export default withTitleAndError
