import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'
import * as THREE from 'three'
import { WebGLRenderer } from 'three'

export default class Renderer {
    app: App
    instance: WebGLRenderer | undefined
    sizes: Sizes | undefined
    divElement: HTMLDivElement | undefined

    constructor() {
        this.app = new App(undefined)
        console.log(this.app)
        this.sizes = this.app.sizes
        this.divElement = this.app.divElement
        if (this.sizes) {
            this.instance = this.createRenderer()
        }
    }

    private createRenderer(): WebGLRenderer | undefined {
        if (this.instance) return
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        })
        if (this.sizes && this.sizes.width && this.sizes.height) renderer.setSize(this.sizes.width, this.sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        // renderer.outputEncoding = THREE.sRGBEncoding
        if (this.divElement) {
            this.divElement.appendChild(renderer.domElement)
            console.log('Renderer created')
        }
        return renderer
    }

    public render(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
        if(this.instance) this.instance.render(scene, camera)
    }
}