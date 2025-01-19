'use client'

import App from '../three-app/App'
import React, { useEffect } from 'react'

export default function ThreeAppWrapper() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const webgl = React.useRef<HTMLDivElement>(null)
    const css3d = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        let app: App | undefined = undefined
        if (containerRef.current && webgl.current && css3d.current) {
            app = new App(containerRef.current, webgl.current, css3d.current)
        }

        return () => {
            app?.destroy()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={
                'h-1/2 w-full lg:pointer-events-none lg:absolute lg:bottom-0 lg:right-0 lg:top-16 lg:-mx-[10%] lg:min-h-full lg:w-[70%] lg:pt-0'
            }
        >
            <div ref={css3d}></div>
            <div ref={webgl}></div>
        </div>
    )
}
