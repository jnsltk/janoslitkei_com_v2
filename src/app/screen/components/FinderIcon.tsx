import Image, { StaticImageData } from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export interface FinderIconProps {
    icon: StaticImageData
    selectedIcon: StaticImageData
    title: string
    onOpen?: () => void
}

export default function FinderIcon({
    icon,
    selectedIcon,
    title,
    onOpen,
}: FinderIconProps) {
    const [isSelected, setIsSelected] = useState(false)
    const [iconID, setIconID] = useState('')
    const [doubleClickTimerActive, setDoubleClickTimerActive] = useState(false)

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
                !document.getElementById(iconID)?.contains(event.target as Node)
            ) {
                setIsSelected(false)
            }
        },
        [iconID, setIsSelected],
    )

    const handleClick = useCallback(() => {
        if (doubleClickTimerActive) {
            if (onOpen) onOpen()
            setIsSelected(false)
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
        <div
            id={iconID}
            onMouseDown={handleClick}
            className="flex flex-col items-center"
        >
            <Image
                src={isSelected ? selectedIcon : icon}
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
    )
}
