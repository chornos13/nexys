import React, { useMemo } from 'react'
import { List, Row, Col, Input, Pagination } from 'antd'
import useProfession from 'data/useProfession'

function BasicViewData() {
  /*
   url?page=1&pageSize=10
   */
  const qProfession = useProfession(
    {
      query: {
        initialValue: {
          page: 1,
          pageSize: 10,
        },
      },
    },
    {
      keepPreviousData: true,
    },
  )

  const { page, pageSize } = qProfession.helpers.query.get()

  const [curPage, curPageSize] = useMemo(() => {
    return [page, pageSize]
  }, [qProfession.dataUpdatedAt])

  return (
    <List
      header={
        <Row gutter={[0, 10]}>
          <Col xs={24}>
            <Input.Search
              style={{ maxWidth: 500 }}
              placeholder={'Cari Profesi'}
              onChange={(event) => {
                const { value } = event.target
                qProfession.helpers.setQuerySyncDebounce((helper) => {
                  helper.filtered.set('name', value)
                  helper.query.set('page', 1)
                })
              }}
            />
          </Col>
          <Col xs={24}>
            <Pagination
              onChange={(page, pageSize) => {
                qProfession.helpers.setQuerySync((helper) => {
                  helper.query.set('page', page)
                  helper.query.set('pageSize', pageSize)
                })
              }}
              disabled={qProfession.isLoading || qProfession.isPreviousData}
              pageSize={pageSize || 10}
              current={page || 1}
              total={qProfession.total}
              showSizeChanger
              showTotal={(total, range) => {
                return `${range.join('-')} of ${total}`
              }}
            />
          </Col>
        </Row>
      }
      dataSource={qProfession.data}
      loading={qProfession.isLoading || qProfession.isPreviousData}
      renderItem={(profesi, index) => {
        return (
          <List.Item>
            <List.Item.Meta
              avatar={index + 1 + (curPage - 1) * curPageSize}
              title={profesi.name}
            />
          </List.Item>
        )
      }}
    />
  )
}

export const $metadata = {
  title: 'Basic Get Data (Filter/Pagination)',
  description: 'This example show you how to use react-query with querying',
}

export default BasicViewData
