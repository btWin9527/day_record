import Vue from 'vue'

/**
 * 深拷贝数据
 * @param target
 */
export const deepCopy = (target) => {
  if (typeof target == 'object') {
    const result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      result[key] = typeof target[key] === 'object' ? deepCopy(target[key]) : target[key]
    }
    return result
  }
  return target
}

/**
 * @method 交换vue实例下数组中的某两个数据
 * @param arr
 * @param i 下标1
 * @param j 下标2
 */
export const swap = (arr, i, j) => {
  const temp = arr[i]
  Vue.set(arr, i, arr[j])
  Vue.set(arr, j, temp)
}

export function $(selector) {
  return document.querySelector(selector)
}

const components = ['VText', 'RectShape', 'CircleShape']

export function isPreventDrop(component) {
  return !components.includes(component) && !component.startsWith('SVG')
}
