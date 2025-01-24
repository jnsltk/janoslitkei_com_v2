'use client'
import '../globals.css'
import Welcome from './components/Welcome'
import Desktop from './components/Desktop'
import { useEffect, useState } from 'react'

export default function Screen() {
    const [content, setContent] = useState('welcome')

    function onMessage(event: MessageEvent) {
        if (event.data.page === 'desktop') {
            setContent('desktop')
        }
    }

    useEffect(() => {
        window.addEventListener('message', onMessage)

        return () => {
            window.removeEventListener('message', onMessage)
        }
    }, [])

    return (
        <html lang="en" className="h-full overflow-hidden">
            <body>
                {content === 'welcome' ? <Welcome /> : <Desktop />}
            </body>
        </html>
    )
}
