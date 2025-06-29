import React from 'react';

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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition duration-300 relative">
      {/* Construction Badge */}
      {project.underConstruction && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-medium z-10">
          🚧 Under Construction
        </div>
      )}
      
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} Project`}
          className="w-full h-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="bg-primary-100 dark:bg-gray-700 text-primary-800 dark:text-primary-400 text-xs px-2 py-1 rounded">
            {project.mainTag}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Live Demo
            </a>
          ) : (
            <span className="flex-1 text-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed">
              Live Demo
            </span>
          )}
          
          {project.code ? (
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {project.privateCode ? "View Code" : "Code"}
            </a>
          ) : (
            <span className="flex-1 text-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg cursor-not-allowed">
              Private
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;