import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3001/3001758.png"
              alt="Nour Yahyaoui"
              loading="lazy"
              className="w-64 h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3 md:pl-12">
            <h3 className="text-2xl font-semibold mb-4">Who am I?</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              I'm an 18-year-old web developer from Tunisia, currently studying
              at Monji Slim Secondary School in Gassrin Sbiba. Passionate about
              creating beautiful, functional websites and applications that
              solve real-world problems.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <div className="mr-3 text-primary-500">
                  <i className="fas fa-user-graduate text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium">Education</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Monji Slim Secondary School
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-primary-500">
                  <i className="fas fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gassrin Sbiba, Tunisia
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-primary-500">
                  <i className="fas fa-code text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium">Experience</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2+ years in Web Development
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-primary-500">
                  <i className="fas fa-project-diagram text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium">Projects</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    10+ completed
                  </p>
                </div>
              </div>
            </div>

            <p className="mb-6 text-gray-600 dark:text-gray-400">
              I started my coding journey at a young age and quickly fell in
              love with the process of creating things that people can interact
              with. My goal is to continue growing as a developer and eventually
              work on projects that make a positive impact.
            </p>

            <a
              href="https://github.com/nour-yahyaoui/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <i className="fab fa-github mr-2"></i> View GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;