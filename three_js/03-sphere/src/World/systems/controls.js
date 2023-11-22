// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.2/examples/jsm/controls/OrbitControls.js';
const {OrbitControls} = THREE


function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)

  // damping and auto rotation require
  // the controls to be updated each frame

  // this.controls.autoRotate = true
  // 启用阻尼以增加真实感
  controls.enableDamping = true
  controls.minDistance = 5
  controls.maxDistance = 10

  controls.tick = () => controls.update()
  return controls
}

export {createControls}