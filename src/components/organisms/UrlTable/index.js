import React from 'react'
import { withTable } from 'containers'
import { Table, TableRow, TableCell, FootTable, Link } from 'components'

export const UrlTable = ({ list, loading, failed, ...props }) => {
  return (
    <Table
      foot={<FootTable {...props} />}
      {...props}
    >
      {!list.length && loading && <div>Loading</div>}
      {failed && <div>Something went wrong while fetching urls. Please, try again later.</div>}
      {list.map(({ url, record_id }, i) => (
        <TableRow key={i}>
          <TableCell>
            <Link to={{
              pathname: `/streaming/${record_id}`,
              state: { modal: true }
            }}
            >
              {url}
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  )
}

export default withTable(UrlTable, { url: '/urls' })