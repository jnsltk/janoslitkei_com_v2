import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const CAMERA_FOV = 12;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;
const CAMERA_POSITION = { x: 8, y: 2, z: 15 };
const CONTROLS_MIN_DISTANCE = 21;
const CONTROLS_MAX_DISTANCE = 50;
const CONTROLS_MIN_POLAR_ANGLE = Math.PI / 5;
const CONTROLS_MAX_POLAR_ANGLE = Math.PI / 2;
const MODEL_ROTATION_SPEED = 0.0005;
const SCREEN_GEOMETRY = { width: 1.35, height: 1.13 };
const SCREEN_POSITION = { x: 0, y: 1.04, z: 0.38 };
const SCREEN_ROTATION_X = -3 * THREE.MathUtils.DEG2RAD;
const MIN_PAN = new THREE.Vector3(-2, -0.5, -2);
const MAX_PAN = new THREE.Vector3(2, 0.5, 2);

class SceneSetup {
    constructor(canvasElement, divElement) {
        this.canvasElement = canvasElement;
        this.divElement = divElement;
        this.sizes = {
            width: divElement.clientWidth,
            height: divElement.clientHeight
        };
        this.scene = new THREE.Scene();
        this.camera = this.createCamera();
        this.renderer = this.createRenderer();
        this.controls = this.createControls();
        this.model = null;
        this.textureLoader = new THREE.TextureLoader();
        this.init();
    }

    createCamera() {
        const camera = new THREE.PerspectiveCamera(CAMERA_FOV, this.sizes.width / this.sizes.height, CAMERA_NEAR, CAMERA_FAR);
        camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);
        camera.lookAt(0, 0, 0);
        this.scene.add(camera);
        return camera;
    }

    createRenderer() {
        const renderer = new THREE.WebGLRenderer({
            canvas: this.canvasElement,
            antialias: true,
            alpha: true
        });
        renderer.setSize(this.sizes.width, this.sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputEncoding = THREE.sRGBEncoding;
        return renderer;
    }

    createControls() {
        const controls = new OrbitControls(this.camera, this.canvasElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minDistance = CONTROLS_MIN_DISTANCE;
        controls.maxDistance = CONTROLS_MAX_DISTANCE;
        controls.minPolarAngle = CONTROLS_MIN_POLAR_ANGLE;
        controls.maxPolarAngle = CONTROLS_MAX_POLAR_ANGLE;
        return controls;
    }

    loadModel() {
        const bakedTexture = this.textureLoader.load('static/pc/baked_computer.jpg', () => {
            bakedTexture.flipY = false;
            bakedTexture.encoding = THREE.sRGBEncoding;

            const loader = new GLTFLoader();
            loader.load('static/pc/computer_setup.glb',
                (gltf) => {
                    this.model = gltf.scene;
                    this.model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshBasicMaterial({ map: bakedTexture });
                            child.material.side = THREE.DoubleSide;
                        }
                    });
                    this.scene.add(this.model);
                    this.scene.position.set(0, 0.2, 0);
                    this.loadScreenTexture();
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                (error) => {
                    console.error('An error occurred while loading the model:', error);
                }
            );
        });
    }

    loadScreenTexture() {
        const screenTexture = this.textureLoader.load('static/images/cat.png', () => {
            const screenGeometry = new THREE.PlaneGeometry(SCREEN_GEOMETRY.width, SCREEN_GEOMETRY.height);
            const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
            const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
            screenMesh.position.set(SCREEN_POSITION.x, SCREEN_POSITION.y, SCREEN_POSITION.z);
            screenMesh.rotation.set(SCREEN_ROTATION_X, 0, 0);
            this.model.add(screenMesh);
        });
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.sizes.width = this.divElement.clientWidth;
            this.sizes.height = this.divElement.clientHeight;
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }

    handleScroll() {
        let scrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const deltaY = window.scrollY - scrollY;
            scrollY = window.scrollY;
            if (this.model) {
                this.model.rotation.y += deltaY * MODEL_ROTATION_SPEED;
            }
        });
    }

    animate() {
        const tick = () => {
            this.controls.update();
            this.controls.target.clamp(MIN_PAN, MAX_PAN);
            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(tick);
        };
        tick();
    }

    init() {
        this.loadModel();
        this.handleResize();
        this.handleScroll();
        this.animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvasElement = document.getElementById('displayContent');
    const divElement = document.querySelector('.block');
    new SceneSetup(canvasElement, divElement);
});