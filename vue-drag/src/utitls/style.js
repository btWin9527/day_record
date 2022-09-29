const needUnit = [
  'fontSize',
  'width',
  'height',
  'top',
  'left',
  'borderWidth',
  'letterSpacing',
  'borderRadius',
]

/**
 * @method 获取组件外层容器样式
 * @description 控制拖拽后组件显示位置
 * @param style
 * @returns {{}}
 */
export const getShapeStyle = (style) => {
  const result = {};
  ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
    if (attr !== 'rotate') {
      result[attr] = style[attr] + 'px'
    } else {
      result.transform = 'rotate(' + style[attr] + 'deg)'
    }
  })

  return result
}

/**
 * 获取样式配置项
 * @param style
 * @param filter
 */
export const getStyle = (style, filter = []) => {
  const result = {}
  Object.keys(style).forEach(key => {
    if (!filter.includes(key)) {
      if (key !== 'rotate') {
        if (style[key] !== '') {
          result[key] = style[key]

          if (needUnit.includes(key)) {
            result[key] += 'px'
          }
        }
      } else {
        result.transform = key + '(' + style[key] + 'deg)'
      }
    }
  })

  return result
}