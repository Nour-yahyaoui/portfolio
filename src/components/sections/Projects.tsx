import React from "react";
import ProjectCard from "../ui/ProjectCard";

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
  note?: string;
  loginInstructions?: string;
  isPrivate?: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "ButtonCraft",
      description:
        "A collection of beautifully designed, ready-to-use button components with HTML/CSS and Tailwind CSS implementations, featuring a visual editor (coming soon).",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Component Library",
        "TypeScript",
      ],
      mainTag: "Next.js",
      liveDemo: "https://button-gen.vercel.app/",
      code: "https://github.com/nour-yahyaoui/button-gen",
    },
    {
      title: "NF-Team",
      description:
        "A collaborative web development team project featuring modern UI/UX design and full-stack functionality.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React", "Next.js", "Team Project", "tailwindcss", "typescript"],
      mainTag: "Team Project",
      liveDemo: "https://nf-team-pi.vercel.app/",
      privateCode: true,
      note: "Code repository is private as it's a team project",
    },
    {
      title: "Musify",
      description:
        "A modern music player application with playlist functionality built with React and Vite.",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: ["React", "Vite", "Tailwind CSS", "Only frontend"],
      mainTag: "React",
      liveDemo: "https://musify-tau-sepia.vercel.app/",
      code: "https://github.com/nour-yahyaoui/musify",
    },
    {
      title: "Ultra-Vuk",
      description:
        "A comprehensive personal dashboard featuring news, weather, calendar, AI tools, school and gym tracking (Private access only).",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
      tags: [
        "Next.js",
        "API Integration",
        "AI",
        "Dashboard",
        "Authentication",
        "supabase DB",
      ],
      mainTag: "Next js",
      liveDemo: "https://ultra-vuk.vercel.app/",
      privateCode: true,
      loginInstructions: "Contact me for demo access credentials",
      isPrivate: true,
      note: "Personal project with sensitive data - demo access available upon request",
    },
   {
      title: "Free Portfolio Templates",
      description:
        "A collection of 5 professional portfolio templates with modern designs, animations, and responsive layouts.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      tags: [
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Templates",
        "TypeScript",
        "source code"
      ],
      mainTag: "Next.js",
      liveDemo: "https://portfolio-templates-store.vercel.app/",
      code: "https://portfolio-templates-store.vercel.app/",
    },
    {
      title: "Django Chat Application",
      description:
        "A real-time chat application built with Django Channels, featuring instant messaging, user authentication, and multiple chat rooms.",
      image:
        "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      tags: ["Django", "Channels", "Python", "SQL", "Fullstack"],
      mainTag: "Django",
      code: "https://github.com/nour-yahyaoui/chat-app/",
    },
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
