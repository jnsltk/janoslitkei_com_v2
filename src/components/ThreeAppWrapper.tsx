'use client'

import App from '../three-app/App'
import React, { useEffect } from 'react'

export default function ThreeAppWrapper() {
    const containerRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            new App(containerRef.current)
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={
                'pointer-events-none absolute bottom-0 h-2/5 w-full border-2 border-yellow-400 md:right-0 md:top-32 md:-mx-[10%] md:h-[84vh] md:w-[70%] md:pt-0'
            }
        />
    )
}
