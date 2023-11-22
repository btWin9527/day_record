const {AxesHelper, GridHelper} = THREE

function createAxesHelper() {
  const helper = new AxesHelper(3)
  helper.position.set(-3.5, 0, -3.5)
  return helper
}


function createGridHelper() {
  const helper = new GridHelper(6)
  return helper
}

export {createAxesHelper, createGridHelper}