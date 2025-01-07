import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_PATH = 'pc/macintosh.glb'
const SCREEN_TEXTURE_PATH = 'pc/cat.png'

export default class SceneBuilder {
    public static model: THREE.Object3D | undefined

    private scene: THREE.Scene
    private textureLoader: THREE.TextureLoader

    constructor() {
        this.textureLoader = new THREE.TextureLoader()
        this.scene = new THREE.Scene()
    }

    public build() {
        this.loadModel()
        this.setupLights()

        console.log(this.scene)
        return this.scene
    }

    private loadModel() {
        const loader = new GLTFLoader()
        loader.load(MODEL_PATH, gltf => {
            SceneBuilder.model = gltf.scene
            SceneBuilder.model.traverse(child => {
                if ((<THREE.Mesh>child).isMesh) {
                    if (child.name === 'Computer_Screen_0') {
                        this.loadScreenTexture(child)
                    }
                    child.position.x += 20
                    child.position.z += 45
                }
            })
            this.scene.add(SceneBuilder.model)
        })
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
        this.scene.add(ambientLight)

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
        directionalLight.position.set(0, 15, 15)
        this.scene.add(directionalLight)
    }

    private loadScreenTexture(child: THREE.Object3D) {
        const screenTexture = this.textureLoader.load(
            SCREEN_TEXTURE_PATH,
            () => {
                if ((<THREE.Mesh>child).isMesh) {
                    const mesh = <THREE.Mesh>child
                    const screenMaterial = new THREE.MeshBasicMaterial({
                        map: screenTexture,
                    })
                    mesh.material = screenMaterial
                }
            },
        )
    }
}
