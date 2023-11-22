import {Train} from "./components/Train/Train.js";
import {createCamera} from "./components/camera.js";
import {createControls} from "./systems/controls.js";
import {createRenderer} from "./systems/renderer.js";
import {createScene} from "./components/scene.js";
import {createLights} from "./components/lights.js";
import {Resizer} from "./systems/Resizer.js";
import {Loop} from "./systems/Loop.js";
import {createAxesHelper, createGridHelper,} from './components/helpers.js';

class World {
  // define private variables : we cannot access them from outside the module
  #camera
  #scene
  #renderer
  #loop

  // 1. Create an instance of the World app
  constructor(container) {
    this.#camera = createCamera()
    this.#scene = createScene()
    this.#renderer = createRenderer()
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    container.append(this.#renderer.domElement)

    const controls = createControls(this.#camera, this.#renderer.domElement)

    const train = new Train()
    const {ambientLight, mainLight} = createLights()

    this.#loop.updatables.push(controls, train)

    this.#scene.add(ambientLight, mainLight, train)

    const resizer = new Resizer(container, this.#camera, this.#renderer)

    this.#scene.add(createAxesHelper(), createGridHelper());
  }

  // 2. Render the scene
  render() {
    this.#renderer.render(this.#scene, this.#camera)
  }

  start() {
    this.#loop.start()
  }

  stop() {
    this.#loop.stop()
  }
}

export {World}