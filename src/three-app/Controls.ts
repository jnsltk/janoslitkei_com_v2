import App from '@/three-app/App'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Controls {
    private app: App
    private camera: THREE.PerspectiveCamera | undefined
    private domElement: HTMLElement | undefined
    public instance: OrbitControls

    constructor() {
        this.app = new App(undefined)
        if (this.app.camera) this.camera = this.app.camera.instance
        if (this.app.renderer) this.domElement = this.app.renderer.instance?.domElement as HTMLElement
        this.instance = this.createControls()
    }

    private createControls(): OrbitControls {
        if (!this.camera || !this.domElement) throw new Error('Camera or domElement not found')
        const controls = new OrbitControls(this.camera, this.domElement)
        controls.enableZoom = false
        controls.enablePan = false
        controls.enableDamping = true
        controls.autoRotate = true
        controls.target.set(0, 15, 0)
        return controls
    }
}

