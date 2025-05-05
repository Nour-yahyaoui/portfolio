import React from 'react';

interface ContactItem {
  icon: string;
  title: string;
  content: string;
  link?: string;
}

interface SocialLink {
  icon: string;
  link: string;
}

interface ContactInfoProps {
  items: ContactItem[];
  socialLinks: SocialLink[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ items, socialLinks }) => {
  return (
    <div>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="text-primary-500 mt-1 mr-4">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <div>
              <h4 className="font-medium">{item.title}</h4>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                >
                  {item.content}
                </a>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {item.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h4 className="font-medium mb-4">Connect with me</h4>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
            >
              <i className={`${social.icon} text-gray-700 dark:text-gray-300`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;