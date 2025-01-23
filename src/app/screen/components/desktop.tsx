'use client'

import floppyWhite from '../../../../public/pc/screen/ui/floppy_white.png'
import floppyBlack from '../../../../public/pc/screen/ui/floppy_black.png'
import trashWhite from '../../../../public/pc/screen/ui/trash_white.png'
import trashBlack from '../../../../public/pc/screen/ui/trash_black.png'
import fileWhite from '../../../../public/pc/screen/ui/file_white.png'
import fileBlack from '../../../../public/pc/screen/ui/file_black.png'
import FinderIcon from './FinderIcon'
import MenuBar from './MenuBar'
import Window from './Window'
import { useState } from 'react'

export default function Desktop() {
    const [openWindows, setOpenWindows] = useState<string[]>([])

    const handleOpenWindow = (title: string) => {
        setOpenWindows(prev => [...prev, title])
    }
    return (
        <div className="h-screen w-screen bg-monitor-bg">
            <MenuBar />
            <div className="absolute right-[5%] top-[10%] flex h-[90%] flex-col justify-between pb-[5%]">
                <FinderIcon
                    icon={floppyWhite}
                    selectedIcon={floppyBlack}
                    title="Portfolio"
                    onOpen={() => {
                        handleOpenWindow('Portfolio')
                    }}
                />
                <FinderIcon
                    icon={trashWhite}
                    selectedIcon={trashBlack}
                    title="Trash"
                />
            </div>
            {openWindows.includes('Portfolio') && (
                <Window
                    title="Portfolio"
                    windowX={25}
                    windowY={50}
                    windowWidth={500}
                    windowHeight={350}
                    isFinderWindow={true}
                >
                    <FinderIcon
                        icon={fileWhite}
                        selectedIcon={fileBlack}
                        title="Test"
                    />
                </Window>
            )}
        </div>
    )
}
