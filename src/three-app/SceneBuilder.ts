import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import ScreenMaterial from '@/three-app/ScreenMaterial'

const MODEL_PATH = 'pc/macintosh.glb'

/**
 * Represents the scene builder class.
 * Manages the creation of the scene, loading of the model, and setting up the lights.
 */
export default class SceneBuilder {
    public static model: THREE.Object3D | undefined

    private scene: THREE.Scene
    private videoTexture: THREE.VideoTexture | undefined
    public screenMaterial: ScreenMaterial

    /**
     * Creates an instance of the SceneBuilder class.
     */
    public constructor() {
        this.scene = new THREE.Scene()
        this.screenMaterial = new ScreenMaterial()
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
     * Loads the model and applies the video texture to the screen.
     *
     * @remarks Since the model is not centered, the position is adjusted when traversing the model's children.
     */
    private loadModel(): void {
        const loader = new GLTFLoader()
        loader.load(MODEL_PATH, gltf => {
            SceneBuilder.model = gltf.scene
            this.applySmudgeTexture()
            this.disableDoubleSideRendering()
            this.scene.add(SceneBuilder.model)

            this.addScreen()
            this.addShadow()
            this.addVideo('pc/screen/layers/video/static-1.mp4', 13.8, 0.5)
            this.addVideo('pc/screen/layers/video/static-2.mp4', 13.5, 0.1)
        })
    }

    /**
     * Applies the smudge texture to the screen object of the model.
     */
    private applySmudgeTexture(): void {
        const screenMesh = SceneBuilder.model?.getObjectByName('Computer_Screen_0') as THREE.Mesh
        if (this.screenMaterial.material) {
            const smudgeMaterial = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load('pc/screen/layers/img/smudges.jpg'),
                blending: THREE.AdditiveBlending,
                opacity: 0.15,
                transparent: true,
            })
            screenMesh.material = smudgeMaterial
        } else {
            console.error('Screen material is undefined')
        }
    }

    /**
     * Disables double-sided rendering for the model's children.
     */
    private disableDoubleSideRendering(): void {
        SceneBuilder.model?.traverse(child => {
            if ((<THREE.Mesh>child).isMesh) {
                const mesh = <THREE.Mesh>child
                if (Array.isArray(mesh.material)) {
                    mesh.material.forEach(material => {
                        material.side = THREE.FrontSide
                    })
                } else {
                    mesh.material.side = THREE.FrontSide
                }
            }
        })
    }

    /**
     * Adds the display screen to the model.
     */
    private addScreen(): void {
        const screenGeometry = new THREE.PlaneGeometry(19, 14.3)
        const screen = new THREE.Mesh(screenGeometry, this.screenMaterial.material)
        screen.position.set(0, 23.42, 12.85)
        screen.rotation.x = -0.099
        SceneBuilder.model?.add(screen)
    }

    /**
     * Adds inner shadow to the screen.
     */
    private addShadow(): void {
        const shadowGeometry = new THREE.PlaneGeometry(19, 14.3)
        const shadowMaterial = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('pc/screen/layers/img/shadow.png'),
            blending: THREE.NormalBlending,
            opacity: 1,
            transparent: true,
        })

        const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial)
        shadowMesh.position.set(0, 23.42, 13.25)
        shadowMesh.rotation.x = -0.099
        SceneBuilder.model?.add(shadowMesh)
    }

    /**
     * Adds a video texture to the model.
     * @param src Video source
     * @param zPosition Layer z position
     * @param opacity Opacity of the video texture
     */
    private addVideo(src: string, zPosition: number, opacity: number): void {
        const video = document.createElement('video')
        video.src = src
        video.muted = true
        video.loop = true
        video.play()
        const videoTexture = new THREE.VideoTexture(video)

        const videoMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
            blending: THREE.AdditiveBlending,
            opacity,
            transparent: true,
        })

        const videoGeometry = new THREE.PlaneGeometry(19, 14.3)
        const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial)
        videoMesh.position.set(0, 23.42, zPosition)
        videoMesh.rotation.x = -0.099
        SceneBuilder.model?.add(videoMesh)
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
}
