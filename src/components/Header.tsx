import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { motion } from 'motion/react';
import { useUser } from '../contexts/UserContext';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl shadow-2xl border-b-2 border-red-500/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 via-purple-600 to-pink-600 rounded-full text-white shadow-lg hover:shadow-xl transition-all"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
            <span>
               {loading
                ? 'Loading...' :
                user?.nickname}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-red-600 via-purple-600 to-pink-600 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-red-600" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-purple-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
