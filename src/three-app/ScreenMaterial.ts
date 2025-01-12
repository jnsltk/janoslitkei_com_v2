import * as THREE from 'three'

export default class ScreenMaterial {
    public material: THREE.ShaderMaterial | undefined
    private screenTexture: THREE.Texture | undefined

    public constructor() {
        this.initialize();
    }

    private async initialize() {
        const loader = new THREE.TextureLoader()
        this.screenTexture = loader.load('pc/screen/screen_1.png')

        // Shaders inspired by ChatGPT
        const vertexShader = await this.loadShader('/shaders/screenVertex.glsl')
        const fragmentShader = await this.loadShader('/shaders/screenFragment.glsl')
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                screenTexture: { value: this.screenTexture },
                time: { value: 0.0 }, // For dynamic effects like flicker
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        })

        setTimeout(() => {
            this.updateScreenTexture('pc/screen/screen_2.png')
        }, 5000)
    }

    public updateScreenTexture(newImagePath: string): void {
        const loader = new THREE.TextureLoader()
        loader.load(newImagePath, newTexture => {
            // Update the uniform
            if (this.material && this.material.uniforms) {
                this.material.uniforms.screenTexture.value = newTexture
            }
            newTexture.needsUpdate = true
        })
    }

    private async loadShader(path: string): Promise<string> {
        const response = await fetch(path)
        return await response.text()
    }
}
