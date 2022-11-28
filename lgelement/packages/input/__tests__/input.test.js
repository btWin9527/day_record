import input from '../src/input.vue';
import {mount} from "@vue/test-utils";

describe('lg-input', () => {
  // 测试是否包含input type="text"
  test('input-text', () => {
    const wrapper = mount(input)
    expect(wrapper.html()).toContain('input type="text"')
  })

  // 测试是否包含 input type="password"
  test('input-text', () => {
    const wrapper = mount(input, {
      propsData: {
        type: 'password'
      }
    })
    expect(wrapper.html()).toContain('input type="password"')
  })

  // 测试密码是否和传入的一致
  test('input-text', () => {
    const wrapper = mount(input, {
      propsData: {
        type: 'password',
        value: 'admin'
      }
    })
    expect(wrapper.props('value')).toBe('admin')
  })

  // 生成快照
  test('input-snapshot', () => {
    const wrapper = mount(input, {
      propsData: {
        type: 'password',
        value: 'admin'
      }
    })
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})