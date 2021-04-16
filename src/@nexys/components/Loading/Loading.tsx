import React from 'react'
import { Spin } from 'antd'
import cx from 'classnames'
import cssLoading from '@nexys/components/Loading/Loading.module.scss'

const Loading = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={cx(cssLoading.loading)} ref={ref}>
      <Spin size="large" />
      <p>Loading...</p>
    </div>
  )
}) as any

export default Loading
