'use client'

import ThreeAppWrapper from '@/components/ThreeAppWrapper'
import { ReactTyped } from 'react-typed'
import { useState } from 'react'

export default function Hero() {
    const [showDescription, setShowDescription] = useState<boolean>(false)

    return (
        <section
            id="home"
            className="snap-start snap-always mt-16 scroll-mt-16 bg-base-200 h-[80vh] bg-gradient-to-bl from-ultramarine-900 to-indigo-950"
        >
            <div className="h-full flex flex-col justify-center">
                    <div className="text-slate-50/75 mx-6 -mt-12 md:mt-0 md:mx-32">
                        <div className="text-3xl md:text-5xl font-semibold font-mono">
                            <ReactTyped
                                strings={["Hej!<br> Glad you're here :)"]}
                                typeSpeed={80}
                                showCursor={true}
                                startDelay={500}
                                onComplete={() =>
                                    setTimeout(() => {
                                        setShowDescription(true)
                                    }, 100)
                                }
                            />
                        </div>
                        <p
                            className={`py-6 font-light md:max-w-[40vw] transition-all duration-700 ease-out
                        ${showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        >
                            My name is János, and I&apos;m a third-year Software
                            Engineering student in Sweden. Welcome to my
                            personal website!
                        </p>
                    </div>
                    <ThreeAppWrapper />
            </div>
        </section>
    )
}
