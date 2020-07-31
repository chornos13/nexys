import { Spin } from 'antd'
import React from 'react'
import { IUseParamSWR } from 'hooks/useParamSWR'

function getSearchableProps(swr: IUseParamSWR) {
  return {
    showSearch: true,
    filterOption: false,
    notFoundContent: swr.isLoading ? <Spin size="small" /> : undefined,
    labelInValue: true,
  }
}

export default {
  getSearchableProps,
}
