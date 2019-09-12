import React from 'react'
import { shallow } from 'enzyme'
import { withFormik } from 'formik'
import { SignUpForm as Form } from '.'

const wrap = (props = {}) => shallow(<Form {...props} />)

it('disables button while submitting', () => {
  const wrapper = wrap()
  expect(wrapper.find({ disabled: true }).length).toBe(0)
  wrapper.setProps({ isSubmitting: true })
  expect(wrapper.find({ disabled: true })).toHaveLength(1)
})