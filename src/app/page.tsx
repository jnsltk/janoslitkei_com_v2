import Navbar from '@/components/Navbar'
import Content from '@/components/Content'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/projects/ProjectsSection'
import Footer from '@/components/Footer'
import { IframeProvider } from '@/components/IframeContext'


export default function Home() {
    return (
        <>
            <Navbar />
            <IframeProvider>
                <Content>
                    <Hero></Hero>
                    <AboutSection></AboutSection>
                    <ProjectsSection></ProjectsSection>
                    <Footer></Footer>
                </Content>
            </IframeProvider>
        </>
    )
}
