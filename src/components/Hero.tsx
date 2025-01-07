import ThreeAppWrapper from '@/components/ThreeAppWrapper'

export default function Hero() {
    return (
        <section id="home"
                 className="snap-start snap-always mt-16 scroll-mt-16 bg-base-200 h-[80vh] bg-gradient-to-bl from-ultramarine-900 to-indigo-950">
            <div className="h-full flex flex-col justify-center">
                <ThreeAppWrapper/>
                <div className="text-slate-50/75 mx-6 -mt-12 md:mt-0 md:mx-36">
                    <h1 className="text-3xl md:text-5xl font-semibold font-mono">Hej! <br />Glad you&apos;re here :)</h1>
                    <p className="py-6 font-light md:max-w-[40vw]">
                        My name is János, and I&apos;m a third-year Software Engineering student in Sweden.
                        Welcome to my personal website!
                    </p>
                </div>
            </div>
        </section>
    )
}