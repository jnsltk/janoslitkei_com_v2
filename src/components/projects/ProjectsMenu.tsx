'use client'

import { useState } from 'react'
import { GoTriangleLeft } from 'react-icons/go'

interface ProjectsMenuProps {
    activeProject: number
    handleActiveProjectChange: (project: number) => void
}

const projectsMenuItems = ['University Projects', 'Personal projects', 'Tools']

export default function ProjectsMenu({
    activeProject,
    handleActiveProjectChange,
}: ProjectsMenuProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div>
            <div className="mx-auto mb-8 hidden rounded-sm border border-slate-700/75 bg-slate-50 shadow-xl lg:block lg:w-[27rem]">
                <ul id="projects-menu" className="flex justify-between p-[1px]">
                    {projectsMenuItems.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={`cursor-pointer whitespace-nowrap rounded-sm px-4 py-2 transition duration-150 ${
                                    activeProject === index
                                        ? 'bg-slate-900 text-slate-50/90 hover:bg-slate-800'
                                        : 'bg-slate-50 text-slate-800 hover:bg-slate-100/90'
                                }`}
                                onClick={() => handleActiveProjectChange(index)}
                            >
                                {item}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="mb-6 w-full rounded-sm border border-slate-700/75 bg-slate-50 shadow-xl lg:hidden">
                <div
                    className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <span>{projectsMenuItems[activeProject]}</span>
                    <GoTriangleLeft
                        className={`transform ${isOpen ? '-rotate-90' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
                    />
                </div>

                <ul
                    className={`overflow-hidden border-t border-slate-700/75 p-[1px] transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    {projectsMenuItems.map((item, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer px-5 py-4 ${
                                activeProject === index
                                    ? 'bg-slate-900 text-slate-50/90'
                                    : 'bg-slate-50 text-slate-800'
                            }`}
                            onClick={() => {
                                handleActiveProjectChange(index)
                                setTimeout(() => {
                                    setIsOpen(false)
                                }, 50)
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
