import Cursor from './components/Cursor';
import ProgressBar from './components/ProgressBar';
import Nav from './components/Nav';
import MobileDrawer from './components/MobileDrawer';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import Dock from './components/Dock';
import { ToastProvider } from './context/ToastContext';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useMobileDrawer } from './hooks/useMobileDrawer';
import { useCommandPalette } from './hooks/useCommandPalette';
import { useCopyEmail } from './hooks/useCopyEmail';
import { useGlobalReveal } from './hooks/useGlobalReveal';

function AppInner() {
  const { pct, scrolled } = useScrollProgress();
  const drawer = useMobileDrawer();
  const copyEmail = useCopyEmail();
  const palette = useCommandPalette(copyEmail);
  useGlobalReveal();

  return (
    <>
      <Cursor />
      <ProgressBar pct={pct} />
      <a href="#main" className="skip-link">Skip to main content</a>

      <Nav
        scrolled={scrolled}
        onOpenCommandPalette={palette.open}
        onToggleDrawer={drawer.toggle}
        drawerOpen={drawer.isOpen}
      />
      <MobileDrawer isOpen={drawer.isOpen} onClose={drawer.closeDrawer} />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
      <CommandPalette palette={palette} />
      <Dock />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
