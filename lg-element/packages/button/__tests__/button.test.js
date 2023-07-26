import elButton from "../src/button.vue";
import {mount} from "@vue/test-utils";

describe('lgButton', () => {
  /**
   * Wrapper常用方法
   * Wrapper：Wrapper 是一个包括了一个挂载组件或 vnode，以及测试该组件或 vnode 的方法。
   * Wrapper.vm：这是该 Vue 实例。你可以通过 wrapper.vm 访问一个实例所有的方法和属性。
   * Wrapper.classes: 返回是否拥有该class的dom或者类名数组。
   * Wrapper.find：返回第一个满足条件的dom。
   * Wrapper.findAll：返回所有满足条件的dom。
   * Wrapper.html：返回html字符串。
   * Wrapper.text：返回内容字符串。
   * Wrapper.setData：设置该组件的初始data数据。
   * Wrapper.setProps：设置该组件的初始props数据。  （这是使用了，但没有效果）
   * Wrapper.trigger：用来触发事件。
   */

  /**
   * Jest-Api
   * toBeNull：判断是否为null
   * toBeUndefined：判断是否为undefined
   * toBeDefined：与上相反
   * toBeNaN：判断是否为NaN
   * toBeTruthy：判断是否为true
   * toBeFalsy：判断是否为false
   * toContain：数组用，检测是否包含
   * toHaveLength：数组用，检测数组长度
   * toEqual：对象用，检测是否相等
   * toThrow：异常匹配
   */
  test('button.vue', () => {
    const wrapper = mount(elButton, {
      propsData: {
        label: 'test'
      }
    })
    console.log(wrapper.classes())	//['jest']
    console.log(wrapper.classes('jest'))	//true
    console.log(wrapper.findAll('.storybook-button'))	//返回dom数组  wrapperArray { selector: '.name' }
    console.log(wrapper.findAll('.storybook-button').at(0))	//取dom数组中的第一个
  })
})
