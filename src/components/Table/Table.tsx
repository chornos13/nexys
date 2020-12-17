import React, { useEffect } from 'react'
import {
  ColumnInstance,
  Row,
  TableOptions,
  TableRowProps,
  useExpanded,
  UseExpandedInstanceProps,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useTable,
} from 'react-table'
import Text from 'components/Typography/Text'
import cx from 'shortcuts/cx'
import { Spin } from 'antd'
import cssTable from './Table.module.scss'

interface RenderRowSubComponentProps {
  row: Row<object>
  rowProps: TableRowProps
  visibleColumns: ColumnInstance[]
}

interface TableProps<Data extends object = {}> extends TableOptions<Data> {
  className?: string
  loading?: boolean
  getRowProps?: (row: Row<Data>) => any
  renderRow?: (renderProps: RenderRowSubComponentProps) => React.ReactNode
  renderRowSubComponent?: (
    renderProps: RenderRowSubComponentProps,
  ) => React.ReactNode
  renderPagination?: (
    renderProps:
      | any
      | (UsePaginationInstanceProps<Data> & UsePaginationState<any>),
  ) => React.ReactNode
}

const Table = (props: TableProps) => {
  const {
    columns,
    data,
    className,
    renderRowSubComponent,
    loading = false,
    renderPagination,
    getRowProps = () => {},
    renderRow,
  } = props

  const skipPageResetRef = React.useRef<boolean>()

  React.useEffect(() => {
    // After the table has updated, always remove the flag
    skipPageResetRef.current = true
  })

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    visibleColumns,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageResetRef.current,
      autoResetExpanded: !skipPageResetRef.current,
      autoResetGroupBy: !skipPageResetRef.current,
      autoResetSelectedRows: !skipPageResetRef.current,
      autoResetSortBy: !skipPageResetRef.current,
      autoResetFilters: !skipPageResetRef.current,
      autoResetRowState: !skipPageResetRef.current,
    } as any,
    useExpanded,
    usePagination,
  ) as any | UseExpandedInstanceProps<any> | UsePaginationInstanceProps<any>

  useEffect(() => {
    gotoPage(0)
  }, [data?.length || 0])

  // Render the UI for your table
  return (
    <div className={cx(cssTable.container, className)}>
      <Spin spinning={loading}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              const rowProps = row.getRowProps(getRowProps(row))
              return (
                <React.Fragment key={rowProps.key}>
                  {renderRow ? (
                    renderRow(rowProps)
                  ) : (
                    <tr {...rowProps}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </td>
                        )
                      })}
                    </tr>
                  )}
                  {/* We could pass anything into this */}
                  {(row as any).isExpanded &&
                    renderRowSubComponent({
                      row,
                      rowProps,
                      visibleColumns,
                    })}
                </React.Fragment>
              )
            })}
            {!(rows?.length >= 1) && (
              <tr>
                <td colSpan={columns.length}>
                  <Text align={'center'}>No Data</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Spin>

      {renderPagination &&
        renderPagination({
          pageOptions,
          pageIndex,
          pageSize,
          gotoPage,
          previousPage,
          nextPage,
          setPageSize,
          canPreviousPage,
          canNextPage,
          total: data?.length || 0,
        })}
    </div>
  )
}

export default Table
