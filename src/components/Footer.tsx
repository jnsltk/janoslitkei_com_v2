import Link from 'next/link'

export default function Footer() {
    return (
        <footer
            id="footer"
            className="footer text-base-content flex snap-end snap-always flex-col gap-10 bg-slate-900 px-6 pb-40 pt-16 text-slate-50/75 lg:flex-row lg:gap-32 lg:p-24 lg:py-16"
        >
            <div className="max-w-lg">
                <h2 className="mb-4 text-lg font-bold">
                    János Litkei 2024 | MIT License
                </h2>
                <p className="text-sm">
                    Designed loosely in Figma, created with Nextjs and React
                    using Tailwind CSS for the styling, Three.js for the 3D
                    graphics, GSAP for the animations. Deployed on Vercel.
                </p>
            </div>
            <div className={`max-w-lg`}>
                <h2 className={`mb-4 text-lg font-bold`}>
                    Credits and Inspirations
                </h2>
                <p className={`mb-2 text-sm`}>
                    3D model of the Macintosh 128k by Daz on{' '}
                    <Link
                        href={`https://sketchfab.com/3d-models/macintosh-128k-computer-1984-70e8f2c87fec4cde8ba6d6cea00edd35`}
                        className={`cursor-pointer font-semibold text-cinnabar-500 underline underline-offset-1 hover:text-cinnabar-700`}
                        target="_blank"
                    >
                        Sketchfab
                    </Link>
                    . The idea for the website and a bit of the code was inspired by{' '}
                    <Link
                        href={`https://henryheffernan.com/`}
                        className={`cursor-pointer font-semibold text-cinnabar-500 underline underline-offset-1 hover:text-cinnabar-700`}
                        target="_blank"
                    >henryheffernan.com</Link>
                    , and the video texture used for the Macintosh screen was also created by him.
                </p>
            </div>
        </footer>
    )
}
