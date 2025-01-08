import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_PATH = 'pc/macintosh.glb'
const VIDEO_PATH = 'pc/screen/static.mp4'

export default class SceneBuilder {
    public static model: THREE.Object3D | undefined

    private scene: THREE.Scene
    private videoTexture: THREE.VideoTexture | undefined

    constructor() {
        this.scene = new THREE.Scene()
        this.createVideoTexture()
    }

    public build() {
        this.loadModel()
        this.setupLights()
        return this.scene
    }

    private createVideoTexture() {
        const video = document.createElement('video')
        video.src = VIDEO_PATH
        video.loop = true
        video.muted = true
        video.play()
        this.videoTexture = new THREE.VideoTexture(video)
        this.videoTexture.rotation = Math.PI / 2 // Rotate 90 degrees anti-clockwise
        this.videoTexture.center.set(0.5, 0.5) // Set rotation center
        this.videoTexture.wrapS = THREE.ClampToEdgeWrapping
        this.videoTexture.wrapT = THREE.ClampToEdgeWrapping
    }

    private loadModel() {
        const loader = new GLTFLoader()
        loader.load(MODEL_PATH, gltf => {
            SceneBuilder.model = gltf.scene
            SceneBuilder.model.traverse(child => {
                if ((<THREE.Mesh>child).isMesh) {
                    if (child.name === 'Computer_Screen_0') {
                        this.applyVideoTexture(child)
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
        directionalLight.position.set(0, 5, 5)
        this.scene.add(directionalLight)
    }

    private applyVideoTexture(child: THREE.Object3D) {
        if ((<THREE.Mesh>child).isMesh) {
            const mesh = <THREE.Mesh>child
            const videoMaterial = new THREE.MeshBasicMaterial({
                map: this.videoTexture,
            })
            mesh.material = videoMaterial
        }
    }

}