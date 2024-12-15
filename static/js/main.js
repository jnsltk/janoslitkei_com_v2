import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const loading = document.querySelector('#loader');

document.addEventListener('DOMContentLoaded', () => {
    const canvasElement = document.getElementById('displayContent');
    const divElement = document.querySelector('.block');
    const scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const sizes = {
        width: divElement.clientWidth,
        height: divElement.clientHeight
    };

    // Base camera setup
    const camera = new THREE.PerspectiveCamera(12, sizes.width / sizes.height, 0.1, 1000);
    camera.position.set(8, 2, 15);
    camera.lookAt(0, 0, 0);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvasElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minDistance = 21;
    controls.maxDistance = 50;
    controls.minPolarAngle = Math.PI / 5;
    controls.maxPolarAngle = Math.PI / 2;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvasElement,
        antialias: true,
        alpha: true
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Variable to track the model
    let model;

    // Material setup
    const bakedTexture = textureLoader.load('static/pc/baked_computer.jpg', () => {
        bakedTexture.flipY = false;
        bakedTexture.encoding = THREE.sRGBEncoding;

        // Loader
        const loader = new GLTFLoader();
        loader.load('static/pc/computer_setup.glb',
            (gltf) => {
                model = gltf.scene;

                // Apply the baked material across the model
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshBasicMaterial({ map: bakedTexture });
                        // make the model double sided
                        child.material.side = THREE.DoubleSide;
                    }
                });

                scene.add(model);
                scene.position.set(0, 0.2, 0);
                // loading.style.display = 'none';

                // Load the screen image texture
                const screenTexture = textureLoader.load('static/images/cat.png', () => {
                    // Create a plane geometry for the screen
                    const screenGeometry = new THREE.PlaneGeometry(1.35, 1.13); // Adjust dimensions as needed
                    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
                    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);

                    // Position the screen mesh
                    screenMesh.position.set(0, 1.04, 0.38); // Adjust position as needed
                    screenMesh.rotation.set(-3 * THREE.MathUtils.DEG2RAD, 0, 0); // Adjust rotation as needed

                    // Add the screen mesh to the model
                    model.add(screenMesh);
                });
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error occurred while loading the model:', error);
            }
        );
    });

    // Handle div resizing
    window.addEventListener('resize', () => {
        sizes.width = divElement.clientWidth;
        sizes.height = divElement.clientHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Track the scroll position and apply rotation
    let scrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const deltaY = window.scrollY - scrollY;
        scrollY = window.scrollY;

        if (model) {
            model.rotation.y += deltaY * 0.0005; // Adjust rotation speed as needed
        }
    });

    // Animation tick
    const minPan = new THREE.Vector3(-2, -0.5, -2);
    const maxPan = new THREE.Vector3(2, 0.5, 2);

    const tick = () => {
        controls.update();
        controls.target.clamp(minPan, maxPan);
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
    };

    tick();
});