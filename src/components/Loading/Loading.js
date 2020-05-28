import React from 'react'
import { Spin } from 'antd'
import cx from 'classnames'
import cssLoading from './Loading.module.scss'

const Loading = React.forwardRef((props, ref) => {
  return (
    <div className={cx(cssLoading.loading)} ref={ref}>
      <Spin size="large" />
      <p>Loading...</p>
    </div>
  )
})

export default Loading
