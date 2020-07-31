import React from 'react'
import { PaginationProps } from 'antd/lib/pagination/Pagination'
import { Pagination as CurPagination } from 'antd'
import cx from 'shortcuts/cx'
import cssPagination from 'components/Pagination/Pagination.module.scss'

interface CurPaginationProps extends PaginationProps {
  isNoContainer?: boolean
}

function Pagination(props: CurPaginationProps) {
  const { className, isNoContainer, ...otherProps } = props
  if (isNoContainer) {
    return <CurPagination simple className={cx(className)} {...otherProps} />
  }

  return (
    <div className={cx(cssPagination.containerBorder)}>
      <CurPagination
        simple
        className={cx(className, cssPagination.customPagination)}
        {...otherProps}
      />
    </div>
  )
}

export default Pagination
