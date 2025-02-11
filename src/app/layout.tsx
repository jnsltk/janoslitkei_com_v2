import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import type { Metadata } from 'next'

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
    description: "János Litkei's personal website",
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full overflow-hidden">
            <body
                className={`${inter.variable} ${jetBrainsMono.variable} h-full overflow-hidden bg-slate-200 font-sans`}
            >
                {/* Layout UI */}
                {/* Place children where you want to render a page or nested layout */}
                <main>{children}</main>
            </body>
        </html>
    )
}
