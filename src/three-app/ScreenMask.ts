import * as THREE from 'three'

export default class ScreenMask {
    public material?: THREE.ShaderMaterial

    public async initialize() {
        // Shaders inspired by ChatGPT
        const vertexShader = await this.loadShader('/shaders/screenVertex.glsl')
        const fragmentShader = await this.loadShader(
            '/shaders/screenFragment.glsl',
        )
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
        })
    }

    private async loadShader(path: string): Promise<string> {
        const response = await fetch(path)
        return await response.text()
    }
}
