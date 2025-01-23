'use client'

import Image, { StaticImageData } from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ANIMATION_DURATION = 0.25

export interface FinderIconProps {
    icon: StaticImageData
    selectedIcon: StaticImageData
    windowOpenIcon: StaticImageData
    title: string
    isWindowOpen: boolean
    windowSpawnPosition?: { x: number; y: number }
    onOpen?: () => void
}

export default function FinderIcon({
    icon,
    selectedIcon,
    windowOpenIcon,
    title,
    isWindowOpen,
    windowSpawnPosition,
    onOpen,
}: FinderIconProps) {
    const iconBorderRef = useRef<HTMLDivElement>(null)
    const [isSelected, setIsSelected] = useState(false)
    const [iconID, setIconID] = useState('')
    const [doubleClickTimerActive, setDoubleClickTimerActive] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(false)
    // const [isClosing, setIsClosing] = useState(false)

    const iconBorderXY: { x: number, y: number} = { 
        x: iconBorderRef.current ? iconBorderRef.current.getBoundingClientRect().left : 0, 
        y: iconBorderRef.current ? iconBorderRef.current.getBoundingClientRect().top : 0 
    }

    const translatePosition = {
        x: windowSpawnPosition?.x ? windowSpawnPosition.x - iconBorderXY.x : 0,
        y: windowSpawnPosition?.y ? windowSpawnPosition.y - iconBorderXY.y : 0,
    }

    const getIconID = useCallback(() => {
        const iconId = title.replace(/\s/g, '')
        return `finder-icon-${iconId}`
    }, [title])

    useEffect(() => {
        setIconID(getIconID())
    }, [title, getIconID])

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                iconID &&
                !document
                    .getElementById(iconID)
                    ?.contains(event.target as Node) &&
                // Don't remove selected state if the close button is clicked
                !document
                    .getElementById('close')
                    ?.contains(event.target as Node)
            ) {
                setIsSelected(false)
            }
        },
        [iconID, setIsSelected],
    )

    const handleClick = useCallback(() => {
        if (doubleClickTimerActive) {
            setIsTransitioning(true)
            setTimeout(() => {
                setIsTransitioning(false)
                if (onOpen) onOpen()
            }, ANIMATION_DURATION * 1000)
            setDoubleClickTimerActive(false)
            return
        }
        setIsSelected(true)
        setDoubleClickTimerActive(true)
        setTimeout(() => {
            setDoubleClickTimerActive(false)
        }, 300)
    }, [setIsSelected, onOpen, doubleClickTimerActive])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleClickOutside])

    return (
        <>
            {isTransitioning ? (
                <div
                    id={iconID}
                    onMouseDown={handleClick}
                    className="relative flex max-h-[65px] flex-col items-center"
                >
                    <motion.div
                        initial={{
                            translateX: 0,
                            translateY: 0,
                        }}
                        animate={{
                            translateX: translatePosition.x,
                            translateY: translatePosition.y,
                        }}
                        className="absolute right-0 top-0 h-[45px] w-[45px] border-4 border-neutral-600"
                        ref={iconBorderRef}
                        transition={{ duration: ANIMATION_DURATION, ease: 'linear' }}
                    />
                    <Image
                        src={windowOpenIcon}
                        alt="An icon of a floppy disk"
                        className="h-[45px] w-[45px] lg:h-[75px] lg:w-[75px]"
                    ></Image>
                    <div
                        className={`flex max-h-[14px] items-center bg-black px-[4px] lg:max-h-[30px] lg:px-[6px]`}
                    >
                        <span
                            className={`font-geneva text-[20px] text-white lg:text-[50px]`}
                        >
                            {title}
                        </span>
                    </div>
                </div>
            ) : (
                <div
                    id={iconID}
                    onMouseDown={handleClick}
                    className="flex max-h-[65px] flex-col items-center"
                >
                    <Image
                        src={
                            isWindowOpen
                                ? windowOpenIcon
                                : isSelected
                                  ? selectedIcon
                                  : icon
                        }
                        alt="An icon of a floppy disk"
                        className="h-[45px] w-[45px] lg:h-[75px] lg:w-[75px]"
                    ></Image>
                    <div
                        className={`flex max-h-[14px] items-center ${isSelected ? 'bg-black' : 'bg-white'} px-[4px] lg:max-h-[30px] lg:px-[6px]`}
                    >
                        <span
                            className={`font-geneva text-[20px] lg:text-[50px] ${isSelected ? 'text-white' : 'text-black'}`}
                        >
                            {title}
                        </span>
                    </div>
                </div>
            )}
        </>
    )
}
