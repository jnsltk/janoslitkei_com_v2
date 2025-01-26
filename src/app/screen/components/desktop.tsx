'use client'

import floppyWhite from '../../../../public/pc/screen/ui/floppy_white.png'
import floppyBlack from '../../../../public/pc/screen/ui/floppy_black.png'
import floppyWindowOpen from '../../../../public/pc/screen/ui/floppy_window_open.png'
import trashWhite from '../../../../public/pc/screen/ui/trash_white.png'
import trashBlack from '../../../../public/pc/screen/ui/trash_black.png'
import trashWindowOpen from '../../../../public/pc/screen/ui/trash_window_open.png'
import fileWhite from '../../../../public/pc/screen/ui/file_white.png'
import fileBlack from '../../../../public/pc/screen/ui/file_black.png'
import fileWindowOpen from '../../../../public/pc/screen/ui/file_window_open.png'
import FinderIcon from './FinderIcon'
import MenuBar from './MenuBar'
import Window from './Window'
import { useState } from 'react'
import Image from 'next/image'

const DESKTOP_APPLICATIONS = {
    Portfolio: {
        title: 'Portfolio',
        x: 25,
        y: 50,
        z: 2,
        width: 500,
        height: 350,
        icon: floppyWhite,
        selectedIcon: floppyBlack,
        windowOpenIcon: floppyWindowOpen,
        isFinderWindow: true,
    },
    Me_jpg: {
        title: 'Me.jpg',
        x: 125,
        y: 50,
        z: 1,
        width: 350,
        height: 400,
        icon: fileWhite,
        selectedIcon: fileBlack,
        windowOpenIcon: fileWindowOpen,
        isFinderWindow: false,
    },
    Trash: {
        title: 'Trash',
        x: 50,
        y: 230,
        z: 3,
        width: 400,
        height: 200,
        icon: trashWhite,
        selectedIcon: trashBlack,
        windowOpenIcon: trashWindowOpen,
        isFinderWindow: true,
    },
}

const PORTFOLIO_APPLICATIONS = {
    fraud_detection: {
        title: 'fraud_detection',
        x: 50,
        y: 40,
        z: 4,
        width: 550,
        height: 400,
        icon: fileWhite,
        selectedIcon: fileBlack,
        windowOpenIcon: fileBlack,
        isFinderWindow: false,
        content: (
            <div className="flex h-full w-full items-center justify-center">
                <h1 className="font-chicago text-[50px] font-bold">
                    fraud_detection
                </h1>
            </div>
        ),
    },
}

export default function Desktop() {
    const [openWindows, setOpenWindows] = useState<string[]>([])
    const [closingWindows, setClosingWindows] = useState<string[]>([])

    const handleOpenWindow = (title: string) => {
        setOpenWindows(prev => [...prev, title])
    }

    const handleCloseWindow = (title: string) => {
        setClosingWindows(prev => [...prev, title])
    }

    return (
        <div className="h-screen w-screen bg-monitor-bg">
            <MenuBar />

            {/* Desktop Applications */}
            <div className="absolute right-[5%] top-[10%] flex h-[90%] flex-col justify-between pb-[5%]">
                {Object.keys(DESKTOP_APPLICATIONS).map(appKey => {
                    // @ts-expect-error: appKey is a valid key for DESKTOP_APPLICATIONS
                    const app = DESKTOP_APPLICATIONS[appKey]
                    return (
                        <FinderIcon
                            key={appKey}
                            icon={app.icon}
                            selectedIcon={app.selectedIcon}
                            windowOpenIcon={app.windowOpenIcon}
                            title={app.title}
                            isWindowOpen={openWindows.includes(app.title)}
                            isWindowClosing={closingWindows.includes(app.title)}
                            windowSpawnPosition={{
                                x: app.width / 2 + app.x,
                                y: app.height / 2 + app.y,
                            }}
                            onOpen={() => handleOpenWindow(app.title)}
                        />
                    )
                })}
            </div>

            {/* Windows corresponding to Desktop Applications */}
            {Object.keys(DESKTOP_APPLICATIONS).map(appKey => {
                // @ts-expect-error: appKey is a valid key for DESKTOP_APPLICATIONS
                const app = DESKTOP_APPLICATIONS[appKey]
                return (
                    openWindows.includes(app.title) && (
                        <Window
                            key={appKey}
                            title={app.title}
                            windowX={app.x}
                            windowY={app.y}
                            windowZ={app.z}
                            windowWidth={app.width}
                            windowHeight={app.height}
                            isFinderWindow={app.isFinderWindow}
                            onClose={() => {
                                setOpenWindows(
                                    openWindows.filter(
                                        window => window !== app.title,
                                    ),
                                )
                                handleCloseWindow(app.title)
                                setTimeout(() => {
                                    setClosingWindows(
                                        closingWindows.filter(
                                            window => window !== app.title,
                                        ),
                                    )
                                }, 150)
                            }}
                        >
                            {app.title === 'Portfolio' && (
                                <div className="flex h-full w-full flex-wrap gap-[30px] bg-white p-[20px]">
                                    {/* Icons for portfolio items */}
                                    {Object.keys(PORTFOLIO_APPLICATIONS).map(
                                        appKey => {
                                            const app =
                                                // @ts-expect-error: appKey is a valid key for PORTFOLIO_APPLICATIONS
                                                PORTFOLIO_APPLICATIONS[appKey]
                                            return (
                                                <FinderIcon
                                                    key={appKey}
                                                    icon={app.icon}
                                                    selectedIcon={
                                                        app.selectedIcon
                                                    }
                                                    windowOpenIcon={
                                                        app.windowOpenIcon
                                                    }
                                                    title={app.title}
                                                    isWindowOpen={openWindows.includes(
                                                        app.title,
                                                    )}
                                                    isWindowClosing={closingWindows.includes(
                                                        app.title,
                                                    )}
                                                    windowSpawnPosition={{
                                                        x:
                                                            app.width / 2 +
                                                            app.x,
                                                        y:
                                                            app.height / 2 +
                                                            app.y,
                                                    }}
                                                    onOpen={() =>
                                                        handleOpenWindow(
                                                            app.title,
                                                        )
                                                    }
                                                />
                                            )
                                        },
                                    )}
                                </div>
                            )}
                            {app.title === 'Trash' && <></>}
                            {app.title === 'Me.jpg' && (
                                <div className="h-full w-full relative">
                                    <Image
                                        src={'/pc/screen/me_4.png'}
                                        layout='fill'
                                        alt="Me, János Litkei"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                        </Window>
                    )
                )
            })}

            {/* Portfolio item windows */}
            {Object.keys(PORTFOLIO_APPLICATIONS).map(appKey => {
                const app =
                    // @ts-expect-error: appKey is a valid key for PORTFOLIO_APPLICATIONS
                    PORTFOLIO_APPLICATIONS[appKey]
                return (
                    openWindows.includes(app.title) && (
                        <Window
                            key={appKey}
                            title={app.title}
                            windowX={app.x}
                            windowY={app.y}
                            windowZ={app.z}
                            windowWidth={app.width}
                            windowHeight={app.height}
                            isFinderWindow={app.isFinderWindow}
                            onClose={() => {
                                setOpenWindows(
                                    openWindows.filter(
                                        window => window !== app.title,
                                    ),
                                )
                                handleCloseWindow(app.title)
                                setTimeout(() => {
                                    setClosingWindows(
                                        closingWindows.filter(
                                            window => window !== app.title,
                                        ),
                                    )
                                }, 150)
                            }}
                        >
                            {app.content}
                        </Window>
                    )
                )
            })}
        </div>
    )
}
