import React from 'react';
import ContactForm from '../ui/ContactForm';
import ContactInfo from '../ui/ContactInfo';

const Contact: React.FC = () => {
  const contactItems = [
    { 
      icon: 'fas fa-envelope', 
      title: 'Email', 
      content: 'nourryahyaoui@gmail.com'
    },
    { 
      icon: 'fas fa-phone', 
      title: 'Phone', 
      content: '+216 25739896'
    },
    { 
      icon: 'fab fa-whatsapp', 
      title: 'whatsapp', 
      content: '+21625739896'
    },
    { 
      icon: 'fab fa-github', 
      title: 'GitHub', 
      content: 'github.com/nour-yahyaoui', 
      link: 'https://github.com/nour-yahyaoui/'
    },
    { 
      icon: 'fas fa-briefcase', 
      title: 'Fiverr', 
      content: 'fiverr.com/nouryahyaoui', 
      link: 'https://www.fiverr.com/s/42d04wd'
    },
    { 
      icon: 'fas fa-map-marker-alt', 
      title: 'Location', 
      content: 'Gassrin Sbiba, Tunisia'
    }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', link: '#' },
    { icon: 'fab fa-instagram', link: '#' },
    { icon: 'fab fa-whatsapp', link: '#' },
    { icon: 'fab fa-github', link: 'https://github.com/nour-yahyaoui/' },
    { icon: 'fas fa-briefcase', link: 'https://www.fiverr.com/s/42d04wd' }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Get In <span className="gradient-text">Touch</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Information */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <ContactInfo items={contactItems} socialLinks={socialLinks} />
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;