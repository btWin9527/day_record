import {BoxGeometry, Mesh, MeshStandardMaterial, SphereGeometry} from 'https://cdn.skypack.dev/three@0.132.2'

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2)
  // const geometry = new SphereGeometry(1,32,32)

  // switch the old "basic" material to a physically correct "standard" material
  const material = new MeshStandardMaterial({color: 'darkgreen'})

  // crate a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

  return cube
}

export {createCube}