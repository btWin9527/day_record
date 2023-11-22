import {WebGLRenderer} from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({
    // enable aliasing to make the edges smoother
    antialias: true
  })

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true

  return renderer
}

export {createRenderer}