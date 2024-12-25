'use client'

import ProjectList from '@/components/projects/ProjectList'
import ProjectsMenu from '@/components/projects/ProjectsMenu'
import { useState } from 'react'

export default function ProjectsSection() {
    const [activeProject, setActiveProject] = useState<number>(0)
    const [resetState, setResetState] = useState<boolean>(false)

    function handleActiveProjectChange(index: number) {
        setActiveProject(index)
        setResetState((prevState) => (!prevState))
    }

    return (
        <section id="projects"
                 className="bg-gradient-to-bl from-foggy-gray-50 to-foggy-gray-100 h-screen snap-start -mb-16 snap-always scroll-mt-16">
            <div className="flex flex-col items-center justify-center pt-14 mb-6">
                <h1 id="projects-title" className="text-4xl font-mono font-bold">Projects</h1>
            </div>
            <ProjectsMenu
                activeProject={activeProject}
                handleActiveProjectChange={handleActiveProjectChange}
            ></ProjectsMenu>
            <div className="max-w-full flex mx-44 gap-10 justify-between">
                <ProjectList
                    projectsCategory={activeProject}
                    resetState={resetState}
                ></ProjectList>
                <div className="w-full">
                    <div className="h-[30vw]">
                    </div>
                </div>
            </div>
        </section>
    )
}