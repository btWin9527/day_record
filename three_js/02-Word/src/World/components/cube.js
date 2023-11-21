// import {BoxGeometry, Mesh, MeshStandardMaterial, MathUtils, TextureLoader} from 'https://cdn.skypack.dev/three@0.132.2'

const {BoxGeometry, Mesh, MeshStandardMaterial, MathUtils, TextureLoader} = THREE

function createMaterial() {
  // create a texture loader
  const textureLoader = new TextureLoader()

  // load a texture
  // const texture = textureLoader.load('./assets/textures/uv-test-bw.png')
  const texture = textureLoader.load('./assets/textures/uv-test-col.png')

  // create a "standard" material
  // const material = new MeshStandardMaterial({color: 'purple'})

  // create a "standard" material using the texture we just loaded as a color map
  const material = new MeshStandardMaterial({map: texture})
  return material
}

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2)

  // switch the old "basic" material to a physically correct "standard" material
  const material = createMaterial()

  // crate a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

  const radiansPerSecond = MathUtils.degToRad(30)

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.x += radiansPerSecond * delta
  }

  return cube
}

export {createCube}