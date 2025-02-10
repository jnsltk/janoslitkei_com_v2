'use client'

import App from '../three-app/App'
import React, { useEffect } from 'react'
import { useIframe } from './IframeContext'

export default function ThreeAppWrapper() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const webgl = React.useRef<HTMLDivElement>(null)
    const css3d = React.useRef<HTMLDivElement>(null)
    const iframeContext = useIframe()
    const setIframeRef = iframeContext?.setIframeRef

    useEffect(() => {
        let app: App | undefined = undefined
        if (containerRef.current && webgl.current && css3d.current) {
            app = new App(containerRef.current)
            app.init(webgl.current, css3d.current).then(() => {
                if (setIframeRef) {
                    setIframeRef(app?.iframeElement as HTMLIFrameElement)
                }
            })
        }

        return () => {
            app?.destroy()
        }
    }, [setIframeRef])

    return (
        <div
            ref={containerRef}
            className={
                'relative top-5 h-1/2 w-full lg:pointer-events-none lg:absolute lg:bottom-0 lg:right-0 lg:top-16 lg:-mx-[10%] lg:min-h-full lg:w-[70%] lg:pt-0'
            }
        >
            <div ref={css3d}></div>
            <div ref={webgl}></div>
        </div>
    )
}
