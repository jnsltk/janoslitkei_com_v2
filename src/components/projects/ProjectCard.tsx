import Link from 'next/link'
import { Project } from '../../../types/types'
import { FaPlus, FaMinus } from 'react-icons/fa6'

interface ProjectCardProps {
    project: Project
    isOpen: boolean
    onClick: () => void
}

export default function ProjectCard({
    project,
    isOpen,
    onClick,
}: ProjectCardProps) {
    return (
        <div className="mx-auto w-full rounded-sm border border-slate-700/75 bg-slate-50 shadow-xl lg:w-[27rem]">
            <div
                className="flex cursor-pointer items-center justify-between px-5 py-4"
                onClick={onClick}
            >
                <h3 className="font-bold">{project.name}</h3>
                {isOpen ? <FaMinus /> : <FaPlus />}
            </div>
            <div
                className={`flex-col overflow-hidden px-5 transition-all duration-500 ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="mb-4 pr-6">{project.description}</p>
                <div className="mb-4">
                    {project.links.map(link => {
                        return (
                            <Link
                                key={link.name}
                                className="mr-3 font-semibold text-cinnabar-600 underline underline-offset-1 hover:text-cinnabar-800"
                                href={link.url}
                                target="_blank"
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
