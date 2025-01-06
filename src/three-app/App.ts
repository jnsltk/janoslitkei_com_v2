import * as THREE from 'three'
import Camera from '@/three-app/Camera'
import Renderer from '@/three-app/Renderer'
import Sizes from '@/three-app/Sizes'
import SceneBuilder from '@/three-app/SceneBuilder'

const MODEL_ROTATION_SPEED = 0.0004;

export default class App {
    static instance: App
    sceneBuilder: SceneBuilder | undefined
    scene: THREE.Scene | undefined
    divElement: HTMLDivElement | undefined
    sizes: Sizes | undefined
    camera: Camera | undefined
    renderer: Renderer | undefined

    constructor(divElement: HTMLDivElement | undefined ) {
        if (App.instance) {
            return App.instance
        }
        App.instance = this

        this.divElement = divElement
        this.sceneBuilder = new SceneBuilder()
        this.scene = this.sceneBuilder.build()
        this.sizes = new Sizes(this.divElement)
        this.camera = new Camera()
        this.renderer = new Renderer()

        this.init()
    }

    private handleScroll() {
        const scrollContainer = document.getElementById('content');
        if (!scrollContainer) return;
        let scrollY = scrollContainer.scrollTop;
        scrollContainer.addEventListener('scroll', () => {
            const deltaY = scrollContainer.scrollTop - scrollY;
            scrollY = scrollContainer.scrollTop;
            if (SceneBuilder.model) {
                SceneBuilder.model.rotation.y += deltaY * MODEL_ROTATION_SPEED;
            }
        });
    }

    // TODO: fix resize
    private handleResize() {
        window.addEventListener('resize', () => {
            if(this.sizes && this.divElement && this.camera && this.camera.instance && this.renderer && this.renderer.instance) {
                this.sizes.width = this.divElement.clientWidth;
                this.sizes.height = this.divElement.clientHeight;
                this.camera.instance.aspect = this.sizes.width / this.sizes.height;
                this.camera.instance.updateProjectionMatrix();
                this.renderer.instance.setSize(this.sizes.width, this.sizes.height);
                this.renderer.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }
        });
    }

    private animate(): void {
        const tick = (): void => {
            // this.controls.update();
            // this.controls.target.clamp(MIN_PAN, MAX_PAN);
            if (this.renderer && this.scene && this.camera && this.camera.instance) this.renderer.render(this.scene, this.camera.instance)
            window.requestAnimationFrame(tick)
        }
        tick()
    }

    private init(): void {
        this.animate()
        this.handleScroll()
        this.handleResize()
    }
}