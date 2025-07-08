'use client'

import ThreeAppWrapper from '@/components/ThreeAppWrapper'
import { ReactTyped, Typed } from 'react-typed'
import { useState } from 'react'
import Camera from '@/three-app/Camera'
import { GrPowerReset } from 'react-icons/gr'

export default function Hero() {
    const [showDescription, setShowDescription] = useState<boolean>(false)
    const [showReset, setShowReset] = useState<boolean>(false)
    const [typed, setTyped] = useState<Typed | null>(null)

    const onReset = () => {
        setTimeout(() => {
            setShowDescription(false)
            setShowReset(false)
        }, 150)
        setTimeout(() => {
            typed?.reset()
        }, 700)
    }

    return (
        <section
            id="home"
            className="bg-base-200 h-screen snap-start snap-always bg-gradient-to-bl from-ultramarine-900 to-indigo-950 pt-16 lg:mt-16 lg:h-[80vh] lg:scroll-mt-16 lg:pt-0"
        >
            <div className="flex h-full flex-col lg:justify-center">
                <ThreeAppWrapper />
                <div className="mx-6 -mt-16 text-slate-50/75 lg:mx-32 lg:mt-0">
                    <div className="font-mono text-3xl font-semibold lg:text-5xl">
                        <ReactTyped
                            typedRef={setTyped}
                            strings={["Hej!<br> Glad you're here :)"]}
                            typeSpeed={80}
                            showCursor={true}
                            startDelay={500}
                            onComplete={() => {
                                setTimeout(() => {
                                    setShowDescription(true)
                                }, 100)
                                setTimeout(() => {
                                    setShowReset(true)
                                }, 1000)
                            }}
                            onReset={function noRefCheck() {}}
                        />
                    </div>
                    <div
                        className={`pt-3 font-light transition-all duration-700 ease-out lg:max-w-[40vw] ${showDescription ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        <p>
                            My name is János, and I&apos;m a recent Software
                            Engineering graduate in Sweden. Welcome to my
                            personal website!
                        </p>
                        {Camera.isMobileScreen && (
                            <p className="pt-1 text-xs italic lg:pt-3">
                                Make sure to check back on desktop, this website
                                looks a lot better on larger screens.
                            </p>
                        )}
                        <a
                            className={`group mt-4 flex cursor-pointer items-center text-xs font-light text-neutral-50/50 transition-all duration-700 ease-out hover:text-neutral-50/95 active:text-cinnabar-500/95 active:duration-150 ${showReset ? 'opactity-100' : 'opacity-0'}`}
                            onMouseDown={onReset}
                        >
                            <GrPowerReset className="transition-all duration-700 ease-out group-hover:rotate-180 group-hover:text-neutral-50/95 group-active:text-cinnabar-500/95 group-active:duration-150" />{' '}
                            &nbsp;Replay
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
