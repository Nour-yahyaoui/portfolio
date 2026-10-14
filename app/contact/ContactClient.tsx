"use client";

import { motion } from "framer-motion";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

function ContactClient() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/nourryahyaoui@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _template: 'table'
        })
      });

      if (response.ok) {
        setAlertMessage("Message sent successfully! I'll get back to you soon.");
        setAlertType("success");
        setShowAlert(true);
        
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      setAlertMessage("Failed to send message. Please try again later.");
      setAlertType("error");
      setShowAlert(true);
      
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const socialIcons = [
    { icon: <Github size={18} />, href: "https://github.com/nour-yahyaoui" },
    {
      icon: <Instagram size={18} />,
      href: "https://instagram.com/nourr_yahyaouiii",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://www.linkedin.com/in/nourr-yahyaoui-86987b36b",
    },
    { icon: <Mail size={18} />, href: "mailto:nourryahyaoui@gmail.com" },
    { icon: <Phone size={18} />, href: "tel:+21658923247" },
    { icon: <MessageSquare size={18} />, href: "https://wa.me/21658923247" },
  ];

  const contactItems = [
    {
      icon: <Mail size={18} />,
      title: "Email",
      value: "nourryahyaoui@gmail.com",
      href: "mailto:nourryahyaoui@gmail.com",
    },
    {
      icon: <Phone size={18} />,
      title: "Phone",
      value: "+216 58 923 247",
      href: "tel:+21658923247",
    },
    {
      icon: <MessageSquare size={18} />,
      title: "WhatsApp",
      value: "+216 58 923 247",
      href: "https://wa.me/21658923247",
    },
    {
      icon: <MapPin size={18} />,
      title: "Location",
      value: "Gassrin Sbiba, Tunisia",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Custom Alert */}
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
        >
          <div className={`rounded-lg shadow-lg p-4 ${
            alertType === "success" 
              ? "bg-green-500/10 border border-green-500/30" 
              : "bg-red-500/10 border border-red-500/30"
          } backdrop-blur-md`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 ${
                alertType === "success" ? "text-green-500" : "text-red-500"
              }`}>
                {alertType === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  alertType === "success" ? "text-green-400" : "text-red-400"
                }`}>
                  {alertType === "success" ? "Success!" : "Error!"}
                </p>
                <p className="text-sm text-gray-300 mt-1">{alertMessage}</p>
              </div>
              <button
                onClick={closeAlert}
                className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
              >
                <XCircle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.section
        id="contact"
        className="py-16 px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-3 text-white"
              whileHover={{ scale: 1.02 }}
            >
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Touch
              </span>
            </motion.h2>
            <motion.p
              className="text-base text-gray-300 max-w-2xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              Have a project in mind? Reach out through any of these channels.
            </motion.p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:w-5/12">
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full"
                whileHover={{ y: -3 }}
              >
                <h3 className="text-xl font-bold mb-5 text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                  Contact Details
                </h3>

                <div className="space-y-4">
                  {contactItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      variants={itemVariants}
                    >
                      <div className="p-1.5 text-white rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400">{item.title}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-300">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Icons */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-white mb-3">
                    Connect
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {socialIcons.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:w-7/12">
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                whileHover={{ y: -3 }}
              >
                <h3 className="text-xl font-bold mb-5 text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Project Inquiry"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-gray-300 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full px-4 py-2.5 text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactClient;