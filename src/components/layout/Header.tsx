import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      // Close mobile menu if open
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      } border-b border-gray-200 dark:border-gray-800 transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#" onClick={() => scrollToSection('home')} className="text-2xl font-bold gradient-text">
            Nour Yahyaoui
          </a>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-8">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                className="hover:text-primary-500 transition-colors"
              >
                Home
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="hover:text-primary-500 transition-colors"
              >
                About
              </a>
              <a 
                href="#skills" 
                onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
                className="hover:text-primary-500 transition-colors"
              >
                Skills
              </a>
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                className="hover:text-primary-500 transition-colors"
              >
                Projects
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className="hover:text-primary-500 transition-colors"
              >
                Contact
              </a>
            </nav>

            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden mt-4 pb-4 transition-all duration-300 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-3">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;