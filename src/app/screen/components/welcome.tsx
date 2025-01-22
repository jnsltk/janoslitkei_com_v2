'use client'

import { useState } from 'react'
import Image from 'next/image'
import macIcon from '../../../../public/pc/screen/ui/macintosh_icon.png'
import welcomeIcon from '../../../../public/pc/screen/ui/welcome_icon.png'

export default function Welcome() {
    const [showMsg, setShowMsg] = useState(false)

    setTimeout(() => {
        setShowMsg(true)
    }, 4000)

    return (
        <div className='flex h-screen w-screen items-center justify-center bg-monitor-bg'>
            {!showMsg ? (
                <Image
                    src={macIcon}
                    alt="An icon of a Macintosh computer"
                ></Image>
            ) : (
                <div className="flex h-[35%] w-[80%] border-2 border-black bg-white p-[5%] relative">
                    <Image
                        src={welcomeIcon}
                        className="h-[50px] w-[50px] lg:w-[100px] lg:h-[100px]"
                        alt="An icon of a Macintosh computer with a keyboard and a mouse"
                    ></Image>
                    <div className="w-full flex justify-around">
                    <h1 className="font-chicago text-[32px]">
                        Welcome to Macintosh.
                    </h1>
                    </div>
                    <div className="absolute h-full w-full top-[5px] left-[5px] bg-black -z-10"></div>
                </div>
            )}
        </div>
    )
}
