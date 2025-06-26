import React from 'react';
import SkillCard from '../ui/SkillCard';
import { Code, Server, Wrench, TrendingUp } from 'lucide-react';

interface SkillLevel {
  name: string;
  level: string;
  percentage: number;
}
const Skills: React.FC = () => {
  const skillLevels: SkillLevel[] = [
    { name: 'HTML/CSS/JavaScript', level: 'Expert', percentage: 95 },
    { name: 'Python', level: 'Advanced', percentage: 75 },
    { name: 'React', level: 'Intermediate', percentage: 70 },
    { name: 'Next.js', level: 'Advanced', percentage: 85 },
    { name: 'TypeScript', level: 'Intermediate', percentage: 70 },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          My <span className="gradient-text">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Frontend Skills */}
          <SkillCard
            icon={<Code size={32} className="text-primary-500" />}
            title="Frontend"
           skills={[
                { name: 'Next.js', icon: 'fas fa-server text-black dark:text-white' }, 
                { name: 'Tailwind CSS', icon: 'fas fa-wind text-teal-400' },
                { name: 'React + Vite', icon: 'fab fa-react text-blue-400' },
                { name: 'TypeScript', icon: 'fas fa-code text-blue-600' },  
                { name: 'JavaScript', icon: 'fab fa-js-square text-yellow-400' },
                { name: 'CSS3', icon: 'fab fa-css3-alt text-blue-500' },
                { name: 'HTML5', icon: 'fab fa-html5 text-orange-500' },
              ]}
          />

          {/* Backend Skills */}
          <SkillCard
            icon={<Server size={32} className="text-primary-500" />}
            title="Backend"
            skills={[
              { name: 'Python', icon: 'fab fa-python text-blue-600' },
              { name: 'SQL', icon: 'fas fa-database text-emerald-500' },
              { name: 'Supabase', icon: 'fas fa-database text-purple-500' }, 
              { name: 'Neon DB', icon: 'fas fa-bolt text-cyan-500' },
            ]}
          />

          <SkillCard
            icon={<Wrench size={32} className="text-primary-500" />}
            title="Tools & Other"
            skills={[
              { name: 'Git', icon: 'fab fa-git-alt text-orange-600' },
              { name: 'GitHub', icon: 'fab fa-github text-gray-800 dark:text-gray-200' },
              { name: 'CLI', icon: 'fas fa-terminal text-gray-500' },
              { name: 'AI Integration', icon: 'fas fa-robot text-purple-500' },
              { name: 'Responsive Design', icon: 'fas fa-mobile-alt text-blue-400' },
              { name: 'Basic SEO', icon: 'fas fa-search-dollar text-amber-500' },
              { name: 'Fast Website Best Practices', icon: 'fas fa-tachometer-alt text-red-500' },
            ]}
          />

          {/* Skill Levels */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-primary-500 mb-4">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Skill Levels</h3>
            <div className="space-y-4">
              {skillLevels.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-primary-500 h-2.5 rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;