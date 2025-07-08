import FadeInSection from './FadeInSection'
import Link from 'next/link'

export default function AboutSection() {
    return (
        <section
            id="about"
            className="h-screen snap-start snap-always bg-gradient-to-bl from-wild-blue-yonder-100 to-wild-blue-yonder-300 lg:h-[80vh] lg:scroll-mt-16"
        >
            <div className="flex h-full w-full flex-row lg:w-7/12">
                <div className="mx-auto flex h-full flex-col lg:max-w-7xl lg:justify-center">
                    <div className="mx-6 mt-32 text-slate-900/85 lg:mx-0 lg:mt-0">
                        <FadeInSection>
                            <h1 className="max-w-64 font-mono text-3xl font-semibold lg:max-w-full">
                                A few things about me
                            </h1>
                            <ul className="py-6">
                                <li className="mb-2">
                                    👨🏻‍💻 I&apos;m a recent Software Engineering graduate
                                    from Hungary
                                </li>
                                <li className="mb-2">
                                    🇸🇪 I currently live in Gothenburg, Sweden
                                </li>
                                <li className="mb-2">
                                    🔧 I&apos;ve worked on lots of{' '}
                                    <a className="link">projects</a> as part of
                                    my programme
                                </li>
                                {/*<li className="mb-2">*/}
                                {/*    🌟 My favourite programming language is{' '}*/}
                                {/*    <span className="line-through">Python</span>*/}
                                {/*    &nbsp;PHP ;)*/}
                                {/*</li>*/}
                                <li className="mb-2">
                                    🚀 I&apos;m always working on a few side
                                    projects to improve my skills
                                </li>
                                <li className="mb-2">
                                    🧗🏻‍♂️ In my free time, I enjoy climbing,
                                    hiking, and being in nature
                                </li>
                                <li>
                                    📄{' '}
                                    <Link
                                        href={`https://flowcv.com/resume/44ewwthfbb6n`}
                                        className="cursor-pointer font-semibold text-cinnabar-600 underline underline-offset-1 hover:text-cinnabar-800"
                                        target="_blank"
                                    >
                                        Take a look at my CV
                                    </Link>
                                </li>
                            </ul>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </section>
    )
}
