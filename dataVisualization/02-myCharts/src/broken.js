export function drawAxis() {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const pad = defaultParam.padding
  const bottomPad = 30
  const wd = defaultParam.wd
  const ht = defaultParam.ht
  const data = defaultParam.data

  // 绘制坐标系
  ctx.save()
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.strokeStyle = defaultParam.styles.borderColor
  ctx.moveTo(pad, pad)
  ctx.lineTo(pad, ht - bottomPad)
  ctx.lineTo(wd - pad, ht - bottomPad)
  ctx.stroke()
  ctx.closePath()


  // 绘制文字刻度 
  for (let i = 0; i < data.length; i++) {
    ctx.beginPath()
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.font = defaultParam.fontSize + ' Microsoft YaHei'
    ctx.fillText(data[i].xVal, i * (defaultParam.wid / data.length - 1) + defaultParam.x, ht - 10)
    ctx.closePath()
  }

  ctx.restore()
}

export function drawPoint(speed) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const data = defaultParam.data
  const len = data.length
  const ht = defaultParam.ht

  // 计算
  ctx.save()
  ctx.lineWidth = 2
  for (let i = 0; i < len; i++) {
    let yVal = parseInt(data[i].yVal * speed)
    let tranY = ht - ht * yVal / defaultParam.maxPoint - 30
    let tranX = i * (defaultParam.wid / len - 1) + defaultParam.x

    // 绘制图形
    ctx.beginPath()
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
    ctx.shadowBlur = 3
    ctx.shadowColor = defaultParam.styles.pointColor
    ctx.fillStyle = defaultParam.styles.pointColor
    ctx.strokeStyle = '#fff'
    ctx.arc(tranX, tranY, 6, 0, 2 * Math.PI, false)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()

    // 绘制圆形对应的数值
    ctx.beginPath()
    ctx.shadowBlur = 0
    ctx.fillStyle = '#333'
    ctx.textAlign = 'center'
    ctx.font = defaultParam.fontSize + ' MicroSoft YaHei'
    ctx.fillText(yVal, tranX, tranY - 10)
    ctx.closePath()

  }
  ctx.restore()
}

export function drawBrokenLine(speed) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const bottomPad = 30
  const data = defaultParam.data
  const ht = defaultParam.ht
  const maxPoint = defaultParam.maxPoint
  const len = data.length - 1
  const stepDots = Math.floor(speed * len)

  // 绘制线条 
  ctx.save()
  ctx.beginPath()
  ctx.setLineDash([4, 4])
  ctx.lineWidth = defaultParam.lineWidth
  ctx.strokeStyle = defaultParam.styles.lineColor
  for (let i = 0; i < len; i++) {
    // 起点 
    const yVal = data[i].yVal
    const axisY = ht - ht * (yVal / maxPoint) - bottomPad
    const averageNum = defaultParam.wid / data.length - 1
    const axisX = i * averageNum + defaultParam.x

    // 终点 
    let axisEndX = (i + 1) * averageNum + defaultParam.x
    let axisEndY = ht - ht * (data[i + 1].yVal) / maxPoint - bottomPad

    if (i <= stepDots) {
      if (i === stepDots) {
        axisEndX = (axisEndX - axisX) * speed + axisX
        axisEndY = (axisEndY - axisY) * speed + axisY
      }
      ctx.moveTo(axisX, axisY)
      ctx.lineTo(axisEndX, axisEndY)
    }
  }
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

export function drawDashLine(speed) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const bottomPad = 30
  const data = defaultParam.data
  const ht = defaultParam.ht
  const maxPoint = defaultParam.maxPoint
  const len = data.length

  ctx.save()
  for (let i = 0; i < len; i++) {
    // 起始点
    const averageNum = defaultParam.wid / data.length - 1
    let axisX = i * averageNum + defaultParam.x
    let axisY = ht - ht * (data[i].yVal) / maxPoint * speed - bottomPad

    // 开始绘制 
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.setLineDash([4, 4])
    ctx.strokeStyle = '#d6d6d6'
    ctx.moveTo(axisX, ht - bottomPad)
    ctx.lineTo(axisX, axisY)
    ctx.stroke()
    ctx.closePath()
  }
  ctx.restore()
}