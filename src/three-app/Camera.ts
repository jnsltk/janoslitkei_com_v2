import * as THREE from 'three'
import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SceneBuilder from '@/three-app/SceneBuilder'

gsap.registerPlugin(ScrollTrigger)

const CAMERA_FOV: number = 20
const CAMERA_NEAR: number = 0.1
const CAMERA_FAR: number = 1000
const CAMERA_POSITION = { x: 125, y: 60, z: 215 }

export default class Camera {
    app: App
    instance: THREE.PerspectiveCamera | undefined
    sizes: Sizes | undefined

    constructor() {
        this.app = new App(undefined)
        this.sizes = this.app.sizes
        this.instance = this.createCamera()
        this.handleCameraAnimation()
    }

    createCamera() {
        if (this.sizes && this.sizes.width && this.sizes.height) {
            const camera = new THREE.PerspectiveCamera(
                CAMERA_FOV,
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
                        fov: 8,
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
                        y: 10,
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
                        fov: CAMERA_FOV,
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
                        fov: CAMERA_FOV - 3,
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
                        fov: 8,
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
                        y: 10,
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
}
