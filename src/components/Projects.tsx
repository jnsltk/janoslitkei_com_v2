export default function Projects() {
    return (
        <section id="projects"
                 className="bg-gradient-to-bl from-foggy-gray-50 to-foggy-gray-100 h-screen snap-start -mb-16 snap-always scroll-mt-16">
            <div className="flex flex-col items-center justify-center pt-14 mb-6">
                <h1 id="projects-title" className="text-4xl font-mono font-bold">Projects</h1>
            </div>
            <div id="projects-menu-container"
                 className="w-fit bg-slate-50 border border-slate-700 mx-auto mb-12">
                <ul id="projects-menu" className="flex p-[1px]">
                    <li id="university"
                        hx-get="/projects?type=university"
                        hx-target="#project-list"
                        hx-swap="outerHTML transition:true"
                        className="cursor-pointer px-4 py-2 whitespace-nowrap selected-project-cat">University Projects
                    </li>
                    <li id="personal"
                        hx-get="/projects?type=personal"
                        hx-target="#project-list"
                        hx-swap="outerHTML transition:true"
                        className="cursor-pointer px-4 py-2 whitespace-nowrap unselected-project-cat">
                        Personal projects
                    </li>
                    <li id="Tools"
                        hx-get="/projects?type=other"
                        hx-target="#project-list"
                        hx-swap="outerHTML transition:true"
                        className="cursor-pointer px-4 py-2 whitespace-nowrap unselected-project-cat">Others
                    </li>
                </ul>
            </div>
            <div className="max-w-full flex mx-44 gap-10 justify-between">
                <div className="w-full">
                    <div className="h-[30vw]">
                    </div>
                </div>
            </div>
        </section>
    )
}