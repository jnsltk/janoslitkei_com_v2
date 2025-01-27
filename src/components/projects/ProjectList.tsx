'use client'

import projects from '../../../content/projects/projects.json'
import ProjectCard from '@/components/projects/ProjectCard'
import { Project } from '../../../types/types'
import { useEffect, useState, useMemo } from 'react'
import { useIframe } from '@/components/IframeContext'

interface ProjectListProps {
    projectsCategory: number
    resetState: boolean
}

export default function ProjectList(
    { projectsCategory, resetState }: ProjectListProps = {
        projectsCategory: 0,
        resetState: false,
    },
) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)
    const iframeContext = useIframe()
    const sendMessageToIframe = useMemo(
        () => (iframeContext ? iframeContext.sendMessageToIframe : () => {}),
        [iframeContext],
    )
    useEffect(() => {
        setOpenIndex(0)
        sendMessageToIframe({
            page: 'Projects',
            close: 'projects',
            projectTitle: projects[projectsCategory][0].screenData.title,
        })
    }, [resetState, projectsCategory, sendMessageToIframe])

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
