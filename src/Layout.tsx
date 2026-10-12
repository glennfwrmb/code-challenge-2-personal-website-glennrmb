import { lazy } from 'react';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import LazySection from './components/LazySection.tsx';
import { ToastContainer } from 'react-toastify';

const About = lazy(() => import('./components/About.tsx'));
const Skills = lazy(() => import('./components/Skills.tsx'));
const Projects = lazy(() => import('./components/Projects.tsx'));
const Experience = lazy(() => import('./components/Experience.tsx'));
const Testimonials = lazy(() => import('./components/Testimonials.tsx'));
const Contact = lazy(() => import('./components/Contact.tsx'));
const Footer = lazy(() => import('./components/Footer.tsx'));

export default function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Home />

        <LazySection>
          <About />
        </LazySection>

        <LazySection>
          <Skills />
        </LazySection>

        <LazySection>
          <Projects />
        </LazySection>

        <LazySection>
          <Experience />
        </LazySection>

        <LazySection>
          <Testimonials />
        </LazySection>

        <LazySection>
          <Contact />
        </LazySection>
      </main>

      <LazySection>
        <Footer />
      </LazySection>

      <ToastContainer />
    </>
  );
}