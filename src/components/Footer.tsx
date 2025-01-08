export default function Footer() {
    return (
        <footer
            id="footer"
            className="footer text-base-content flex snap-end snap-always gap-10 bg-slate-900 px-6 pt-16 pb-40 text-slate-50/75 lg:gap-32 lg:p-24 lg:py-16"
        >
            <div className="max-w-lg">
                <h2 className="mb-4 text-lg font-bold">
                    János Litkei 2024 | MIT License
                </h2>
                <p className="text-sm">
                    Designed loosely in Figma, created with Nextjs and React
                    using Tailwind CSS for the styling, Three.js for the 3D
                    graphics, GSAP for the animations. Deployed on a Rackforest
                    VPS using docker.
                </p>
            </div>
        </footer>
    )
}
