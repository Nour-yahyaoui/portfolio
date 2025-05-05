import React from 'react';
import ProjectCard from '../ui/ProjectCard';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  mainTag: string;
  liveDemo?: string;
  code?: string;
  underConstruction?: boolean;
  privateCode?: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Musify",
      description: "A modern music player application with playlist functionality built with React and Vite.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React", "Vite", "Tailwind CSS", "Only frontend"],
      mainTag: "React",
      liveDemo: "https://musify-tau-sepia.vercel.app/",
      code: "https://github.com/nour-yahyaoui/musify"
    },
    {
      title: "Portfolio Templates",
      description: "A collection of modern, responsive portfolio templates for developers, featuring dark mode support and customizable components.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Responsive", "Only frontend"],
      mainTag: "React",
      liveDemo: "https://nour-yahyaoui.github.io/templates/",
      underConstruction: true,
      privateCode: true
    },
    {
      title: "Password Generator",
      description: "A secure password generator with customizable options for length and character types.",
      image: "https://media.istockphoto.com/id/2172249278/photo/lock-sign-on-abstract-program-code-digital-security-concept-protect-data.webp?a=1&b=1&s=612x612&w=0&k=20&c=hm7XMFfObrdUu1xHN3ca69b0yp8mFr2gSVtwT7Sj9dY=",
      tags: ["JavaScript", "HTML5", "CSS3", "Security"],
      mainTag: "JavaScript",
      liveDemo: "https://generator-one-ecru.vercel.app/",
      code: "https://github.com/Nour-yahyaoui/generator"
    },
    {
      title: "Django Chat Application",
      description: "A real-time chat application built with Django Channels, featuring instant messaging, user authentication, and multiple chat rooms.",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      tags: ["Django", "Channels", "JavaScript", "PostgreSQL"],
      mainTag: "Django",
      code: "https://github.com/nour-yahyaoui/chat-app/"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          My <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/nour-yahyaoui/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            <i className="fab fa-github mr-2"></i> View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;