import * as THREE from 'three'
import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'

const CAMERA_FOV: number = 14
const CAMERA_NEAR: number = 0.1
const CAMERA_FAR: number = 1000
const CAMERA_POSITION = { x: 11, y: 4, z: 15 }

export default class Camera {
    app: App
    instance: THREE.PerspectiveCamera | undefined
    sizes: Sizes | undefined

    constructor() {
        this.app = new App(undefined)
        this.sizes = this.app.sizes
        this.instance = this.createCamera()
    }

    createCamera() {
        if (this.sizes && this.sizes.width && this.sizes.height) {
            const camera = new THREE.PerspectiveCamera(CAMERA_FOV, this.sizes.width / this.sizes.height, CAMERA_NEAR, CAMERA_FAR)
            camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z)
            camera.lookAt(0, 0, 0)
            return camera
        }
    }

}