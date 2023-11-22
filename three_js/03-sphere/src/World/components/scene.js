// import {Color, Scene} from 'https://cdn.skypack.dev/three@0.132.2'
const {Color, Scene} = THREE

function createScene() {
  const scene = new Scene()
  scene.background = new Color('oldlace')
  return scene
}

export {createScene}