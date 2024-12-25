import Link from 'next/link'
import { Project } from '../../../types/types'

interface ProjectCardProps {
    project: Project,
    isOpen: boolean,
    onClick: () => void
}

export default function ProjectCard({ project, isOpen, onClick} : ProjectCardProps) {
    return (
        <div className="bg-slate-50 w-full border border-slate-700/75 rounded-sm shadow-xl">
            <div className="px-5 py-4 flex justify-between items-center cursor-pointer"
            onClick={onClick}>
                <h3 className="font-bold">{project.name}</h3>
                <svg className={`w-4 transition duration-500 ${
                    isOpen ? 'hidden' : ''
                }`}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
                <svg className={`w-4 transition duration-500 ${
                    isOpen ? '' : 'hidden'
                }`}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <path
                        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                </svg>
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