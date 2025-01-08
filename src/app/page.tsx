import Content from '@/components/Content'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ProjectsSection from '@/components/projects/ProjectsSection'
import Footer from '@/components/Footer'


export default function Home() {
    return (
        <Content>
            <Hero></Hero>
            <AboutSection></AboutSection>
            <ProjectsSection></ProjectsSection>
            <Footer></Footer>
        </Content>
    )
}
