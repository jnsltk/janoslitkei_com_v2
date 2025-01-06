import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
    title: 'János_Litkei',
    description: 'János Litkei\'s personal website',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${jetBrainsMono.variable} bg-slate-200 font-sans overflow-hidden`}>
        <Navbar />
        {children}
        </body>
        </html>
    )
}
