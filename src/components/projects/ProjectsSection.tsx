'use client'

import ProjectList from '@/components/projects/ProjectList'
import ProjectsMenu from '@/components/projects/ProjectsMenu'
import { useState } from 'react'
import FadeInSection from '../FadeInSection'

export default function ProjectsSection() {
    const [activeProject, setActiveProject] = useState<number>(0)
    const [resetState, setResetState] = useState<boolean>(false)

    function handleActiveProjectChange(index: number) {
        setActiveProject(index)
        setResetState(prevState => !prevState)
    }

    return (
        <section
            id="projects"
            className="h-screen snap-start snap-always bg-gradient-to-bl from-foggy-gray-50 to-foggy-gray-100 text-slate-900/85 lg:scroll-mt-16"
        >
            <FadeInSection>
                <div className="flex flex-col items-center justify-center pt-24 lg:mb-6 lg:pt-14">
                    <h1
                        id="projects-title"
                        className="font-mono text-3xl font-bold"
                    >
                        Projects
                    </h1>
                </div>
                <div className="mx-6 mt-10 gap-10 lg:mx-32 lg:mt-12 lg:flex">
                    <div className="lg:w-1/2">
                        <div>
                            <ProjectsMenu
                                activeProject={activeProject}
                                handleActiveProjectChange={
                                    handleActiveProjectChange
                                }
                            ></ProjectsMenu>
                            <ProjectList
                                projectsCategory={activeProject}
                                resetState={resetState}
                            ></ProjectList>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="h-full"></div>
                    </div>
                </div>
            </FadeInSection>
        </section>
    )
}
