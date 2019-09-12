import React from 'react'
import { shallow } from 'enzyme'
import FormikField from '.'

let form
let field
const wrap = (props = {}) => shallow(<FormikField {...{ form, field, ...props }} />)

beforeEach(() => {
  form = {
    touched: { test: false },
    errors: { test: null },
  }
  field = {
    name: 'test',
  }
})

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})

it('renders input props when passed in', () => {
  const wrapper = wrap()
  expect(wrapper.find({ name: 'test' })).toHaveLength(1)
})

it('does not render invalid when was not touched', () => {
  const wrapper = wrap()
  expect(wrapper.find({ invalid: true }).length).toBe(0)
  wrapper.setProps({ form: { errors: { test: 'Error' }, touched: {} } })
  expect(wrapper.find({ invalid: true }).length).toBe(0)
})

it('does not render invalid when has no error', () => {
  const wrapper = wrap()
  expect(wrapper.find({ invalid: true }).length).toBe(0)
  wrapper.setProps({ form: { touched: { test: true }, errors: {} } })
  expect(wrapper.find({ invalid: true }).length).toBe(0)
})

it('renders invalid when was touched and has error', () => {
  const wrapper = wrap({ form: { touched: { test: true }, errors: { test: 'Error' } } })
  expect(wrapper.find({ invalid: true })).toHaveLength(1)
})
