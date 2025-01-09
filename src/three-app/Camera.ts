import * as THREE from 'three'
import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SceneBuilder from '@/three-app/SceneBuilder'

gsap.registerPlugin(ScrollTrigger)

const BASE_CAMERA_FOV: number = 25
const BASE_CAMERA_ZOOM_FOV: number = 9.5
const MD_CAMERA_FOV: number = 29
const MD_CAMERA_ZOOM_FOV: number = 11
const SM_CAMERA_FOV: number = 20
const CAMERA_NEAR: number = 0.1
const CAMERA_FAR: number = 1000
const CAMERA_POSITION = { x: 125, y: 60, z: 215 }


export default class Camera {
    public static cameraFov: number = BASE_CAMERA_FOV
    public static cameraZoomFov: number = BASE_CAMERA_ZOOM_FOV
    public static isMobileScreen: boolean = false

    app: App
    instance: THREE.PerspectiveCamera | undefined
    sizes: Sizes | undefined

    constructor() {
        this.app = new App(undefined)
        this.sizes = this.app.sizes
        this.instance = this.createCamera()
        this.handleCameraAnimation()
        this.handleResize()
    }

    createCamera() {
        if (this.sizes && this.sizes.width && this.sizes.height) {
            const camera = new THREE.PerspectiveCamera(
                Camera.cameraFov,
                this.sizes.width / this.sizes.height,
                CAMERA_NEAR,
                CAMERA_FAR,
            )
            camera.position.set(
                CAMERA_POSITION.x,
                CAMERA_POSITION.y,
                CAMERA_POSITION.z,
            )
            camera.lookAt(0, 0, 0)
            return camera
        }
    }

