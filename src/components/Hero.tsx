'use client'

import ThreeAppWrapper from '@/components/ThreeAppWrapper'
import { ReactTyped } from 'react-typed'
import { useState } from 'react'

export default function Hero() {
    const [showDescription, setShowDescription] = useState<boolean>(false)
    const isSmall = true;

    return (
        <section
            id="home"
            className="bg-base-200 h-screen snap-start snap-always bg-gradient-to-bl from-ultramarine-900 to-indigo-950 pt-16 lg:mt-16 lg:h-[80vh] lg:scroll-mt-16 lg:pt-0"
        >
            <div className="flex h-full flex-col lg:justify-center">
                <ThreeAppWrapper />
                <div className="mx-6 -mt-8 text-slate-50/75 lg:mx-32 lg:mt-0">
                    <div className="font-mono text-3xl font-semibold lg:text-5xl">
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
                    <div
                        className={`pt-3 font-light transition-all duration-700 ease-out lg:max-w-[40vw] ${showDescription ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        <p>
                        My name is János, and I&apos;m a third-year Software
                        Engineering student in Sweden. Welcome to my personal
                        website!
                        </p>
                        {isSmall && (
                            <p className='italic pt-3'>Make sure to check back on desktop, this website looks a lot better on larger screens.</p>
                            )}
                    </div>
                </div>
            </div>
        </section>
    )
}
