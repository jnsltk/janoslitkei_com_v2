/**
 * Represents the Sizes class, which keeps track of the width, height, and pixel ratio of the div element.
 */
export default class Sizes {
    public width: number | undefined
    public height: number | undefined
    public pixelRatio: number | undefined

    /**
     * Creates an instance of the Sizes class.
     * @param divElement - The HTMLDivElement to track the width, height, and pixel ratio of.
     */
    public constructor(divElement: HTMLDivElement | undefined) {
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