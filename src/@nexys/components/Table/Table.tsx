import ReactTable, { TableProps } from 'react-table-6'
import 'react-table-6/react-table.css'
import cssTable from '@nexys/components/Table/Table.module.scss'
import cx from 'classnames'
import { Col, Row } from 'antd'

function Table<D>(props: Partial<TableProps<D>>) {
  const { className, ...otherProps } = props

  return (
    <div id={cssTable.customTable}>
      <Row>
        <Col xs={24}>
          <ReactTable
            className={cx(className)}
            showPagination={false}
            {...otherProps}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Table
