// import {DirectionalLight} from 'https://cdn.skypack.dev/three@0.132.2'
const {DirectionalLight, AmbientLight, HemisphereLight} = THREE

function createLights() {
  // const ambientLight = new AmbientLight('white', 2)

  const ambientLight = new HemisphereLight(
    'white', // bright sky color
    'darkslategrey', // dim ground color
    5, // intensity
  )

  // Create a directional light
  // const light = new DirectionalLight('#fff', 8)

  // move the light right, up, and towards use
  // light.position.set(10, 10, 10)

  const mainLight = new DirectionalLight('white', 5)
  mainLight.position.set(10, 10, 10)

  // return light
  return {ambientLight, mainLight}
}

export {createLights}