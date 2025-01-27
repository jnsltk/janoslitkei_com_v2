'use client'

import ProjectList from '@/components/projects/ProjectList'
import ProjectsMenu from '@/components/projects/ProjectsMenu'
import { useState, useCallback } from 'react'
import FadeInSection from '../FadeInSection'

export default function ProjectsSection() {
    const [activeProjectCategory, setActiveProjectCategory] =
        useState<number>(0)
    const [resetState, setResetState] = useState<boolean>(false)

    const handleActiveProjectChange = useCallback((index: number) => {
        setActiveProjectCategory(index)
        setResetState(prevState => !prevState)
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
