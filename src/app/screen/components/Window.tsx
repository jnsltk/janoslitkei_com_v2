'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import arrowLeft from '../../../../public/pc/screen/ui/arrow_left.png'
import arrowRight from '../../../../public/pc/screen/ui/arrow_right.png'
import arrowUp from '../../../../public/pc/screen/ui/arrow_up.png'
import arrowDown from '../../../../public/pc/screen/ui/arrow_down.png'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ANIMATION_DURATION = 0.25

export interface WindowProps {
    title: string
    children: React.ReactNode
    windowWidth: number
    windowHeight: number
    windowX: number
    windowY: number
    windowZ?: number
    isFinderWindow?: boolean
    onClose?: () => void
}
export default function Window({
    title,
    children,
    windowWidth,
    windowHeight,
    windowX,
    windowY,
    windowZ,
    isFinderWindow,
    onClose,
}: WindowProps) {
    const [isTransitioning, setIsTransitioning] = useState(true)
    const [isClosing, setIsClosing] = useState(false)
    const closeRef = React.useRef<HTMLDivElement>(null)

    const handleClose = React.useCallback(() => {
        setIsTransitioning(true)
        setIsClosing(true)
        setTimeout(() => {
            if (onClose) onClose()
        }, ANIMATION_DURATION * 1000)
    }, [onClose])

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            if (event.data.close && (event.data.close === title)) {
                if (closeRef.current) {
                    closeRef.current.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
                }
            }
        }

        window.addEventListener('message', onMessage)

        return () => {
            window.removeEventListener('message', onMessage)
        }
    }, [title, handleClose])

    return (
        <>
            {isTransitioning ? (
                <div>
                    <motion.div
                        initial={
                            isClosing
                                ? {
                                      width: windowWidth,
                                      height: windowHeight,
                                      top: windowY,
                                      left: windowX,
                                  }
                                : {
                                      width: windowWidth / 100,
                                      height: windowWidth / 100,
                                      top: windowHeight / 2 + windowY,
                                      left: windowWidth / 2 + windowX,
                                  }
                        }
                        animate={
                            isClosing
                                ? {
                                      width: windowWidth / 100,
                                      height: windowHeight / 100,
                                      top: windowHeight / 2 + windowY,
                                      left: windowWidth / 2 + windowX,
                                  }
                                : {
                                      width: windowWidth,
                                      height: windowHeight,
                                      top: windowY,
                                      left: windowX,
                                  }
                        }
                        transition={{
                            duration: ANIMATION_DURATION,
                            ease: 'linear',
                        }}
                        className="absolute border-4 border-neutral-600"
                        style={{zIndex: windowZ}}
                        onAnimationComplete={() => {
                            setIsTransitioning(false)
                        }}
                    />
                </div>
            ) : (
                <div
                    className={`absolute flex h-[375px] flex-col rounded-sm border-2 border-b-4 border-r-4 border-black bg-white`}
                    // Inline styles since you can't use tailwind classes for dynamic values
                    style={{
                        left: `${windowX}px`,
                        top: `${windowY}px`,
                        height: `${windowHeight}px`,
                        width: `${windowWidth}px`,
                        zIndex: windowZ,
                    }}
                >
                    <div className="flex h-[28px] items-center justify-around border-b-2 border-black">
                        <div className="mx-[2px] flex w-full">
                            <div className="flex w-full flex-col gap-[1px]">
                                {[...Array(6)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-[2px] w-full bg-neutral-800"
                                    />
                                ))}
                            </div>
                            <div className="absolute left-[10px] h-[17px] w-[19px] bg-white">
                                <div
                                    ref={closeRef}
                                    id="close"
                                    onMouseDown={handleClose}
                                    className="absolute left-[1px] h-[17px] w-[17px] border-[2px] border-black bg-white"
                                ></div>
                            </div>
                        </div>
                        <h1 className="mx-[10px] font-chicago text-[25px]">
                            {title}
                        </h1>
                        <div className="mx-[2px] flex w-full">
                            <div className="flex w-full flex-col gap-[1px]">
                                {[...Array(6)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-[2px] w-full bg-neutral-800"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {isFinderWindow && (
                        // HACK HACK HACK
                        <div className="flex h-[28px] items-center justify-between border-b-4 border-double border-black">
                            <p className="mx-[10px] font-geneva text-[25px] font-bold">
                                {title !== 'Trash'
                                    ? `${React.Children.count(children) - 2} items`
                                    : '0 items'}
                            </p>
                            <p
                                className={`${title !== 'Trash' ? 'ml-[48px]' : '-ml-[50px]'} font-geneva text-[25px] font-bold`}
                            >
                                {title !== 'Trash'
                                    ? '360K in Disk'
                                    : '0K in Trash'}
                            </p>
                            <p className="mx-[10px] font-geneva text-[25px] font-bold">
                                {title !== 'Trash' ? '40K available' : ''}
                            </p>
                        </div>
                    )}
                    <table className="h-full w-full">
                        <tbody>
                            <tr>
                                <td
                                    className={
                                        'border-b-2 border-r-2 border-black'
                                    }
                                    rowSpan={3}
                                    colSpan={3}
                                >
                                    <div className="h-full w-full">
                                        {children}
                                    </div>
                                </td>
                                <td className="relative h-[22px] w-[22px] border-b-2 border-black p-0">
                                    <Image
                                        className="absolute left-0 top-0 h-auto w-[20px]"
                                        src={arrowUp}
                                        alt="An arrow pointing up"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="border-b-2 border-black"></td>
                            </tr>
                            <tr>
                                <td className="relative h-[22px] w-[22px] border-b-2 border-t-2 border-black p-0">
                                    <Image
                                        className="absolute bottom-0 left-0 h-auto w-[20px]"
                                        src={arrowDown}
                                        alt="An arrow pointing down"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="relative h-[22px] w-[22px] border-r-2 border-black p-0">
                                    <Image
                                        className="absolute left-0 top-0 h-[20px] w-auto"
                                        src={arrowLeft}
                                        alt="An arrow pointing left"
                                    />
                                </td>
                                <td className="h-[22px] border-r-2 border-black"></td>
                                <td className="relative h-[22px] w-[22px] border-r-2 border-black p-0">
                                    <Image
                                        className="absolute right-0 top-0 h-[20px] w-auto"
                                        src={arrowRight}
                                        alt="An arrow pointing right"
                                    />
                                </td>
                                <td className="h-[22px] w-[22px]">
                                    <div className="relative h-full w-full">
                                        <div className="absolute bottom-[1px] right-[1px] h-[14px] w-[14px] border-2 border-black bg-white"></div>
                                        <div className="absolute left-[2px] top-[2px] h-[10px] w-[10px] border-2 border-black bg-white"></div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}
