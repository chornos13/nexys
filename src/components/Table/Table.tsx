import ReactTable, { TableProps } from 'react-table-6'
import 'components/Table/Table.scss'

function Table<D>(props: Partial<TableProps<D>>) {
  return <ReactTable minRows={1} pageSize={10} {...props} />
}

export default Table
