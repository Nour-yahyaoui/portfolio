import React from 'react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-2xl font-bold gradient-text">
              Nour Yahyaoui
            </a>
            <p className="mt-2">Web Developer & AI Enthusiast</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-4">
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-primary-400 transition-colors">Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-primary-400 transition-colors">About</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="hover:text-primary-400 transition-colors">Skills</a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-primary-400 transition-colors">Projects</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-primary-400 transition-colors">Contact</a>
            </div>
            <p>&copy; 2025 Nour Yahyaoui. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;