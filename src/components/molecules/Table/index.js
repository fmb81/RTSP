import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const StyledTable = styled.table`
  font-family: ${font('primary')};
  border-collapse: collapse;
  width: 100%;
  border: 1px solid ${palette('grayscale', 1, true)};
  color: ${palette('grayscale', 0)};
`

const Table = ({
  caption, head, foot, children, ...props
}) => {
  const { reverse } = props
  return (
    <StyledTable {...props}>
      {head && <thead>{head}</thead>}
      {foot && <tfoot>{foot}</tfoot>}
      <tbody>{children}</tbody>
    </StyledTable>
  )
}

Table.propTypes = {
  caption: PropTypes.string,
  head: PropTypes.node,
  foot: PropTypes.node,
  children: PropTypes.any,
  reverse: PropTypes.bool,
}

export default Table