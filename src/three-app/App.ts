import * as THREE from 'three'
import Camera from '@/three-app/Camera'
import Renderer from '@/three-app/Renderer'
import Sizes from '@/three-app/Sizes'


export default class App {
    static #instance: App

    scene: THREE.Scene
    sizes: Sizes
    camera: Camera
    renderer: Renderer

    private constructor() {
        this.scene = new THREE.Scene()
        this.sizes = new Sizes()
        this.camera = new Camera()
        this.renderer = new Renderer()
    }

    public static get instance(): App {
        if (!App.#instance) {
            App.#instance = new App()
        }
        return App.#instance
    }
}