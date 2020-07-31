import { IUseParamSWR } from 'hooks/useParamSWR'
import { PaginationConfig } from 'antd/lib/pagination'

function getCurrentNumber(
  index: number,
  page: number,
  pageSize: number,
): number {
  return (page - 1) * pageSize + index + 1
}

interface PaginationProps extends PaginationConfig {
  current: number
  pageSize: number
  total: number
  onChange: (page, pageSize) => void
}

function getPaginationProps(swr: IUseParamSWR): PaginationProps {
  return {
    current: swr.page,
    onShowSizeChange: (page, pageSize) => {
      swr.fetch((queryManager) => {
        queryManager.setQueryObject({
          page,
          pageSize,
        })
      })
    },
    onChange: (page, pageSize) => {
      swr.fetch((queryManager) => {
        queryManager.setQueryObject({
          page,
          pageSize,
        })
      })
    },
    pageSize: swr.pageSize,
    total: swr.total,
  }
}

export default { getCurrentNumber, getPaginationProps }
