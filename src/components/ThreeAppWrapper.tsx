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
                'lg:pointer-events-none bottom-0 h-1/2 w-full lg:absolute lg:right-0 lg:top-32 lg:-mx-[10%] lg:h-[84vh] lg:w-[70%] lg:pt-0'
            }
        />
    )
}
