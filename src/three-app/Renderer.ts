import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'
import * as THREE from 'three'
import { WebGLRenderer } from 'three'

/**
 * Represents the renderer class.
 * Manages the creation of the WebGLRenderer instance, and the rendering of the scene.
 */
export default class Renderer {
    private app: App
    public instance: WebGLRenderer | undefined
    private sizes: Sizes | undefined
    private divElement: HTMLDivElement | undefined

    /**
     * Creates an instance of the Renderer class.
     */
    public constructor() {
        this.app = new App(undefined)
        this.sizes = this.app.sizes
        this.divElement = this.app.divElement
        if (this.sizes) {
            this.instance = this.createRenderer()
        }
    }

    /**
     * Creates the WebGLRenderer instance.
     * @returns The WebGLRenderer instance.
     */
    private createRenderer(): WebGLRenderer | undefined {
        if (this.instance) return
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
        if (this.sizes && this.sizes.width && this.sizes.height)
            renderer.setSize(this.sizes.width, this.sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.0

        if (this.divElement) {
            this.divElement.appendChild(renderer.domElement)
            console.log('Renderer created')
        }
        return renderer
    }

    /**
     * Renders the scene.
     * @param scene - The scene to render.
     * @param camera - The camera from which the scene is rendered.
     */
    public render(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
        if (this.instance) this.instance.render(scene, camera)
    }
}
