'use client'

import Link from 'next/link'
import logo from '../../public/images/logo.svg'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import React, { useState, useCallback } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'

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
    // {
    //     name: 'Blog',
    //     href: '/blog',
    // },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        [],
    )
    return (
        <div className="fixed top-0 z-50 flex h-16 w-screen items-center justify-between bg-slate-900 px-6">
            <Link href="/" className="flex items-center gap-4">
                <Image src={logo} alt="logo" className="h-5 w-5" />
                <span className="font-mono text-xl text-slate-50/75">
                    Janos_Litkei
                </span>
            </Link>
            <div
                id="menu"
                className={`fixed left-0 right-0 top-16 bg-slate-900 pb-12 pt-8 lg:static lg:block lg:py-0 ${menuOpen ? 'block' : 'hidden'}`}
            >
                <ul className="flex flex-col justify-between gap-8 px-1 text-slate-50/75 lg:flex-row lg:items-center lg:gap-2">
                    {menuItems.map(item => {
                        return (
                            <li key={item.name} className="w-full lg:w-fit">
                                <Link
                                    href={item.href}
                                    onClick={e => handleClick(e, item.href)}
                                    className={`block w-full rounded-sm px-4 py-2 transition duration-150 hover:bg-slate-700/50 lg:w-fit 'cursor-pointer'`}
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
                <HiMenuAlt3 className="h-6 w-6" />
            </button>
        </div>
    )
}
