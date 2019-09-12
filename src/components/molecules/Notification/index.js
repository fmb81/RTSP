import React from 'react'
import styled from 'styled-components'
import withUser from 'services/user-context'
import { Block } from 'components'

const Wrap = styled(Block)`
  width: 100%;
  margin-top: 55px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  > div {
    padding: 8px 16px;
    margin: auto;
    background-color: #ffffff;
    > p {
      margin: 0;
      font-weight: 700;
    }
  }
`

const Notification = ({ message }) => (
  <Wrap>
    {
      message && (
        <div data-test-id="notification">
          <p>{message}</p>
        </div>
      )
    }
  </Wrap>
)

export default withUser(Notification)
