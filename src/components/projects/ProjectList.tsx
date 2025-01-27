'use client'

import projects from '../../../content/projects/projects.json'
import ProjectCard from '@/components/projects/ProjectCard'
import { Project } from '../../../types/types'
import { useEffect, useMemo } from 'react'
import { useIframe } from '@/components/IframeContext'

interface ProjectListProps {
    projectsCategory: number
    resetState: boolean
    openIndex: number | null
    setOpenIndex: (index: number | null) => void
}

export default function ProjectList(
    { projectsCategory, resetState, openIndex, setOpenIndex }: ProjectListProps) {
    const iframeContext = useIframe()
    const sendMessageToIframe = useMemo(
        () => (iframeContext ? iframeContext.sendMessageToIframe : () => {}),
        [iframeContext],
    )
    useEffect(() => {
        sendMessageToIframe({
            page: 'Projects',
            close: 'projects',
        })
    }, [resetState, projectsCategory, sendMessageToIframe, setOpenIndex])

    return (
        <div id="project-list" className="flex flex-col gap-2">
            {projects[projectsCategory].map((project: Project, index) => {
                return (
                    <ProjectCard
                        key={index}
                        project={project}
                        isOpen={openIndex === index}
                        onClick={() => {
                            const prevProject =
                                projects[projectsCategory][openIndex || 0]
                            setOpenIndex(openIndex === index ? null : index)
                            sendMessageToIframe({
                                page: 'Projects',
                                close: prevProject.screenData.title,
                                projectTitle: project.screenData.title,
                            })
                        }}
                    ></ProjectCard>
                )
            })}
        </div>
    )
}
