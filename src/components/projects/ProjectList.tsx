'use client'

import projects from '../../../content/projects/projects.json'
import ProjectCard from '@/components/projects/ProjectCard'
import { Project } from '../../../types/types'
import { useEffect, useState } from 'react'
import { useIframe } from '@/components/IframeContext'

interface ProjectListProps {
    projectsCategory: number,
    resetState: boolean
}

export default function ProjectList({ projectsCategory, resetState }: ProjectListProps = {
    projectsCategory: 0,
    resetState: false,
}) {
    const { sendMessageToIframe } = useIframe()
    useEffect(() => {
        setOpenIndex(0)
    }, [resetState])

    const [openIndex, setOpenIndex] = useState<number | null>(0)
    return (
        <div id="project-list" className="flex flex-col gap-2">
            {projects[projectsCategory].map((project: Project, index) => {
                return <ProjectCard
                    key={index}
                    project={project}
                    isOpen={openIndex === index}
                    onClick={() => {
                        setOpenIndex(openIndex === index ? null : index)
                        sendMessageToIframe({ page: 'desktop' })
                    }}
                ></ProjectCard>
            })}
        </div>
    )
}