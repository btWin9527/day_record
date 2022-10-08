import {mod360} from "@/utitls/translate";

// 八个方向
export const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
// 左右两个方向
export const pointList2 = ['r', 'l']
// 每个点对应的初始角度
export const initialAngle = {
  lt: 0,
  t: 45,
  rt: 90,
  r: 135,
  rb: 180,
  b: 225,
  lb: 270,
  l: 315,
}
// 每个范围的角度对应的光标
export const angleToCursor = [
  {start: 338, end: 23, cursor: 'nw'},
  {start: 23, end: 68, cursor: 'n'},
  {start: 68, end: 113, cursor: 'ne'},
  {start: 113, end: 158, cursor: 'e'},
  {start: 158, end: 203, cursor: 'se'},
  {start: 203, end: 248, cursor: 's'},
  {start: 248, end: 293, cursor: 'sw'},
  {start: 293, end: 338, cursor: 'w'},
]


// 获取光标样式
export const generateCursor = (params) => {
  const {angleToCursor, initialAngle, pointList, curComponent} = params
  const rotate = mod360(curComponent.style.rotate) // 取余 360
  const result = {}
  let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

  pointList.forEach(point => {
    const angle = mod360(initialAngle[point] + rotate)
    const len = angleToCursor.length

    while (true) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point] = 'nw-resize'
        return
      }
      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point] = angleLimit.cursor + '-resize'
        return
      }
    }
  })
  return result
}

// 生成当前组件缩放点样式
export const generatePointStyle = ({point, width, height, cursors}) => {
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // 上下两点，宽度剧中
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }
    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }
  return {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursors[point]
  }
}