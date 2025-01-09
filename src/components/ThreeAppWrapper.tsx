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
                'h-1/2 w-full lg:pointer-events-none lg:absolute lg:right-0 lg:top-16 lg:-mx-[10%] lg:min-h-full lg:bottom-0 lg:w-[70%] lg:pt-0'
            }
        />
    )
}
