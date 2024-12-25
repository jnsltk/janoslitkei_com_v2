import Link from 'next/link';
import logo from '../../public/images/logo.svg'
import Image from "next/image";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between w-screen bg-slate-900 fixed z-50 h-16 top-0 px-6">
            <Link href="/" className="flex items-center gap-4">
                <Image src={logo} alt="logo" className="w-5 h-5"/>
                <span className="text-xl text-slate-50/75 font-mono">Janos_Litkei</span>
            </Link>
            <div id="menu"
                 className="bg-slate-900 hidden fixed top-16 left-0 right-0 pb-12 pt-8 md:py-0 md:block md:static">
                <ul className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-2 px-1 text-slate-50/75">
                    <li className="w-full md:w-fit"><Link
                        href="#home"
                        className="block w-full md:w-fit hover:bg-slate-700/50 px-4 py-2 transition duration-150 cursor-pointer">Home</Link>
                    </li>
                    <li className="w-full md:w-fit"><Link
                        href="#about"
                        className="block w-full md:w-fit hover:bg-slate-700/50 px-4 py-2 transition duration-150 cursor-pointer">About</Link>
                    </li>
                    <li className="w-full md:w-fit"><Link
                        href="#projects"
                        className="block w-full md:w-fit hover:bg-slate-700/50 px-4 py-2 transition duration-150 cursor-pointer">Projects</Link>
                    </li>
                    <li className="w-full md:w-fit"><Link
                        href="/blog"
                        className="block w-full md:w-fit hover:bg-slate-700/50 px-4 py-2 transition duration-150 cursor-pointer">Blog</Link>
                    </li>
                </ul>
            </div>
            <button id="menu-toggle" className="text-white focus:outline-none md:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
        </div>
    )
}