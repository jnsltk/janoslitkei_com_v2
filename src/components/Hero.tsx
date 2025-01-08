'use client'

import ThreeAppWrapper from '@/components/ThreeAppWrapper'
import { ReactTyped } from 'react-typed'
import { useEffect, useState } from 'react'

export default function Hero() {
    const [showDescription, setShowDescription] = useState<boolean>(false)

    useEffect(() => {
        const showDescriptionDelay = setTimeout(() => {
            setShowDescription(true)
        }, 3400)

        return () => {
            clearTimeout(showDescriptionDelay)
        }
    })
    return (
        <section
            id="home"
            className="snap-start snap-always mt-16 scroll-mt-16 bg-base-200 h-[80vh] bg-gradient-to-bl from-ultramarine-900 to-indigo-950"
        >
            <div className="h-full flex flex-col justify-center">
                <ThreeAppWrapper />
                <div className="text-slate-50/75 mx-6 -mt-12 md:mt-0 md:mx-36">
                    <div className="text-3xl md:text-5xl font-semibold font-mono">
                        <ReactTyped
                            strings={["Hej!<br> Glad you're here :)"]}
                            typeSpeed={70}
                            showCursor={true}
                            startDelay={500}
                        />
                    </div>
                    <p
                        className={`py-6 font-light md:max-w-[40vw] transition-all duration-700 ease-out
                        ${showDescription ? 'opacity-100' : 'opacity-0'}`}
                    >
                        My name is János, and I&apos;m a third-year Software
                        Engineering student in Sweden. Welcome to my personal
                        website!
                    </p>
                </div>
            </div>
        </section>
    )
}
