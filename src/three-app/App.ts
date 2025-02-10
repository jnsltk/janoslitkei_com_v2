import * as THREE from 'three'
import Camera from '@/three-app/Camera'
import Renderer from '@/three-app/Renderer'
import Sizes from '@/three-app/Sizes'
import SceneBuilder from '@/three-app/SceneBuilder'
import Controls from '@/three-app/Controls'

/**
 * Represents the main application class.
 * Manages the initialization of the scene, camera, renderer, and controls,
 * and handles the animation loop as well as the scroll event.
 *
 * @remarks
 * This is the entry point of the Three.js application.
 */
export default class App {
    private static instance: App | null = null
    private sceneBuilder?: SceneBuilder
    private scene?: THREE.Scene
    private cssScene?: THREE.Scene
    public divElement?: HTMLDivElement
    public sizes?: Sizes
    public camera?: Camera
    public renderer?: Renderer
    public iframeElement?: HTMLIFrameElement
    public controls?: Controls

    /**
     * Creates an instance of the App class.
     * @param divElement - The HTMLDivElement to which the renderer's domElement is appended.
     *
     * @remarks
     * If an instance of the App class already exists, returns the existing instance.
     */
    public constructor(divElement: HTMLDivElement | undefined) {
        if (App.instance !== null) {
            return App.instance
        }
        App.instance = this

        this.divElement = divElement
        this.sceneBuilder = new SceneBuilder()
    }

    /**
     * Animates the scene.
     */
    private animate(): void {
        const tick = (): void => {
            if (this.controls) {
                this.controls.instance.update()
            }
            if (
                this.renderer &&
                this.scene &&
                this.camera &&
                this.camera.instance &&
                this.sceneBuilder
            ) {
                if (this.sceneBuilder?.screenMask?.material?.uniforms?.time) {
                    this.sceneBuilder.screenMask.material.uniforms.time.value += 0.05
                }
                if (this.scene && this.cssScene) {
                    this.renderer.render(
                        this.scene,
                        this.camera.instance,
                        this.cssScene,
                    )
                }
            }
            window.requestAnimationFrame(tick)
        }
        tick()
    }

    /**
     * Initializes parts of the application, that depend on asynchronous operations.
     */
    public async init(
        webgl: HTMLDivElement | undefined,
        css3d: HTMLDivElement | undefined,
    ): Promise<void> {
        return new Promise(async resolve => {
            // Set the camera controls instance since the camera is created before the controls
            if (this.sceneBuilder) {
                const { scene, cssScene } = await this.sceneBuilder.build()
                this.scene = scene
                this.cssScene = cssScene
            }
            this.iframeElement = this.sceneBuilder?.iframeElement
            this.sizes = new Sizes(this.divElement)
            this.camera = new Camera()
            this.renderer = new Renderer(webgl, css3d)
            this.controls = new Controls()
            this.camera.setControls(this.controls)

            this.animate()
            resolve()
        })
    }

    private removeEventListeners(): void {
        this.camera?.removeEventListeners()
    }

    public destroy(): void {
        this.removeEventListeners()
        App.instance = null
    }
}
