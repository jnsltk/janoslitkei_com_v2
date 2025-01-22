'use client'

import Link from 'next/link'
import logo from '../../public/images/logo.svg'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useState, useCallback } from 'react'
import { HiMenuAlt3 } from "react-icons/hi"

gsap.registerPlugin(ScrollToPlugin)

interface MenuItem {
    name: string
    href: string
}

const menuItems: MenuItem[] = [
    {
        name: 'Home',
        href: '#home',
    },
    {
        name: 'About',
        href: '#about',
    },
    {
        name: 'Projects',
        href: '#projects',
    },
    {
        name: 'Blog',
        href: '/blog',
    },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            if (href === '/blog') {
                return
            }
            e.preventDefault()
            setMenuOpen(false)
            const target = document.querySelector(href)
            if (target) {
                gsap.to('#content', {
                    duration: 0.8,
                    scrollTo: { y: target, offsetY: 64 },
                    ease: 'power2.inOut',
                })
            }
        },
        []
    )
    return (
        <div className="flex items-center justify-between w-screen bg-slate-900 fixed z-50 h-16 top-0 px-6">
            <Link href="/" className="flex items-center gap-4">
                <Image src={logo} alt="logo" className="w-5 h-5" />
                <span className="text-xl text-slate-50/75 font-mono">
                    Janos_Litkei
                </span>
            </Link>
            <div
                id="menu"
                className={`bg-slate-900 fixed top-16 left-0 right-0 pb-12 pt-8 lg:py-0 lg:block lg:static ${menuOpen ? 'block' : 'hidden'}`}
            >
                <ul className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-2 px-1 text-slate-50/75">
                    {menuItems.map(item => {
                        return (
                            <li key={item.name} className="w-full lg:w-fit">
                                <Link
                                    href={item.href}
                                    onClick={e => handleClick(e, item.href)}
                                    className={`block w-full lg:w-fit hover:bg-slate-700/50 px-4 py-2 rounded-sm transition duration-150 
                                        ${item.href === '/blog' ? 'pointer-events-none' : 'cursor-pointer'}`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button
                id="menu-toggle"
                className="text-white focus:outline-none lg:hidden"
                onClick={() => setMenuOpen(prevState => !prevState)}
            >
                <HiMenuAlt3 className="w-6 h-6" />
            </button>
        </div>
    )
}
