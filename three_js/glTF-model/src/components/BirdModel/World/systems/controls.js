import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)

  // 启用阻尼以增加真实感
  controls.enableDamping = true

  controls.target.y = 1

  controls.tick = () => controls.update()
  return controls
}

export {createControls}