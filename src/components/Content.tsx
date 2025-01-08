'use client'

import React, { ReactNode } from 'react'

interface ContentProps {
    children: ReactNode
}

export default function Content({ children }: ContentProps) {
    return (
        <div id="content" className="snap-y snap-mandatory overflow-auto h-screen overscroll-contain">
            {children}
        </div>
    )
}