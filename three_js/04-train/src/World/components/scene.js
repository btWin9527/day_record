const {Color, Scene} = THREE

function createScene() {
  const scene = new Scene()
  scene.background = new Color('skyblue')
  return scene
}

export {createScene}