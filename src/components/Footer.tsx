export default function Footer() {
    return (
        <footer
            id="footer"
            className="footer bg-slate-900 text-base-content px-6 py-16 gap-10 md:p-24 text-slate-50/75 flex md:gap-32 snap-end snap-always"
        >
            <div className="max-w-lg">
                <h2 className="text-lg font-bold mb-4">
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
