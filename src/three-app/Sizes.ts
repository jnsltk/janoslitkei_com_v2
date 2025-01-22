/**
 * Represents the Sizes class, which keeps track of the width, height, and pixel ratio of the div element.
 */
export default class Sizes {
    public width?: number
    public height?: number
    public pixelRatio?: number
    private resizeCallback?: (() => void)

    /**
     * Creates an instance of the Sizes class.
     * @param divElement - The HTMLDivElement to track the width, height, and pixel ratio of.
     */
    public constructor(divElement: HTMLDivElement | undefined) {
        if (!divElement) return
        this.width = divElement.clientWidth
        this.height = divElement.clientHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.resizeCallback = () => {
            this.width = divElement.clientWidth
            this.height = divElement.clientHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        }

        window.addEventListener('resize', this.resizeCallback)
    }

    /**
     * Removes the event listener for the resize event.
     */
    public removeEventListener() {
        if (this.resizeCallback) {
            window.removeEventListener('resize', this.resizeCallback)
        }
    }
}