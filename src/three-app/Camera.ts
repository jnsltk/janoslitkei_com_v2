import * as THREE from 'three'
import App from '@/three-app/App'
import Sizes from '@/three-app/Sizes'
import Controls from '@/three-app/Controls'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BASE_CAMERA_FOV: number = 25
const BASE_CAMERA_ZOOM_FOV: number = 7.5
const MD_CAMERA_FOV: number = 29
const MD_CAMERA_ZOOM_FOV: number = 9
const SM_CAMERA_FOV: number = 20
const CAMERA_NEAR: number = 0.1
const CAMERA_FAR: number = 1000
const INITIAL_ANGLE = 0.8122617534942821 * Math.PI * 0.25
const CAMERA_POSITION = {
    x: Math.sin(INITIAL_ANGLE) * 250,
    y: 60,
    z: Math.cos(INITIAL_ANGLE) * 250,
}
const CAMERA_ANIMATION_DURATION = 0.8

/**
 * Represents the camera class.
 * Manages the creation of the camera and the camera animation.
 */
export default class Camera {
    public static isMobileScreen: boolean = false

    private app: App
    private sizes: Sizes | undefined
    private controls: Controls | undefined
    private cameraFov: number = BASE_CAMERA_FOV
    private cameraZoomFov: number = BASE_CAMERA_ZOOM_FOV
    public instance: THREE.PerspectiveCamera | undefined

    /**
     * Creates an instance of the Camera class.
     */
    public constructor() {
        // Get the singleton instance of the App class
        this.app = new App(undefined, undefined, undefined)
        this.sizes = this.app.sizes
        this.instance = this.createCamera()

        this.handleScroll()
        this.handleCameraZoomAnimation()
        this.handleResize()
    }

    /**
     * Sets the Controls instance.
     * @param controls - The Controls instance.
     */
    public setControls(controls: Controls): void {
        this.controls = controls
    }

    /**
     * Creates the THREE.PerspectiveCamera instance.
     * @returns The camera instance.
     */
    private createCamera(): THREE.PerspectiveCamera | undefined {
        if (this.sizes && this.sizes.width && this.sizes.height) {
            const camera = new THREE.PerspectiveCamera(
                this.cameraFov,
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
     * Handles the scroll event, orbiting the camera around the model based on the scroll progress.
     */
    private handleScroll(): void {
        const content = document.getElementById('content') as HTMLElement
        let scrollProgress = 0

        content.addEventListener('scroll', () => {
            const maxScroll = content.scrollHeight - content.clientHeight
            scrollProgress = content.scrollTop / maxScroll
            let angle = scrollProgress * Math.PI * -0.25 + INITIAL_ANGLE

            if (angle < 0) angle = 0

            // Adjust the camera's spherical position based on scroll
            if (this.instance) {
                this.instance.position.x = Math.sin(angle) * 250
                this.instance.position.z = Math.cos(angle) * 250
            }
            this.controls?.instance.update()
        })
    }

    /**
     * Handles the camera zoom in animation when entering or leaving the projects section.
     */
    private handleCameraZoomAnimation(): void {
        /**
         * Animates the camera.
         * @param cameraPositionY The desired y position of the camera.
         * @param cameraFov The desired field of view of the camera.
         * @param currentLookAtPosition The current lookAt position of the camera.
         * @param lookAtTarget The desired lookAt target of the camera.
         */
        const animateCamera = (
            cameraPositionY: number,
            cameraFov: number,
            currentLookAtPosition: THREE.Vector3,
            lookAtTarget: THREE.Vector3,
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
            if (this.instance && this.controls) {
                gsap.to(lookAtPosition, {
                    duration: CAMERA_ANIMATION_DURATION,
                    ...lookAtTarget,
                    onUpdate: () => {
                        this.controls?.instance.target.set(
                            lookAtPosition.x,
                            lookAtPosition.y,
                            lookAtPosition.z,
                        )
                        this.controls?.instance.update()
                    },
                })
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
                    this.cameraZoomFov,
                    new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(2, 21.5, 0),
                ),
            onLeaveBack: () =>
                animateCamera(
                    CAMERA_POSITION.y,
                    this.cameraFov,
                    new THREE.Vector3(2, 21.5, 0),
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
                    this.cameraFov,
                    new THREE.Vector3(2, 21.5, 0),
                    new THREE.Vector3(5, -10, 0),
                ),
            onLeaveBack: () =>
                animateCamera(
                    CAMERA_POSITION.y - 20,
                    this.cameraZoomFov,
                    new THREE.Vector3(5, -10, 0),
                    new THREE.Vector3(2, 21.5, 0),
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

            // Update webgl renderer size
            this.app.renderer?.instance?.setSize(
                this.sizes.width,
                this.sizes.height,
            )

            // Update css renderer size
            this.app.renderer?.cssInstance?.setSize(
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
    private updateCameraFov(): void {
        if ((this.sizes?.width ?? 0) < 500) {
            Camera.isMobileScreen = true
            this.cameraFov = SM_CAMERA_FOV
        } else if ((this.sizes?.width ?? 0) < 850) {
            Camera.isMobileScreen = false
            this.cameraFov = MD_CAMERA_FOV
            this.cameraZoomFov = MD_CAMERA_ZOOM_FOV
        } else if ((this.sizes?.width ?? 0) < 1200) {
            Camera.isMobileScreen = false
            this.cameraFov = BASE_CAMERA_FOV
            this.cameraZoomFov = BASE_CAMERA_ZOOM_FOV
        } else {
            Camera.isMobileScreen = false
            this.cameraFov = MD_CAMERA_FOV
            this.cameraZoomFov = MD_CAMERA_ZOOM_FOV
        }
        this.instance!.fov = this.cameraFov
        this.instance!.updateProjectionMatrix()
    }
}
