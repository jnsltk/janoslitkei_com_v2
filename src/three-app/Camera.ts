import * as THREE from 'three'
import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'

const CAMERA_FOV: number = 13
const CAMERA_NEAR: number = 0.1
const CAMERA_FAR: number = 1000

export default class Camera {
    app: App
    instance: THREE.PerspectiveCamera
    sizes: Sizes

    constructor() {
        this.app = App.instance
        this.sizes = this.app.sizes
        this.instance = new THREE.PerspectiveCamera(CAMERA_FOV, this.sizes.width / this.sizes.height, CAMERA_NEAR, CAMERA_FAR)
    }
}