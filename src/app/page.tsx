import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import Content from '@/components/Content'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/projects/ProjectsSection'
import Footer from '@/components/Footer'

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

export default function Home() {
    return (
        <html lang="en" className="h-full overflow-hidden">
            <body
                className={`${inter.variable} ${jetBrainsMono.variable} h-full overflow-hidden bg-slate-200 font-sans`}
            >
                <Navbar />
                <Content>
                    <Hero></Hero>
                    <AboutSection></AboutSection>
                    <ProjectsSection></ProjectsSection>
                    <Footer></Footer>
                </Content>
            </body>
        </html>
    )
}
