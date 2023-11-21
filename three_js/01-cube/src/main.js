import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "https://cdn.skypack.dev/three@0.132.2";

/**
 * 1.初始设置
 * @desc 渲染器回自动创建一个canvas元素，插入到该dom容器中
 * @type {Element}
 */
const container = document.querySelector('#scene-container')

// 2. 创建场景
const scene = new Scene()
scene.background = new Color('skyblue')

// 3. 创建相机
const fov = 35
const aspect = container.clientWidth / container.clientHeight
const near = 0.1
const far = 100
/**
 * fov 视野，单位为度
 * aspect 纵横比
 * near 近剪裁平面
 * far 远裁平面
 */
const camera = new PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 0, 10)

// 4. 创建可见对象
// 定义盒子容器的width、height、depth
const geometry = new BoxBufferGeometry(2, 2, 2)
// 创建材质
const material = new MeshBasicMaterial()
// 创建网格，添加容器和材质
const cube = new Mesh(geometry, material)

// add the mesh to the scene
scene.add(cube)

// 5. 创建渲染器
const renderer = new WebGLRenderer()
renderer.setSize(container.clientWidth, container.clientHeight)
// 设置像素比DPR
renderer.setPixelRatio(window.devicePixelRatio)
container.append(renderer.domElement)
renderer.render(scene, camera)