import Image from 'next/image'
import floppyWhite from '../../../../public/pc/screen/ui/floppy_white.png'
import trashWhite from '../../../../public/pc/screen/ui/trash_white.png'

export default function Desktop() {
    return (
        <div className="h-full w-full">
            <div className="h-8 pt-[2px] w-full border-b-2 border-black bg-white lg:h-12">
                <ul className="mx-[4%] flex h-full items-center gap-5 font-chicago text-[20px] lg:gap-8 lg:text-[30px]">
                    <li></li>
                    <li>File</li>
                    <li>Edit</li>
                    <li>View</li>
                    <li>Special</li>
                </ul>
            </div>
            <div className="absolute right-[5%] top-[10%] flex h-[90%] flex-col justify-between">
                <div className="flex flex-col items-center">
                    <Image
                        src={floppyWhite}
                        alt="A white floppy disk"
                        className="h-[45px] w-[45px] lg:h-[75px] lg:w-[75px]"
                    ></Image>
                    <div className="flex max-h-[14px] items-center bg-white px-[4px] lg:max-h-[30px] lg:px-[6px]">
                        <span className="font-geneva text-[20px] lg:text-[50px]">
                            Portfolio
                        </span>
                    </div>
                </div>
                <div className="mb-[30%] flex flex-col items-center">
                    <Image
                        src={trashWhite}
                        alt="A white trash can"
                        className="h-[45px] w-[45px] lg:h-[75px] lg:w-[75px]"
                    ></Image>
                    <div className="flex max-h-[14px] items-center bg-white px-[4px] lg:max-h-[30px] lg:px-[6px]">
                        <span className="font-geneva text-[20px] lg:text-[50px]">
                            Trash
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
