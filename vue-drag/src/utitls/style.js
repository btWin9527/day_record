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