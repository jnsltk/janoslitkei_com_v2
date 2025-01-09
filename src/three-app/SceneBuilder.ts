import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODEL_PATH = 'pc/macintosh.glb'
const VIDEO_PATH = 'pc/screen/static.mp4'

/**
 * Represents the scene builder class.
 * Manages the creation of the scene, loading of the model, and setting up the lights.
 */
export default class SceneBuilder {
    public static model: THREE.Object3D | undefined

    private scene: THREE.Scene
    private videoTexture: THREE.VideoTexture | undefined

    /**
     * Creates an instance of the SceneBuilder class.
     */
    public constructor() {
        this.scene = new THREE.Scene()
        this.createVideoTexture()
    }

    /**
     * Builds the scene.
     * @returns The scene.
     */
    public build(): THREE.Scene {
        this.loadModel()
        this.setupLights()
        return this.scene
    }

    /**
     * Creates the video texture for the model's screen.
     */
    private createVideoTexture(): void {
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

    /**
     * Loads the model and applies the video texture to the screen.
     * 
     * @remarks Since the model is not centered, the position is adjusted when traversing the model's children.
     */
    private loadModel(): void {
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

    /**
     * Sets up the lights in the scene.
     */
    private setupLights(): void {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
        this.scene.add(ambientLight)

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
        directionalLight.position.set(0, 5, 5)
        this.scene.add(directionalLight)
    }

    /**
     * Applies the video texture to the model's screen.
     * @param child - The child object to which the video texture is applied.
     */
    private applyVideoTexture(child: THREE.Object3D): void {
        if ((<THREE.Mesh>child).isMesh) {
            const mesh = <THREE.Mesh>child
            const videoMaterial = new THREE.MeshBasicMaterial({
                map: this.videoTexture,
            })
            mesh.material = videoMaterial
        }
    }

}