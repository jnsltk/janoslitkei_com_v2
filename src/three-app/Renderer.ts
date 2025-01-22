import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'
import * as THREE from 'three'
import { WebGLRenderer } from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

/**
 * Represents the renderer class.
 * Manages the creation of the WebGLRenderer instance, and the rendering of the scene.
 */
export default class Renderer {
    private app: App
    public instance?: WebGLRenderer
    public cssInstance?: CSS3DRenderer
    private sizes?: Sizes
    private webgl?: HTMLDivElement
    private css3d?: HTMLDivElement

    /**
     * Creates an instance of the Renderer class.
     */
    public constructor(
        webgl: HTMLDivElement | undefined,
        css3d: HTMLDivElement | undefined,
    ) {
        this.app = new App(undefined)
        this.sizes = this.app.sizes
        this.webgl = webgl
        this.css3d = css3d
        if (this.sizes) {
            this.instance = this.createRenderer()
            this.cssInstance = this.createCSSRenderer()
        }
    }

    /**
     * Creates the WebGLRenderer instance.
     * @returns The WebGLRenderer instance.
     */
    private createRenderer(): WebGLRenderer | undefined {
        if (this.instance) return this.instance
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            //premultipliedAlpha: false,
        })
        if (this.sizes && this.sizes.width && this.sizes.height)
            renderer.setSize(this.sizes.width, this.sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.0
        renderer.setClearColor(0x000000, 0.0)

        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0'
        renderer.domElement.style.zIndex = '1px'

        if (this.webgl) {
            this.webgl.appendChild(renderer.domElement)
            console.log('Renderer created')
        }
        return renderer
    }

    /**
     * Creates the CSS3DRenderer instance for rendereing the interactive computer screen.
     * @returns The CSS3DRenderer instance.
     */
    private createCSSRenderer(): CSS3DRenderer {
        if (this.cssInstance) return this.cssInstance
        const renderer = new CSS3DRenderer()
        if (this.sizes && this.sizes.width && this.sizes.height) {
            renderer.setSize(this.sizes.width, this.sizes.height)
        }
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0'
        if (this.css3d) {
            this.css3d.appendChild(renderer.domElement)
        }
        return renderer
    }

    /**
     * Renders the scene.
     * @param scene - The scene to render.
     * @param camera - The camera from which the scene is rendered.
     */
    public render(
        scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        cssScene: THREE.Scene,
    ): void {
        if (this.instance) this.instance.render(scene, camera)
        if (this.cssInstance) this.cssInstance.render(cssScene, camera)
    }
}
