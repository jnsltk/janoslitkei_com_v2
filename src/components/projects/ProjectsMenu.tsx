interface ProjectsMenuProps {
    activeProject: number,
    handleActiveProjectChange: (project: number) => void
}

const projectsMenuItems = ['University Projects', 'Personal projects', 'Others']

export default function ProjectsMenu({ activeProject, handleActiveProjectChange }: ProjectsMenuProps) {
    return (
        <div className="w-fit bg-slate-50 border border-slate-700/75 rounded-sm mx-auto mb-12">
            <ul id="projects-menu" className="flex p-[1px]">
                {projectsMenuItems.map((item, index) => {
                    return (
                        <li key={index}
                            className={`cursor-pointer px-4 py-2 whitespace-nowrap rounded-sm transition duration-150 ${
                                activeProject === index
                                    ? 'bg-slate-900 hover:bg-slate-800 text-slate-50/90'
                                    : 'bg-slate-50 hover:bg-slate-100/90 text-slate-800'
                            }`}
                            onClick={() => handleActiveProjectChange(index)}>
                            {item}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}