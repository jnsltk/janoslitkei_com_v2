'use client'

import floppyWhite from '../../../../public/pc/screen/ui/floppy_white.png'
import floppyBlack from '../../../../public/pc/screen/ui/floppy_black.png'
import floppyWindowOpen from '../../../../public/pc/screen/ui/floppy_window_open.png'
import trashWhite from '../../../../public/pc/screen/ui/trash_white.png'
import trashBlack from '../../../../public/pc/screen/ui/trash_black.png'
import fileWhite from '../../../../public/pc/screen/ui/file_white.png'
import fileBlack from '../../../../public/pc/screen/ui/file_black.png'
import FinderIcon from './FinderIcon'
import MenuBar from './MenuBar'
import Window from './Window'
import { useState } from 'react'

const WINDOWS = {
    portfolio: { title: 'Portfolio', x: 25, y: 50, width: 500, height: 350 },
}

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
                    windowOpenIcon={floppyWindowOpen}
                    title="Portfolio"
                    isWindowOpen={openWindows.includes('Portfolio')}
                    windowSpawnPosition={{
                        x: WINDOWS.portfolio.width / 2 + WINDOWS.portfolio.x,
                        y: WINDOWS.portfolio.height / 2 + WINDOWS.portfolio.y,
                    }}
                    onOpen={() => {
                        handleOpenWindow('Portfolio')
                    }}
                />
                <FinderIcon
                    icon={trashWhite}
                    selectedIcon={trashBlack}
                    windowOpenIcon={floppyWindowOpen}
                    isWindowOpen={openWindows.includes('Trash')}
                    title="Trash"
                />
            </div>
            {openWindows.includes('Portfolio') && (
                <Window
                    title="Portfolio"
                    windowX={WINDOWS.portfolio.x}
                    windowY={WINDOWS.portfolio.y}
                    windowWidth={WINDOWS.portfolio.width}
                    windowHeight={WINDOWS.portfolio.height}
                    isFinderWindow={true}
                    onClose={() => {
                        setOpenWindows(
                            openWindows.filter(
                                window => window !== 'Portfolio',
                            ),
                        )
                    }}
                >
                    <FinderIcon
                        icon={fileWhite}
                        selectedIcon={fileBlack}
                        windowOpenIcon={floppyWindowOpen}
                        isWindowOpen={openWindows.includes('Test')}
                        title="Test"
                    />
                </Window>
            )}
        </div>
    )
}
