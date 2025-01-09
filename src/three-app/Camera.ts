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
const CAMERA_ANIMATION_DURATION = 0.8
const MODEL_ROTATION = 0.5369

/**
 * Represents the camera class.
 * Manages the creation of the camera and the camera animation.
 */
export default class Camera {
    private static cameraFov: number = BASE_CAMERA_FOV
    private static cameraZoomFov: number = BASE_CAMERA_ZOOM_FOV
    public static isMobileScreen: boolean = false

    private app: App
    public instance: THREE.PerspectiveCamera | undefined
    private sizes: Sizes | undefined

    /**
     * Creates an instance of the Camera class.
     */
    public constructor() {
        this.app = new App(undefined)
        this.sizes = this.app.sizes
        this.instance = this.createCamera()
        this.handleCameraAnimation()
        this.handleResize()
    }

    /**
     * Creates the THREE.PerspectiveCamera instance.
     * @returns The camera instance.
     */
    private createCamera(): THREE.PerspectiveCamera | undefined {
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

    /**
     * Handles the camera animation.
     */
    private handleCameraAnimation(): void {
        /**
         * Animates the camera.
         * @param cameraPositionY The desired y position of the camera.
         * @param cameraFov The desired field of view of the camera.
         * @param currentLookAtPosition The current lookAt position of the camera.
         * @param lookAtTarget The desired lookAt target of the camera.
         * @param modelPosition The desired position of the model.
         * @param modelRotation The desired rotation of the model. Optional.
         */
        const animateCamera = (
            cameraPositionY: number,
            cameraFov: number,
            currentLookAtPosition: THREE.Vector3,
            lookAtTarget: THREE.Vector3,
            modelPosition: THREE.Vector3,
            modelRotation?: number,
        ): void => {
            if (this.instance) {
                gsap.to(this.instance.position, {
                    duration: CAMERA_ANIMATION_DURATION,
                    y: cameraPositionY,
                })
            }

            if (this.instance) {
                gsap.to(this.instance, {
                    duration: CAMERA_ANIMATION_DURATION,
                    fov: cameraFov,
                    onUpdate: () => {
                        if (this.instance)
                            this.instance.updateProjectionMatrix()
                    },
                })
            }

            const lookAtPosition = currentLookAtPosition
            if (this.instance)
                gsap.to(lookAtPosition, {
                    duration: CAMERA_ANIMATION_DURATION,
                    ...lookAtTarget,
                    onUpdate: () => {
                        if (this.instance) this.instance.lookAt(lookAtPosition)
                    },
                })

            if (SceneBuilder.model) {
                gsap.to(SceneBuilder.model.position, {
                    duration: CAMERA_ANIMATION_DURATION,
                    ...modelPosition,
                })
                if (typeof modelRotation !== 'undefined') {
                    gsap.to(SceneBuilder.model.rotation, {
                        duration: CAMERA_ANIMATION_DURATION,
                        y: modelRotation,
                    })
                }
            }
        }

        ScrollTrigger.create({
            trigger: '#projects',
            start: 'top center',
            end: 'bottom center',
            scroller: '#content',
            onEnter: () =>
                animateCamera(
                    CAMERA_POSITION.y - 20,
                    Camera.cameraZoomFov,
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 10.5, 0),
                    new THREE.Vector3(
                        (SceneBuilder.model?.position.x ?? 0) - 1.5,
                        (SceneBuilder.model?.position.y ?? 0) - 10.2,
                        SceneBuilder.model?.position.z ?? 0,
                    ),
                    MODEL_ROTATION,
                ),
            onLeaveBack: () =>
                animateCamera(
                    CAMERA_POSITION.y,
                    Camera.cameraFov,
                    new THREE.Vector3(0, 10.5, 0),
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 0, 0),
                ),
        })

        ScrollTrigger.create({
            trigger: '#footer',
            start: 'top+=100 bottom',
            end: 'bottom top',
            scroller: '#content',
            onEnter: () =>
                animateCamera(
                    CAMERA_POSITION.y,
                    Camera.cameraFov - 3,
                    new THREE.Vector3(0, 10.5, 0),
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 0, 0),
                ),
            onLeaveBack: () =>
                animateCamera(
                    CAMERA_POSITION.y - 20,
                    Camera.cameraZoomFov,
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(0, 10.5, 0),
                    new THREE.Vector3(
                        (SceneBuilder.model?.position.x ?? 0) - 1.5,
                        (SceneBuilder.model?.position.y ?? 0) - 10.2,
                        SceneBuilder.model?.position.z ?? 0,
                    ),
                ),
        })
    }

    /**
     * Handles the window resize event.
     */
    private handleResize(): void {
        window.addEventListener('resize', this.onResize.bind(this))
        window.dispatchEvent(new Event('resize'))
    }

    /**
     * Updates the camera aspect ratio, renderer size and camera field of view.
     */
    private onResize(): void {
        if (
            this.sizes &&
            this.sizes.width &&
            this.sizes.height &&
            this.instance
        ) {
            this.instance.aspect = this.sizes.width / this.sizes.height
            this.instance.updateProjectionMatrix()
            this.app.renderer?.instance?.setSize(
                this.sizes.width,
                this.sizes.height,
            )
            this.updateCameraFov()
        }
    }

    /**
     * Helper function to update the camera field of view based on the Sizes instance,
     * which itself is based on the screen size.
     */
    private updateCameraFov():void {
        if ((this.sizes?.width ?? 0) < 500) {
            Camera.isMobileScreen = true
            Camera.cameraFov = SM_CAMERA_FOV
        } else if ((this.sizes?.width ?? 0) < 850) {
            Camera.isMobileScreen = false
            Camera.cameraFov = MD_CAMERA_FOV
            Camera.cameraZoomFov = MD_CAMERA_ZOOM_FOV
        } else if ((this.sizes?.width ?? 0) < 1200) {
            Camera.isMobileScreen = false
            Camera.cameraFov = BASE_CAMERA_FOV
            Camera.cameraZoomFov = BASE_CAMERA_ZOOM_FOV
        } else {
            Camera.isMobileScreen = false
            Camera.cameraFov = MD_CAMERA_FOV
            Camera.cameraZoomFov = MD_CAMERA_ZOOM_FOV
        }
        this.instance!.fov = Camera.cameraFov
        this.instance!.updateProjectionMatrix()
    }
}
