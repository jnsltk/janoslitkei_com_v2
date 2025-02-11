'use client'

import '../globals.css'
import Welcome from './components/Welcome'
import Desktop from './components/Desktop'
import { useEffect, useState } from 'react'

export default function Screen() {
    const [content, setContent] = useState('welcome')
    const [showMsg, setShowMsg] = useState(false)

    function onMessage(event: MessageEvent) {
        if (event.data.page === 'desktop') {
            setContent('desktop')
        } else if (event.data.page === 'welcome') {
            setContent('welcome')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowMsg(true)
        }, 2000)
    })

    useEffect(() => {
        window.addEventListener('message', onMessage)

        return () => {
            window.removeEventListener('message', onMessage)
        }
    }, [])

    return (
        <div lang="en" className="h-full overflow-hidden">
                {content === 'welcome' ? (
                    <Welcome showMsg={showMsg} />
                ) : (
                    <Desktop />
                )}
        </div>
    )
}
