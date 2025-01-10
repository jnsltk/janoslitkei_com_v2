import * as THREE from 'three'

export default class ScreenMaterial {
    public material: THREE.ShaderMaterial | undefined
    private screenTexture: THREE.Texture | undefined

    public constructor() {
        this.initialize();
    }

    private async initialize() {
        const loader = new THREE.TextureLoader()
        this.screenTexture = loader.load('pc/screen/jan.png')

        const smudgesTexture = loader.load('pc/screen/smudges.jpg')

        const video = document.createElement('video')
        video.src = 'pc/screen/static.mp4'
        video.muted = true
        video.loop = true
        video.play()
        const staticTexture = new THREE.VideoTexture(video)

        // Shaders inspired by ChatGPT
        const vertexShader = await this.loadShader('/shaders/screenVertex.glsl')
        const fragmentShader = await this.loadShader('/shaders/screenFragment.glsl')
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                screenTexture: { value: this.screenTexture },
                smudgesTexture: { value: smudgesTexture },
                staticTexture: { value: staticTexture },
                time: { value: 0.0 }, // For dynamic effects like flicker
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        })

        setTimeout(() => {
            this.updateScreenTexture('pc/screen/cat.png')
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
