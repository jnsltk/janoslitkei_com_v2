import Link from 'next/link'
import { Project } from '../../../types/types'
import { FaPlus, FaMinus } from 'react-icons/fa6'

interface ProjectCardProps {
    project: Project,
    isOpen: boolean,
    onClick: () => void
}

export default function ProjectCard({ project, isOpen, onClick} : ProjectCardProps) {
    return (
        <div className="bg-slate-50 max-w-full border border-slate-700/75 rounded-sm shadow-xl">
            <div className="px-5 py-4 flex justify-between items-center cursor-pointer"
            onClick={onClick}>
                <h3 className="font-bold">{project.name}</h3>
                {isOpen ? <FaMinus/> : <FaPlus/>}
            </div>
            <div className={`flex-col px-5 overflow-hidden transition-all duration-500 ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
                <p className="pr-6 mb-4">{project.description}</p>
                <div className="mb-4">
                    {project.links.map(link => {
                        return (
                            <Link
                                key={link.name}
                                className="font-semibold text-cinnabar-600 underline underline-offset-1 hover:text-cinnabar-800 mr-3"
                                href={link.url}>{link.name}</Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}