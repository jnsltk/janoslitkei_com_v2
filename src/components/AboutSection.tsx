export default function AboutSection() {
    return (
        <section id="about"
                 className="h-[80vh] snap-start snap-always scroll-mt-16 bg-gradient-to-bl from-wild-blue-yonder-100 to-wild-blue-yonder-300">
            <div className="h-full flex flex-col justify-center">
                <div className="text-slate-900/85 mx-6 md:mx-36">
                    <h1 className="text-3xl font-semibold font-mono max-w-64 md:max-w-full">A few things about me</h1>
                    <ul className="py-6 ">
                        <li className="mb-2">👨🏻‍💻 I&apos;m a Software Engineering student from Hungary</li>
                        <li className="mb-2">🇸🇪 I currently live in Gothenburg, Sweden</li>
                        <li className="mb-2">🔧 I&apos;ve worked on lots of <a className="link">projects</a> as part of my
                            course
                        </li>
                        <li className="mb-2">🌟 My favourite programming language is <span
                            className="line-through">Python</span>
                            PHP
                            ;)
                        </li>
                        <li className="mb-2">🚀 I&apos;m always working on a few side projects to increase my skills</li>
                        <li className="mb-2">🧗🏻‍♂️ In my free time, I enjoy climbing, hiking, and being in nature</li>
                        <li>📄 <a
                            className="cursor-pointer font-semibold text-cinnabar-600 underline underline-offset-1 hover:text-cinnabar-800">Take
                            a look at my CV</a></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}