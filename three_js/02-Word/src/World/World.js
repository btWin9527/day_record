import {createCube} from "./components/cube.js";
import {createCamera} from "./components/camera.js";
import {createRenderer} from "./systems/renderer.js";
import {createScene} from "./components/scene.js";
import {createLights} from "./components/lights.js";
import {Resizer} from "./systems/Resizer.js";


class World {
  // define private variables : we cannot access them from outside the module
  #camera
  #scene
  #renderer

  // 1. Create an instance of the World app
  constructor(container) {
    this.#camera = createCamera()
    this.#scene = createScene()
    this.#renderer = createRenderer()
    container.append(this.#renderer.domElement)

    const cube = createCube()
    const light = createLights()
    this.#scene.add(cube, light)

    const resizer = new Resizer(container, this.#camera, this.#renderer)
    resizer.onResize = () => {
      this.render()
    }
  }

  // 2. Render the scene
  render() {
    this.#renderer.render(this.#scene, this.#camera)
  }
}

export {World}