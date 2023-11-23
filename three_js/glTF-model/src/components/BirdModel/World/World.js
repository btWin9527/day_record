import {loadBirds} from "./components/birds/birds.js";
import {createCamera} from "./components/camera.js";
import {createControls} from "./systems/controls.js";
import {createRenderer} from "./systems/renderer.js";
import {createScene} from "./components/scene.js";
import {createLights} from "./components/lights.js";
import {Resizer} from "./systems/Resizer.js";
import {Loop} from "./systems/Loop.js";

// import {createAxesHelper, createGridHelper,} from './components/helpers.js';

class World {
  // define private variables : we cannot access them from outside the module
  #camera
  #scene
  #renderer
  #loop
  #controls

  // 1. Create an instance of the World app
  constructor(container) {
    this.#camera = createCamera()
    this.#scene = createScene()
    this.#renderer = createRenderer()
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    container.append(this.#renderer.domElement)

    this.#controls = createControls(this.#camera, this.#renderer.domElement)

    const {ambientLight, mainLight} = createLights()

    this.#loop.updatables.push(this.#controls)

    this.#scene.add(ambientLight, mainLight)

    const resizer = new Resizer(container, this.#camera, this.#renderer)

    // this.#scene.add(createAxesHelper(), createGridHelper());
  }

  async init() {
    const {parrot, flamingo, stork} = await loadBirds()
    // this.#controls.target.copy(parrot.position)

    this.#loop.updatables.push(parrot, flamingo, stork)
    this.#scene.add(parrot, flamingo, stork)

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