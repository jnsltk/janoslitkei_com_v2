export default function MenuBar() {
    return (
        <div className="h-8 w-full border-b-2 border-black bg-white pt-[2px] lg:h-12">
            <ul className="mx-[4%] flex h-full items-center gap-5 font-chicago text-[25px] lg:gap-8 lg:text-[30px]">
                <li></li>
                <li>File</li>
                <li>Edit</li>
                <li>View</li>
                <li>Special</li>
            </ul>
        </div>
    )
}
