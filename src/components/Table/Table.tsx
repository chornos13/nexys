import ReactTable, { TableProps } from 'react-table-6'
import 'components/Table/Table.scss'

function Table<D>(props: Partial<TableProps<D>>) {
  const { data } = props
  return (
    <ReactTable
      minRows={data ? data.length || 3 : 3}
      pageSize={data ? data.length : 3}
      {...props}
    />
  )
}

export default Table
