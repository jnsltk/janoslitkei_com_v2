'use client'
import '../globals.css'
import Welcome from '@/app/screen/components/welcome'
import Desktop from './components/desktop'
import { useEffect, useState } from 'react'

export default function Screen() {
    const [content, setContent] = useState('welcome')
    useEffect(() => {
        window.addEventListener('message', event => {
            if (event.data.page === 'desktop') {
                setContent('desktop')
            } 
        })
    }, [])

    return (
        <html lang="en" className="h-full overflow-hidden">
            <body className="bg-monitor-bg">
                {content === 'welcome' ? <Welcome /> : <Desktop />}
            </body>
        </html>
    )
}
