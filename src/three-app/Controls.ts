import App from '@/three-app/App'
import Camera from '@/three-app/Camera'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Represents the controls class.
 * Manages the creation of the OrbitControls instance.
 */
export default class Controls {
    private app: App
    private camera: THREE.PerspectiveCamera | undefined
    private domElement: HTMLElement | undefined
    public instance: OrbitControls

    /**
     * Creates an instance of the Controls class.
     */
    public constructor() {
        this.app = new App(undefined)
        if (this.app.camera) this.camera = this.app.camera.instance
        if (this.app.renderer)
            this.domElement = this.app.renderer.instance
                ?.domElement as HTMLElement
        this.instance = this.createControls()
    }

    /**
     * Creates the OrbitControls instance.
     * @returns The OrbitControls instance.
     */
    private createControls(): OrbitControls {
        if (!this.camera || !this.domElement)
            throw new Error('Camera or domElement not found')
        const controls = new OrbitControls(this.camera, this.domElement)
        controls.enableZoom = false
        controls.enablePan = false
        controls.enableDamping = true
        controls.autoRotate = Camera.isMobileScreen
        // controls.target.set(0, 15, 0) remember for mobile
        controls.target.set(0, 0, 0)
        return controls
    }
}
