'use client'

import floppyWhite from '../../../../public/pc/screen/ui/floppy_white.png'
import floppyBlack from '../../../../public/pc/screen/ui/floppy_black.png'
import trashWhite from '../../../../public/pc/screen/ui/trash_white.png'
import trashBlack from '../../../../public/pc/screen/ui/trash_black.png'
import FinderIcon from './FinderIcon'
import MenuBar from './MenuBar'
import Window from './Window'

export default function Desktop() {
    return (
        <div className="h-screen w-screen bg-monitor-bg">
            <MenuBar />
            <div className="absolute right-[5%] top-[10%] flex h-[90%] flex-col justify-between pb-[5%]">
                <FinderIcon
                    icon={floppyWhite}
                    selectedIcon={floppyBlack}
                    title="Portfolio"
                    onOpen={() => {
                        console.log('Portfolio opened')
                    }}
                />
                <FinderIcon
                    icon={trashWhite}
                    selectedIcon={trashBlack}
                    title="Trash"
                />
            </div>
            <Window title="Portfolio" isFinderWindow={true}>
                <FinderIcon
                    icon={floppyWhite}
                    selectedIcon={floppyBlack}
                    title="Test"
                />
            </Window>
        </div>
    )
}
