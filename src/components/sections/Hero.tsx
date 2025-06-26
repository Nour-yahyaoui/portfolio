import React, { useEffect } from 'react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Add animation class to elements after component mounts
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-load');
      elements.forEach(el => el.classList.add('opacity-100', 'translate-y-0'));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative py-20 pt-[100px] lg:pt-[200px] min-h-[calc(100vh-100px)] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        
        {/* Animated shapes */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary-500 rounded-lg opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-400 rounded-full opacity-20 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-indigo-400 rounded-lg opacity-20 animate-float animation-delay-3000"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-on-load opacity-0 translate-y-10 transition-all duration-500">
            Hi, I'm <span className="gradient-text bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">Nour Yahyaoui</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-on-load opacity-0 translate-y-10 transition-all duration-500 delay-100">
            Web Developer from Tunisia
          </h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400 animate-on-load opacity-0 translate-y-10 transition-all duration-500 delay-200">
            I build modern, responsive web applications with clean code and
            great user experiences.
          </p>
          <div className="flex space-x-4 animate-on-load opacity-0 translate-y-10 transition-all duration-500 delay-300">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-primary-500/30"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors shadow-lg hover:shadow-primary-500/20"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center animate-on-load opacity-0 translate-y-10 transition-all duration-500 delay-150">
          <div className="relative lg:w-[500px] lg:h-[500px] w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-400 rounded-full opacity-10 -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-400 rounded-full opacity-10 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Developer coding"
              className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl hover:shadow-primary-500/30 transition-shadow duration-300"
            />
            {/* Decorative dots pattern */}
            <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-dots-pattern opacity-30"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-dots-pattern opacity-30 rotate-90"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;