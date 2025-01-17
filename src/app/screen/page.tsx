import { Metadata } from 'next'
import '../globals.css'
// import Welcome from '@/app/screen/components/welcome'
import Desktop from './components/desktop'

export const metadata: Metadata = {
    title: 'János_Litkei',
    description: "János Litkei's personal website",
}
export default function Screen() {
    return (
        <html lang="en" className="h-full overflow-hidden">
            <body className="bg-monitor-bg">
                {/* <Welcome/> */}
                <Desktop/>
            </body>
        </html>
    )
}
