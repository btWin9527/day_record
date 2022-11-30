export default function myAnimation(param) {
  let current = 0
  let looped
  const ctx = this.ctx
  const _canvas = this._canvas
  const callback = param.render
  const successCb = param.success;
  (function looping() {
    looped = requestAnimationFrame(looping)
    if (current < param.percent) {
      ctx.clearRect(0, 0, _canvas.width, _canvas.height)
      current = current + 4 > param.percent ? param.percent : current + 4
      callback(current)
    } else {
      window.cancelAnimationFrame(looping)
      looped = null
      successCb && successCb()
    }
  })()
}