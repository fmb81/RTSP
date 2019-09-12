import React from 'react'
import { shallow } from 'enzyme'
import { UrlTable } from '.'

const list = [
  { record_id: 1, url: 'url 1' },
  { record_id: 2, url: 'url 2' },
  { record_id: 3, url: 'url 3' },
]

const wrap = (props = {}) => shallow(<UrlTable list={list} {...props} />)

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})

it('renders loading when passed in', () => {
  const wrapper = wrap({ loading: true, list: [] })
  expect(wrapper.contains('Loading')).toBe(true)
})

it('renders failed when passed in', () => {
  const wrapper = wrap({ failed: true, list: [] })
  expect(wrapper.find('div')).toHaveLength(1)
})