    handleCameraAnimation() {
        ScrollTrigger.create({
            trigger: '#projects',
            start: 'top center',
            end: 'bottom center',
            scroller: '#content',
            onEnter: () => {
                if (this.instance)
                    gsap.to(this.instance.position, {
                        duration: 0.8,
                        x: CAMERA_POSITION.x,
                        y: CAMERA_POSITION.y - 20,
                        z: CAMERA_POSITION.z,
                    })
                if (this.instance)
                    gsap.to(this.instance, {
                        duration: 0.8,
                        fov: Camera.cameraZoomFov,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.updateProjectionMatrix() // Update the projection matrix after each frame
                        },
                    })
                const lookAtTarget = new THREE.Vector3(0, 0, 0)
                if (this.instance)
                    gsap.to(lookAtTarget, {
                        duration: 0.8,
                        x: 0,
                        y: 10.5,
                        z: 0,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.lookAt(lookAtTarget)
                        },
                    })
                if (SceneBuilder.model) {
                    gsap.to(SceneBuilder.model.position, {
                        duration: 0.8,
                        x: SceneBuilder.model.position.x - 3.8,
                        y: SceneBuilder.model.position.y - 10.2,
                    })
                    gsap.to(SceneBuilder.model.rotation, {
                        duration: 0.8,
                        y: 0.5369,
                    }) 
                }
            },
            onLeaveBack: () => {
                if (this.instance)
                    gsap.to(this.instance.position, {
                        duration: 0.8,
                        x: CAMERA_POSITION.x,
                        y: CAMERA_POSITION.y,
                        z: CAMERA_POSITION.z,
                    })
                if (this.instance)
                    gsap.to(this.instance, {
                        duration: 0.8,
                        fov: Camera.cameraFov,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.updateProjectionMatrix() // Update the projection matrix after each frame
                        },
                    })
                const lookAtTarget = new THREE.Vector3(0, 10, 0)
                if (this.instance)
                    gsap.to(lookAtTarget, {
                        duration: 0.8,
                        x: 0,
                        y: 0,
                        z: 0,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.lookAt(lookAtTarget)
                        },
                    })
                if (SceneBuilder.model) {
                    gsap.to(SceneBuilder.model.position, {
                        duration: 0.8,
                        x: 0,
                        y: 0,
                    })
                }
            },
        })
        ScrollTrigger.create({
            trigger: '#footer',
            start: 'top+=100 bottom',
            end: 'bottom top',
            scroller: '#content',
            onEnter: () => {
                if (this.instance)
                    gsap.to(this.instance.position, {
                        duration: 0.8,
                        x: CAMERA_POSITION.x,
                        y: CAMERA_POSITION.y,
                        z: CAMERA_POSITION.z,
                    })
                if (this.instance)
                    gsap.to(this.instance, {
                        duration: 0.8,
                        fov: Camera.cameraFov - 3,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.updateProjectionMatrix() // Update the projection matrix after each frame
                        },
                    })
                const lookAtTarget = new THREE.Vector3(0, 10, 0)
                if (this.instance)
                    gsap.to(lookAtTarget, {
                        duration: 0.8,
                        x: 0,
                        y: 0,
                        z: 0,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.lookAt(lookAtTarget)
                        },
                    })
                if (SceneBuilder.model) {
                    gsap.to(SceneBuilder.model.position, {
                        duration: 0.8,
                        x: 0,
                        y: 0,
                    })
                }
            },
            onLeaveBack: () => {
                if (this.instance)
                    gsap.to(this.instance.position, {
                        duration: 0.8,
                        x: CAMERA_POSITION.x,
                        y: CAMERA_POSITION.y - 20,
                        z: CAMERA_POSITION.z,
                    })
                if (this.instance)
                    gsap.to(this.instance, {
                        duration: 0.8,
                        fov: Camera.cameraZoomFov,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.updateProjectionMatrix() // Update the projection matrix after each frame
                        },
                    })
                const lookAtTarget = new THREE.Vector3(0, 0, 0)
                if (this.instance)
                    gsap.to(lookAtTarget, {
                        duration: 0.8,
                        x: 0,
                        y: 10.5,
                        z: 0,
                        onUpdate: () => {
                            if (this.instance)
                                this.instance.lookAt(lookAtTarget)
                        },
                    })
                if (SceneBuilder.model) {
                    gsap.to(SceneBuilder.model.position, {
                        duration: 0.8,
                        x: SceneBuilder.model.position.x - 1,
                        y: SceneBuilder.model.position.y - 10.2,
                    })
                }
            },
        })
    }

    handleResize() {
        window.addEventListener('resize', () => {
            console.log(this.sizes?.width, this.sizes?.height)
            if (
                this.sizes &&
                this.sizes.width &&
                this.sizes.height &&
                this.instance &&
                this.instance.aspect &&
                this.instance.updateProjectionMatrix
            ) {
                this.instance.aspect = this.sizes.width / this.sizes.height
                this.instance.updateProjectionMatrix()
                this.app.renderer?.instance?.setSize(
                    this.sizes.width,
                    this.sizes.height,
                )
                if (this.sizes.width < 500) {
                    Camera.isMobileScreen = true
                    Camera.cameraFov = SM_CAMERA_FOV
                    this.instance.fov = Camera.cameraFov
                    this.instance.updateProjectionMatrix()
                } else if (this.sizes.width < 850) {
                    Camera.isMobileScreen = false
                    Camera.cameraFov = MD_CAMERA_FOV
                    Camera.cameraZoomFov = MD_CAMERA_ZOOM_FOV
                    this.instance.fov = Camera.cameraFov
                    this.instance.updateProjectionMatrix()
                } else if (this.sizes.width < 1200) {
                    Camera.isMobileScreen = false
                    Camera.cameraFov = BASE_CAMERA_FOV
                    Camera.cameraZoomFov = BASE_CAMERA_ZOOM_FOV
                    this.instance.fov = Camera.cameraFov
                    this.instance.updateProjectionMatrix()
                } else {
                    Camera.isMobileScreen = false
                    Camera.cameraFov = MD_CAMERA_FOV
                    Camera.cameraZoomFov = MD_CAMERA_ZOOM_FOV
                    this.instance.fov = Camera.cameraFov
                    this.instance.updateProjectionMatrix()
                }
            }
        })
        window.dispatchEvent(new Event('resize'))
    }
}
