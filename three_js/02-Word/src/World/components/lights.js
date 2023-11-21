import {DirectionalLight} from 'https://cdn.skypack.dev/three@0.132.2'

function createLights() {
  // Create a directional light
  const light = new DirectionalLight('#fff', 8)

  // move the light right, up, and towards use
  light.position.set(10, 10, 10)
  return light
}

export {createLights}