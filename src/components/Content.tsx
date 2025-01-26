'use client'

import React, { ReactNode, useEffect } from 'react'
import { useIframe } from '@/components/IframeContext'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ContentProps {
    children: ReactNode
}

export default function Content({ children }: ContentProps) {
    const iframeContext = useIframe()
    useEffect(() => {
        const sendMessageToIframe = iframeContext
            ? iframeContext.sendMessageToIframe
            : () => {}
        ScrollTrigger.create({
            trigger: '#about',
            start: 'top center',
            end: 'bottom center',
            scroller: '#content',
            onEnter: () => {
                sendMessageToIframe({ page: 'desktop' })
                // Absolute hack
                setTimeout(() => {
                    sendMessageToIframe({ page: 'Me.jpg' })
                }, 250)
            },
            onLeaveBack: () => {
                sendMessageToIframe({ close: 'Me.jpg' })
            }
        })
        ScrollTrigger.create({
            trigger: '#projects',
            start: 'top center',
            end: 'bottom center',
            scroller: '#content',
            onEnter: () => {
                sendMessageToIframe({ page: 'Portfolio' })
            },
            onLeaveBack: () => {
                sendMessageToIframe({ close: 'Portfolio' })
            },
        })
    }, [iframeContext])
    return (
        <div
            id="content"
            className="h-screen snap-y snap-mandatory overflow-auto overscroll-contain"
        >
            {children}
        </div>
    )
}
