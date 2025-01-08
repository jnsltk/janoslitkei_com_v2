import FadeInSection from './FadeInSection'

export default function AboutSection() {
    return (
        <section
            id="about"
            className="h-screen snap-start snap-always bg-gradient-to-bl from-wild-blue-yonder-100 to-wild-blue-yonder-300 md:h-[80vh] md:scroll-mt-16"
        >
            <div className="flex h-full flex-col md:justify-center">
                <div className="mx-6 mt-24 text-slate-900/85 md:mx-36">
                    <FadeInSection>
                        <h1 className="max-w-64 font-mono text-3xl font-semibold md:max-w-full">
                            A few things about me
                        </h1>
                        <ul className="py-6">
                            <li className="mb-2">
                                👨🏻‍💻 I&apos;m a Software Engineering student from
                                Hungary
                            </li>
                            <li className="mb-2">
                                🇸🇪 I currently live in Gothenburg, Sweden
                            </li>
                            <li className="mb-2">
                                🔧 I&apos;ve worked on lots of{' '}
                                <a className="link">projects</a> as part of my
                                course
                            </li>
                            <li className="mb-2">
                                🌟 My favourite programming language is{' '}
                                <span className="line-through">Python</span>
                                &nbsp;PHP ;)
                            </li>
                            <li className="mb-2">
                                🚀 I&apos;m always working on a few side
                                projects to increase my skills
                            </li>
                            <li className="mb-2">
                                🧗🏻‍♂️ In my free time, I enjoy climbing, hiking,
                                and being in nature
                            </li>
                            <li>
                                📄{' '}
                                <a className="cursor-pointer font-semibold text-cinnabar-600 underline underline-offset-1 hover:text-cinnabar-800">
                                    Take a look at my CV
                                </a>
                            </li>
                        </ul>
                    </FadeInSection>
                </div>
            </div>
        </section>
    )
}
