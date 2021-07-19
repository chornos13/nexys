import ReactTable, { TableProps } from 'react-table-6'
import 'react-table-6/react-table.css'
import cssTable from '@nexys/components/Table/Table.module.scss'
import cx from 'classnames'
import { Col, Row } from 'antd'
import withFixedColumns from 'react-table-hoc-fixed-columns'
import 'react-table-hoc-fixed-columns/lib/styles.css'

const ReactTableFixedColumns = withFixedColumns(ReactTable)

function TableFixedColumns<D>(props: Partial<TableProps<D>>) {
  const { className, ...otherProps } = props

  return (
    <div id={cssTable.customTable}>
      <Row>
        <Col xs={24}>
          <ReactTableFixedColumns
            className={cx(className)}
            {...otherProps}
            // @ts-ignore
            showPagination={false}
          />
        </Col>
      </Row>
    </div>
  )
}

export default TableFixedColumns
