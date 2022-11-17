import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const coinNormalMap = textureLoader.load('/textures/coinNormalMap.jpeg')

// Debug
const gui = new dat.GUI()

// Canvas
const coinCanvas = document.querySelector('.coin__canvas')

// Scene
const scene = new THREE.Scene()

// Objects
const coinGeometry = new THREE.SphereBufferGeometry(0.5, 64, 64)

// Materials
const coinMaterial = new THREE.MeshStandardMaterial()
coinMaterial.normalMap = coinNormalMap
coinMaterial.color = new THREE.Color(0x000000)

// Mesh
const coin = new THREE.Mesh(coinGeometry, coinMaterial)
scene.add(coin)

// Lights
const bluePointLight = new THREE.PointLight(0x0000ff, 1)
bluePointLight.position.set(0, 2.5, 0)
bluePointLight.intensity = 10
scene.add(bluePointLight)

const yellowPointLight = new THREE.PointLight(0xffff00, 1)
yellowPointLight.position.set(0, -2.5, 0)
yellowPointLight.intensity = 10
scene.add(yellowPointLight)

// GUI
// . GUI_folders
const bluePointLightFolder = gui.addFolder('Blue point light')
const yellowPointLightFolder = gui.addFolder('Yellow point light')

// . GUI_controls
bluePointLightFolder.add(bluePointLight.position, 'x').min(-10).max(10).step(0.01)
bluePointLightFolder.add(bluePointLight.position, 'y').min(-10).max(10).step(0.01)
bluePointLightFolder.add(bluePointLight.position, 'z').min(-10).max(10).step(0.01)
bluePointLightFolder.add(bluePointLight, 'intensity').min(-10).max(10).step(0.01)
yellowPointLightFolder.add(yellowPointLight.position, 'x').min(-10).max(10).step(0.01)
yellowPointLightFolder.add(yellowPointLight.position, 'y').min(-10).max(10).step(0.01)
yellowPointLightFolder.add(yellowPointLight.position, 'z').min(-10).max(10).step(0.01)
yellowPointLightFolder.add(yellowPointLight, 'intensity').min(-10).max(10).step(0.01)

// Helpers
const bluePointLightHelper = new THREE.PointLightHelper(bluePointLight, 1)
scene.add(bluePointLightHelper)

const yellowPointLightHelper = new THREE.PointLightHelper(yellowPointLight, 1)
scene.add(yellowPointLightHelper)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, coinCanvas)
// controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: coinCanvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  coin.rotation.y = .5 * elapsedTime

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()