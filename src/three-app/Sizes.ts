export default class Sizes {
    width: number | undefined
    height: number | undefined
    pixelRatio: number | undefined

    constructor(divElement: HTMLDivElement | undefined) {
        if (!divElement) return
        this.width = divElement.clientWidth
        this.height = divElement.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        window.addEventListener('resize', () => {
            this.width = divElement.clientWidth
            this.height = divElement.clientHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        })
    }
}