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

    return <div ref={containerRef}
                className={'pt-6 md:pt-0 min-w-full md:min-w-[55vw] md:min-h-[84vh] md:absolute md:right-0 md:top-32 pointer-events-none'} />
}