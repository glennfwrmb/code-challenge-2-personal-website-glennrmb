import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import { ToastContainer } from 'react-toastify';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Experience from './components/Experience.tsx';
import Testimonials from './components/Testimonials.tsx';
import Footer from './components/Footer.tsx';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}
