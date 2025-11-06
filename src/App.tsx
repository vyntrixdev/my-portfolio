import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './components/ThemeProvider';
import { UserProvider } from './contexts/UserContext'; // import the provider
import { HeroProvider } from './contexts/HeroContext'; // import the provider
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider> {/* Preload user here */}
        <HeroProvider> 
          <div className="min-h-screen">
            <Header />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer /> 
          </div>
        </HeroProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
