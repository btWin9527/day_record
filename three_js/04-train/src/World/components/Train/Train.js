import {createMeshes} from "./meshes.js";

const {Group, MathUtils} = THREE

const wheelSpeed = MathUtils.degToRad(24)

class Train extends Group {
  constructor() {
    super()
    this.meshes = createMeshes()

    this.add(
      this.meshes.nose,
      this.meshes.cabin,
      this.meshes.chimney,
      this.meshes.smallWheelRear,
      this.meshes.smallWheelCenter,
      this.meshes.smallWheelFront,
      this.meshes.bigWheel,
      this.meshes.axesHelper
    )
  }

  tick(delta) {
    this.meshes.bigWheel.rotation.z += wheelSpeed * delta
    this.meshes.smallWheelRear.rotation.z += wheelSpeed * delta
    this.meshes.smallWheelCenter.rotation.z += wheelSpeed * delta
    this.meshes.smallWheelFront.rotation.z += wheelSpeed * delta
  }
}

export {Train}