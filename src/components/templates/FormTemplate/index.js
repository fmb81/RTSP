import React from 'react'
import styled from 'styled-components'
import { prop } from 'styled-tools'
import { Form } from 'formik'
import { Block } from 'components'

const Wrap = styled(Form)`
    width: ${prop('w', '320')}px;
    margin: auto;
    padding: 24px 16px;
    border-radius: 0 0 4px 4px;	
    background-color: #FFFFFF;	
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.15);
    > a {
      display: block;
      margin: 16px 0 0;
      text-align: right;
    }
}
`

const FormTemplate = ({ children, ...props }) => (
  <Wrap {...props}>
    {children}
  </Wrap>
)

export default FormTemplate
