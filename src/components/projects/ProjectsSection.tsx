'use client'

import ProjectList from '@/components/projects/ProjectList'
import ProjectsMenu from '@/components/projects/ProjectsMenu'
import { useState, useCallback, useEffect, useMemo } from 'react'
import FadeInSection from '../FadeInSection'
import projects from '../../../content/projects/projects.json'
import { useIframe } from '@/components/IframeContext'

export default function ProjectsSection() {
    const [activeProjectCategory, setActiveProjectCategory] =
        useState<number>(0)
    const [resetState, setResetState] = useState<boolean>(false)
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const iframeContext = useIframe()
    const sendMessageToIframe = useMemo(
        () => (iframeContext ? iframeContext.sendMessageToIframe : () => {}),
        [iframeContext],
    )

    const handleActiveProjectChange = useCallback((index: number) => {
        setActiveProjectCategory(index)
        setOpenIndex(0)
        setResetState(prevState => !prevState)
        sendMessageToIframe({
            page: 'Projects',
            projectTitle: projects[index][0].screenData.title,
        })
    }, [sendMessageToIframe])

    useEffect(() => {
        const handleIframeMessage = (event: MessageEvent) => {
            if (event.data.iconOpened) {
                for (let i = 0; i < projects.length; i++) {
                    for (let j = 0; j < projects[i].length; j++) {
                        if (
                            projects[i][j].screenData.title ===
                            event.data.iconOpened
                        ) {
                            setActiveProjectCategory(i)
                            setOpenIndex(j)
                        }
                    }
                }
            }
        }

        window.addEventListener('message', handleIframeMessage)

        return () => {
            window.removeEventListener('message', handleIframeMessage)
        }
    }, [])

    return (
        <section
            id="projects"
            className="h-screen snap-start snap-always bg-gradient-to-bl from-foggy-gray-50 to-foggy-gray-100 text-slate-900/85 lg:scroll-mt-16"
        >
            <FadeInSection>
                <div className="h-4/5">
                    <div className="mx-6 gap-10 pt-10 lg:mx-24 lg:flex 2xl:mt-40">
                        <div className="lg:w-1/2">
                            <div className="flex flex-col items-center justify-center pt-24 lg:pb-10 lg:pt-16">
                                <h1
                                    id="projects-title"
                                    className="font-mono text-3xl font-bold"
                                >
                                    Projects
                                </h1>
                            </div>
                            <div>
                                <ProjectsMenu
                                    activeProject={activeProjectCategory}
                                    handleActiveProjectChange={
                                        handleActiveProjectChange
                                    }
                                ></ProjectsMenu>
                                <ProjectList
                                    projectsCategory={activeProjectCategory}
                                    resetState={resetState}
                                    openIndex={openIndex}
                                    setOpenIndex={setOpenIndex}
                                ></ProjectList>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="h-full"></div>
                        </div>
                    </div>
                </div>
            </FadeInSection>
        </section>
    )
}
