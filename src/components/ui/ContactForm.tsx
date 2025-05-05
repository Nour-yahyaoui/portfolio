import React from 'react';

const ContactForm: React.FC = () => {
  return (
    <form 
      action="https://formsubmit.co/nourryahyaoui@gmail.com" 
      method="POST"
      className="space-y-6"
    >
      {/* HoneyPot (for spam protection) */}
      <input type="text" name="_honey" style={{ display: 'none' }} />
      
      {/* Disable Captcha */}
      <input type="hidden" name="_captcha" value="false" />
      
      {/* Success Redirect */}
      <input type="hidden" name="_next" value="https://nour-yahyaoui.github.io/official/" />
      
      {/* Email Subject */}
      <input type="hidden" name="_subject" value="New Message from Your Website!" />
      
      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 font-medium">Your Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 transition-colors"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;