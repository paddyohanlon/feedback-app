import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseInput from '../BaseInput.vue'

// This is trivial
// Would be good to test the form submission (not trivial!)
describe('BaseInput', () => {
  it('renders properly', () => {
    const wrapper = mount(BaseInput, { props: { name: 'email', type: 'email' } })

    const input = wrapper.find('input')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('type')).toBe('email')
  })
})
