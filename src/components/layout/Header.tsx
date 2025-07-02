import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Sun, Moon, Menu, Home, User, Code, Folder, Mail } from "lucide-react";

const Header: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll for header styling and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Nav items data
  const navItems = [
    { id: "home", icon: Home },
    { id: "about", icon: User },
    { id: "skills", icon: Code },
    { id: "projects", icon: Folder },
    { id: "contact", icon: Mail },
  ];

  return (
    <header
      className={`sticky top-0 z-50 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      } border-b border-gray-200 dark:border-gray-800 transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a
            href="#"
            onClick={() => scrollToSection("home")}
            className="text-2xl font-bold gradient-text"
          >
            Nour Yahyaoui
          </a>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    aria-label={item.id}
                    className={`p-3 rounded-full relative group transition-all duration-300 ${
                      isActive
                        ? "text-primary-500 dark:text-primary-400 bg-primary-500/10 dark:bg-primary-400/10"
                        : "text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                    }`}
                  >
                    <Icon size={20} />
                    {/* Glow effect */}
                    <span
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isActive
                          ? "bg-primary-500/20 dark:bg-primary-400/20"
                          : "bg-primary-500/10 dark:bg-primary-400/10"
                      }`}
                    ></span>
                  </button>
                );
              })}
            </nav>

            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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
        <div
          className={`md:hidden mt-4 pb-4 transition-all duration-300 ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col space-y-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className={`block px-3 py-2 rounded transition-colors ${
                activeSection === "home"
                  ? "bg-primary-500/10 text-primary-500 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className={`block px-3 py-2 rounded transition-colors ${
                activeSection === "about"
                  ? "bg-primary-500/10 text-primary-500 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              About
            </a>
            <a
              href="#skills"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("skills");
              }}
              className={`block px-3 py-2 rounded transition-colors ${
                activeSection === "skills"
                  ? "bg-primary-500/10 text-primary-500 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className={`block px-3 py-2 rounded transition-colors ${
                activeSection === "projects"
                  ? "bg-primary-500/10 text-primary-500 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className={`block px-3 py-2 rounded transition-colors ${
                activeSection === "contact"
                  ? "bg-primary-500/10 text-primary-500 dark:text-primary-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
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
