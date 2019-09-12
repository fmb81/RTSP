import React from 'react'
import styled from 'styled-components'
import { TableRow, TableCell, Button, Input } from 'components';

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  > button, select {
    margin: 16px 8px;
  }
  > select {
    width: 50px;
  }
`

const options = [10, 20, 50]

const FootTable = ({ limit, offset, total, handlePagination, ...props }) => (
  <TableRow {...props}>
    <TableCell align="right">
      <Wrap>
        <Input type="select" value={limit} onChange={(e) => handlePagination({ limit: e.target.value })}>
          {options.map((v, i) => (<option key={i} value={v}>{v}</option>))}
        </Input>
        <Button disabled={!offset || offset === '0'} onClick={(e) => handlePagination({ offset: parseInt(limit) - parseInt(offset) })}>Prev</Button>
        <Button disabled={(parseInt(limit) + parseInt(offset)) > total} onClick={(e) => handlePagination({ offset: parseInt(limit) + parseInt(offset) })}>Next</Button>
      </Wrap>
    </TableCell>
  </TableRow>
)

export default FootTable