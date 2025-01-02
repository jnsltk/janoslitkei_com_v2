import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const SCREEN_GEOMETRY = { width: 1.35, height: 1.13 }
const SCREEN_POSITION = { x: 0, y: 1.04, z: 0.38 }
const SCREEN_ROTATION_X = -3 * THREE.MathUtils.DEG2RAD
const MODEL_PATH = 'pc/computer_setup.glb'
const TEXTURE_PATH = 'pc/baked_computer.jpg'
const SCREEN_TEXTURE_PATH = 'pc/cat.png'

export default class SceneBuilder {
    private scene: THREE.Scene
    private textureLoader: THREE.TextureLoader
    public model: THREE.Object3D | undefined

    constructor() {
        this.textureLoader = new THREE.TextureLoader()
        this.scene = new THREE.Scene()
    }

    public build() {
        this.loadModel()
        console.log(this.scene)
        return this.scene
    }

    private loadModel() {
        const bakedTexture = this.textureLoader.load(TEXTURE_PATH, () => {
            bakedTexture.flipY = false
            // bakedTexture.encoding = THREE.sRGBEncoding;

            const loader = new GLTFLoader()
            loader.load(MODEL_PATH,
                (gltf) => {
                    this.model = gltf.scene
                    this.model.traverse((child) => {
                        if ((<THREE.Mesh> child).isMesh) {
                            (<THREE.Mesh> child).material = new THREE.MeshBasicMaterial({ map: bakedTexture })
                        }
                    })
                    this.scene.add(this.model)
                    this.loadScreenTexture()
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
                },
                (error) => {
                    console.error('An error occurred while loading the model:', error)
                },
            )
        })
    }

    loadScreenTexture() {
        const screenTexture = this.textureLoader.load(SCREEN_TEXTURE_PATH, () => {
            const screenGeometry = new THREE.PlaneGeometry(SCREEN_GEOMETRY.width, SCREEN_GEOMETRY.height)
            const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture })
            const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial)
            screenMesh.position.set(SCREEN_POSITION.x, SCREEN_POSITION.y, SCREEN_POSITION.z)
            screenMesh.rotation.set(SCREEN_ROTATION_X, 0, 0)
            if (this.model) this.model.add(screenMesh)
        })
    }
}