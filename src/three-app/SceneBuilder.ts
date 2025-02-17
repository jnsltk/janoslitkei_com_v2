import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import ScreenMask from '@/three-app/ScreenMask'
import { CSS3DObject } from 'three/examples/jsm/Addons.js'

const MODEL_PATH = 'pc/macintosh.glb'
const CONTAINER_RES = { w: 720, h: 542 }
const IFRAME_PADDING = { top: 42, bottom: 32, right: 21, left: 21 }
const IFRAME_RES = {
    ...Object.assign({}, CONTAINER_RES),
}

/**
 * Represents the scene builder class.
 * Manages the creation of the scene, loading of the model, and setting up the lights.
 */
export default class SceneBuilder {
    public static model?: THREE.Object3D

    private scene: THREE.Scene
    private cssScene: THREE.Scene
    public screenMask: ScreenMask
    public iframeElement?: HTMLIFrameElement

    /**
     * Creates an instance of the SceneBuilder class.
     */
    public constructor() {
        this.scene = new THREE.Scene()
        this.cssScene = new THREE.Scene()
        this.screenMask = new ScreenMask()
    }

    /**
     * Builds the scene.
     * @returns The scene.
     */
    public build(): Promise<{ scene: THREE.Scene; cssScene: THREE.Scene }> {
        return new Promise((resolve, reject) => {
            this.loadModel()
                .then(() => {
                    this.setupLights()
                    resolve({ scene: this.scene, cssScene: this.cssScene })
                })
                .catch(reject)
        })
    }

    /**
     * Loads the model and applies the video texture to the screen.
     *
     * @remarks Since the model is not centered, the position is adjusted when traversing the model's children.
     */
    private loadModel(): Promise<void> {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader()
            loader.load(
                MODEL_PATH,
                gltf => {
                    SceneBuilder.model = gltf.scene
                    this.scene.add(SceneBuilder.model)
                    this.addIframe()
                    this.addScreenMask()
                    this.addScreenShadow()
                    this.addVideoTexture(
                        'pc/screen/layers/video/static-2.mp4',
                        13.5,
                        0.08,
                    )
                    this.addVideoTexture(
                        'pc/screen/layers/video/static-1.mp4',
                        13.8,
                        0.3,
                    )
                    this.applySmudgeTexture()
                    resolve()
                },
                undefined,
                error => reject(error),
            )
        })
    }

    /**
     * Adds the iframe to the model screen.
     * Inspired by Henry Heffernan -- https://henryheffernan.com
     */
    private addIframe(): void {
        const container = document.createElement('div')
        container.style.width = CONTAINER_RES.w + 'px'
        container.style.height = CONTAINER_RES.h + 'px'
        container.style.opacity = '1'
        container.style.background = '#000000'

        const iframe = document.createElement('iframe')
        iframe.src = process.env.NEXT_PUBLIC_IFRAME_URL as string
        iframe.style.width = IFRAME_RES.w + 'px'
        iframe.style.height = IFRAME_RES.h + 'px'
        iframe.style.paddingTop = IFRAME_PADDING.top + 'px'
        iframe.style.paddingBottom = IFRAME_PADDING.bottom + 'px'
        iframe.style.paddingRight = IFRAME_PADDING.right + 'px'
        iframe.style.paddingLeft = IFRAME_PADDING.left + 'px'
        iframe.style.opacity = '1'
        iframe.id = 'computer-screen'
        iframe.title = 'Macintosh System'

        this.iframeElement = iframe
        container.appendChild(iframe)

        this.addCssPlane(container)
    }

    /**
     * Adds the CSS plane containing the iframe to the scene.
     * Inspired by Henry Heffernan -- https://henryheffernan.com
     * @param container The container to add to the CSS plane.
     */
    private addCssPlane(container: HTMLElement): void {
        const cssObject = new CSS3DObject(container)
        cssObject.position.set(0, 23.42, 12.74) // Adjust the position as needed
        cssObject.rotation.x = -0.099 // Adjust the rotation as needed
        cssObject.scale.set(0.026, 0.026, 0.026) // Adjust the scale as needed

        this.cssScene.add(cssObject)

        const material = new THREE.MeshLambertMaterial()
        material.side = THREE.DoubleSide
        material.opacity = 0
        material.color = new THREE.Color(0x000000)
        material.transparent = true
        material.blending = THREE.NoBlending

        const geometry = new THREE.PlaneGeometry(
            CONTAINER_RES.w,
            CONTAINER_RES.h,
        )

        const mesh = new THREE.Mesh(geometry, material)

        mesh.position.copy(cssObject.position)
        mesh.rotation.copy(cssObject.rotation)
        mesh.scale.copy(cssObject.scale)

        this.scene.add(mesh)
    }

    /**
     * Adds the display screen to the model.
     */
    private addScreenMask(): void {
        const screenGeometry = new THREE.PlaneGeometry(19, 14.3)
        const screenMask = new THREE.Mesh(
            screenGeometry,
            this.screenMask.material,
        )
        screenMask.position.set(0, 23.42, 12.85)
        screenMask.rotation.x = -0.099
        this.scene.add(screenMask)
    }

    /**
     * Adds inner shadow to the screen.
     */
    private addScreenShadow(): void {
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
    private addVideoTexture(
        src: string,
        zPosition: number,
        opacity: number,
    ): void {
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

    /**
     * Applies the smudge texture to the screen object of the model.
     */
    private applySmudgeTexture(): void {
        const screenMesh = SceneBuilder.model?.getObjectByName(
            'Computer_Screen_0',
        ) as THREE.Mesh
        if (this.screenMask.material) {
            screenMesh.material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(
                    'pc/screen/layers/img/smudges.jpg',
                ),
                blending: THREE.AdditiveBlending,
                opacity: 0.08,
                transparent: true,
            })
        } else {
            console.error('Screen material is undefined')
        }
    }
}
