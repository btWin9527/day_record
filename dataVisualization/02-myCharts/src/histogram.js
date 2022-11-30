export function drawHistogram(speed) {
  const defaultParam = this.defaultParam
  const ctx = this.ctx
  const bottomPad = 30
  const data = defaultParam.data
  const ht = defaultParam.ht
  const maxPoint = defaultParam.maxPoint
  const len = data.length
  let rectHeight = this._canvas.height - bottomPad

  for (let i = 0; i < len; i++) {
    let yVal = data[i].yVal * speed
    let axisY = ht - ht * (yVal / maxPoint) - bottomPad
    const averageNum = defaultParam.wid / data.length - 1
    let axisX = i * averageNum + defaultParam.x

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = defaultParam.hisColor[i]
    ctx.fillRect(axisX - 15, axisY, 30, rectHeight - axisY)
    ctx.restore()
  }

}