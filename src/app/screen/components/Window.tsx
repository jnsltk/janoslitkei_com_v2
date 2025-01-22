import React from 'react'
import arrowLeft from '../../../../public/pc/screen/ui/arrow_left.png'
import arrowRight from '../../../../public/pc/screen/ui/arrow_right.png'
import arrowUp from '../../../../public/pc/screen/ui/arrow_up.png'
import arrowDown from '../../../../public/pc/screen/ui/arrow_down.png'
import Image from 'next/image'

export interface WindowProps {
    title: string
    children: React.ReactNode
    isFinderWindow?: boolean
}
export default function Window({
    title,
    children,
    isFinderWindow,
}: WindowProps) {
    return (
        <div className="absolute left-[3%] top-[11%] flex h-[375px] w-[500px] flex-col rounded-sm border-2 border-b-4 border-r-4 border-black bg-white">
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
                        <div className="absolute left-[1px] h-[17px] w-[17px] border-[2px] border-black bg-white"></div>
                    </div>
                </div>
                <h1 className="mx-[10px] font-chicago text-[25px]">{title}</h1>
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
                <div className="flex h-[28px] items-center justify-between border-b-4 border-double border-black">
                    <p className="mx-[10px] font-geneva text-[25px] font-bold">
                        {React.Children.count(children)} items
                    </p>
                    <p className="ml-[48px] font-geneva text-[25px] font-bold">
                        360K in Disk
                    </p>
                    <p className="mx-[10px] font-geneva text-[25px] font-bold">
                        40K available
                    </p>
                </div>
            )}
            {/* <div className="flex h-full w-full">
                <div className="flex w-full p-[35px]">{children}</div>
            </div> */}
            <table className="h-full w-full">
                <tbody>
                    <tr>
                        <td
                            className={'border-b-2 border-r-2 border-black'}
                            rowSpan={3}
                            colSpan={3}
                        >
                            <div className="flex h-full w-full p-[30px]">
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
    )
}
