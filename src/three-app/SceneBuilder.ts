import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import ScreenMaterial from '@/three-app/ScreenMaterial'
import { CSS3DObject } from 'three/examples/jsm/Addons.js'

const MODEL_PATH = 'pc/macintosh.glb'
const CONTAINER_RES = { w: 720, h: 542 }
const IFRAME_PADDING = { top: 42, bottom: 32, right: 21, left: 21 }
const IFRAME_RES = {
    ...Object.assign({}, CONTAINER_RES),
    // w: CONTAINER_RES.w - IFRAME_PADDING.right - IFRAME_PADDING.left,
    // h: CONTAINER_RES.h - IFRAME_PADDING.top - IFRAME_PADDING.bottom,
}

/**
 * Represents the scene builder class.
 * Manages the creation of the scene, loading of the model, and setting up the lights.
 */
export default class SceneBuilder {
    public static model: THREE.Object3D | undefined

    private scene: THREE.Scene
    private cssScene: THREE.Scene
    public screenMaterial: ScreenMaterial

    /**
     * Creates an instance of the SceneBuilder class.
     */
    public constructor() {
        this.scene = new THREE.Scene()
        this.cssScene = new THREE.Scene()
        this.screenMaterial = new ScreenMaterial()
    }

    /**
     * Builds the scene.
     * @returns The scene.
     */
    public build(): { scene: THREE.Scene; cssScene: THREE.Scene } {
        this.loadModel()
        this.setupLights()
        this.setRenderOrder()
        return { scene: this.scene, cssScene: this.cssScene }
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
            this.scene.add(SceneBuilder.model)

            this.addScreen()
            this.addCSS3DObject()

            this.addShadow()
            this.addVideo('pc/screen/layers/video/static-1.mp4', 13.8, 0.4)
            this.addVideo('pc/screen/layers/video/static-2.mp4', 13.5, 0.07)
            this.applySmudgeTexture()
        })
    }

    /**
     * Applies the smudge texture to the screen object of the model.
     */
    private applySmudgeTexture(): void {
        const screenMesh = SceneBuilder.model?.getObjectByName(
            'Computer_Screen_0',
        ) as THREE.Mesh
        if (this.screenMaterial.material) {
            const smudgeMaterial = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(
                    'pc/screen/layers/img/smudges.jpg',
                ),
                blending: THREE.AdditiveBlending,
                opacity: 0.07,
                transparent: true,
            })
            screenMesh.material = smudgeMaterial
            screenMesh.visible = true
        } else {
            console.error('Screen material is undefined')
        }
    }

    private setRenderOrder(): void {
        this.scene.traverse(object => {
            if (object instanceof THREE.Mesh) {
                object.renderOrder = 1
            }
        })
        this.cssScene.traverse(object => {
            if (object instanceof CSS3DObject) {
                object.renderOrder = 2
            }
        })
    }

    /**
     * Adds the display screen to the model.
     */
    private addScreen(): void {
        const screenGeometry = new THREE.PlaneGeometry(19, 14.3)
        const screen = new THREE.Mesh(
            screenGeometry,
            this.screenMaterial.material,
        )
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
            map: new THREE.TextureLoader().load(
                'pc/screen/layers/img/shadow.png',
            ),
            blending: THREE.NormalBlending,
            side: THREE.DoubleSide,
            opacity: 1,
            transparent: true,
        })

        const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial)
        shadowMesh.position.set(0, 23.42, 13.25)
        shadowMesh.rotation.x = -0.099
        this.scene.add(shadowMesh)
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
            side: THREE.DoubleSide,
            opacity,
            transparent: true,
        })

        const videoGeometry = new THREE.PlaneGeometry(19, 14.3)
        const videoMesh = new THREE.Mesh(videoGeometry, videoMaterial)
        videoMesh.position.set(0, 23.42, zPosition)
        videoMesh.rotation.x = -0.099
        this.scene.add(videoMesh)
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

    private addCSS3DObject(): void {
        const container = document.createElement('div')
        container.style.width = CONTAINER_RES.w + 'px'
        container.style.height = CONTAINER_RES.h + 'px'
        container.style.opacity = '1'
        container.style.background = '#1d2e2f'

        const iframe = document.createElement('iframe')
        iframe.src = 'http://localhost:3000'
        iframe.style.border = '0px'
        iframe.style.width = IFRAME_RES.w + 'px'
        iframe.style.height = IFRAME_RES.h + 'px'
        iframe.style.paddingTop = IFRAME_PADDING.top + 'px'
        iframe.style.paddingBottom = IFRAME_PADDING.bottom + 'px'
        iframe.style.paddingRight = IFRAME_PADDING.right + 'px'
        iframe.style.paddingLeft = IFRAME_PADDING.left + 'px'
        iframe.style.opacity = '1'
        iframe.id = 'computer-screen'
        iframe.frameBorder = '0'
        iframe.title = 'Macintosh System'

        container.appendChild(iframe)

        const cssObject = new CSS3DObject(container)
        cssObject.position.set(0, 23.42, 12.74) // Adjust the position as needed
        cssObject.rotation.x = -0.099 // Adjust the rotation as needed
        cssObject.scale.set(0.026, 0.026, 0.026) // Adjust the scale as needed

        // SceneBuilder.model?.add(cssObject)
        this.cssScene.add(cssObject)

        // Create GL plane
        const material = new THREE.MeshLambertMaterial()
        material.side = THREE.DoubleSide
        material.opacity = 0
        material.color = new THREE.Color(0x000000)
        material.transparent = true
        // NoBlending allows the GL plane to occlude the CSS plane
        material.blending = THREE.NoBlending

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(
            CONTAINER_RES.w,
            CONTAINER_RES.h,
        )

        // Create the GL plane mesh
        const mesh = new THREE.Mesh(geometry, material)

        // Copy the position, rotation and scale of the CSS plane to the GL plane
        mesh.position.copy(cssObject.position)
        mesh.rotation.copy(cssObject.rotation)
        mesh.scale.copy(cssObject.scale)

        // Add to gl scene
        this.scene.add(mesh)
    }
}
