"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Terminal, ArrowDown, Shield, Zap, Layers, Server, Smartphone, Palette, Lock, Cpu } from "lucide-react";
import { useEffect, useRef } from "react";
import SmallUniverse from "@/components/SmallUniverse";
import Link from "next/link";

function AboutClient() {
  const universeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    {
      name: "Frontend",
      technologies: [
        "React 19", "Next.js 16", "Vite", "Tailwind CSS", 
        "TypeScript", "Framer Motion", "React Native"
      ],
      icon: <Code className="w-5 h-5" />,
      description: "Building responsive, interactive UIs with modern frameworks"
    },
    {
      name: "Backend",
      technologies: [
        "Next.js Serverless", "Node.js", "Express", "Rust (Actix Web / Axum)",
        "Python", "PHP", "Neon DB", "PostgreSQL"
      ],
      icon: <Server className="w-5 h-5" />,
      description: "Scalable serverless APIs and database architecture"
    },
    {
      name: "AI & Agents",
      technologies: [
        "Ollama", "Qwen3 8B", "FastAPI", "SSE Streaming",
        "Prometheus", "pytest"
      ],
      icon: <Cpu className="w-5 h-5" />,
      description: "Local inference, tool-using agents, and the guardrails around them"
    },
    {
      name: "Mobile",
      technologies: [
        "React Native", "Expo", "Android (Java)", 
        "iOS Swift", "Cross-Platform"
      ],
      icon: <Smartphone className="w-5 h-5" />,
      description: "Native and cross-platform mobile applications"
    },
    {
      name: "Desktop",
      technologies: [
        "Linux (Debian)", "live-build", "XFCE",
        "VexOS DevStudio", "Python (Tkinter/PyQt)", "Java (Swing/JavaFX)"
      ],
      icon: <Layers className="w-5 h-5" />,
      description: "Cross-platform desktop applications"
    },
    {
      name: "State Management",
      technologies: [
        "Zustand", "Redux Toolkit", "React Context", 
        "TanStack Query"
      ],
      icon: <Zap className="w-5 h-5" />,
      description: "Efficient state management for complex applications"
    },
    {
      name: "Security & Architecture",
      technologies: [
        "Rate Limiting", "XSS Prevention", "CSRF Protection", 
        "SQL Injection Prevention", "JWT Auth", "RBAC",
        "Clean Architecture", "SOLID Principles"
      ],
      icon: <Shield className="w-5 h-5" />,
      description: "Secure, scalable, and maintainable system design"
    },
    {
      name: "Design",
      technologies: [
        "UI/UX Design", "Figma", "Responsive Design", 
        "Animations", "Micro-interactions"
      ],
      icon: <Palette className="w-5 h-5" />,
      description: "Beautiful, user-centered design experiences"
    },
    {
      name: "DevOps & Tools",
      technologies: [
        "Git/GitHub", "Docker", "Debian", "live-build",
        "Vercel", "CI/CD", "Postman", "VS Code"
      ],
      icon: <Terminal className="w-5 h-5" />,
      description: "Streamlined development and deployment workflows"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Subtle ambient background */}
      <div 
        ref={universeRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ 
          width: '100vw', 
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <SmallUniverse />
      </div>

      {/* Content overlay - Semi-transparent to see universe through it */}
      <div className="relative z-10 bg-black/40 backdrop-blur-[2px] min-h-screen">
        {/* Hero Section - Full Screen with Image Left & Text Right */}
        <motion.section
          className="min-h-screen flex items-center px-4 sm:px-6 lg:px-12 py-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left side - Image */}
              <motion.div 
                variants={itemVariants}
                className="lg:w-5/12 flex justify-center w-full"
              >
                <motion.div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-4 border-white/15 shadow-2xl backdrop-blur-sm bg-black/30 flex-shrink-0"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 mix-blend-overlay" />
                  <Image
                    src="/port.png"
                    alt="Nour Yahyaoui"
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </motion.div>
              </motion.div>

              {/* Right side - Brief Intro */}
              <motion.div 
                variants={itemVariants}
                className="lg:w-7/12 text-center lg:text-left w-full"
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-white drop-shadow-lg">Hi, I&apos;m </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg">
                    Nour
                  </span>
                </motion.h1>
                
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-200 mb-4 sm:mb-8 drop-shadow-lg"
                  variants={itemVariants}
                >
                  Full-Stack Developer & Problem Solver
                </motion.h2>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow"
                  variants={itemVariants}
                >
                  I craft beautiful, secure, and scalable applications with modern technologies. 
                  From web and mobile to desktop, I turn complex problems into elegant solutions.
                </motion.p>

                <motion.div 
                  className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mt-6 sm:mt-10"
                  variants={itemVariants}
                >
                  <Link href={'/projects'}> 
                    <motion.button
                      className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-semibold shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View My Work
                    </motion.button>
                  </Link>
                  <Link href={'/contact'}> 
                    <motion.button
                      className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm shadow-xl text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Contact Me
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="w-6 h-6 text-gray-300 drop-shadow" />
            </motion.div>
          </div>
        </motion.section>

        {/* Detailed About Section */}
        <motion.section
          id="about"
          className="py-12 sm:py-16 md:py-24 px-4 sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 md:mb-20">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                More{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  About Me
                </span>
              </motion.h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow"
                whileHover={{ scale: 1.01 }}
              >
                Passionate developer crafting exceptional digital experiences
              </motion.p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Journey Card */}
              <motion.div variants={itemVariants} className="lg:w-5/12">
                <motion.div
                  className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 h-full shadow-2xl"
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white flex items-center gap-3 drop-shadow">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></span>
                    My Journey
                  </h3>
                  <p className="text-gray-200 mb-3 sm:mb-4 leading-relaxed text-base sm:text-lg drop-shadow">
                    I&apos;m a 19-year-old full-stack developer from Tunisia with 3 years
                    of freelance and client experience. I began my coding journey with
                    Python and web development fundamentals, and I&apos;ve since progressed
                    through JavaScript, React, and modern full-stack development with
                    Next.js, React Native, and serverless architectures.
                  </p>
                  <p className="text-gray-200 leading-relaxed text-base sm:text-lg drop-shadow">
                    I build production apps end-to-end and am expanding into Rust for
                    performance-critical services. Recently, that has also meant making
                    my own tools: <strong className="font-semibold text-white">nour-code</strong>,
                    a local AI coding agent with audited, permission-checked tools, and
                    <strong className="font-semibold text-white"> VexOS</strong>, my Debian-based Linux distribution, packaged as a development-ready live ISO.
                  </p>
                </motion.div>
              </motion.div>

              {/* Skills Grid */}
              <motion.div variants={itemVariants} className="lg:w-7/12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-black/50 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 hover:border-cyan-500/50 transition-all duration-300 shadow-2xl group"
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg group-hover:shadow-cyan-500/30 transition-all">
                          {skill.icon}
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-white drop-shadow">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-400 mb-2 sm:mb-3 line-clamp-1">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {skill.technologies.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs rounded-full bg-white/10 text-gray-200 border border-white/20 hover:bg-cyan-500/30 hover:border-cyan-500/70 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {skill.technologies.length > 3 && (
                          <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            +{skill.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Security & Architecture Highlight */}
            <motion.div
              variants={itemVariants}
              className="mt-8 sm:mt-12 md:mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Security-First Development</h3>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I prioritize security in every project: from rate limiting, CSRF protection, and input validation to guarding local developer tools with path checks, shell allowlists, and audit logs. I pair those practical controls with clean architecture to keep applications maintainable as they scale.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ Rate Limiting
                </span>
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ XSS Prevention
                </span>
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ CSRF Protection
                </span>
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ SQL Injection Prevention
                </span>
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ JWT Authentication
                </span>
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ Path Traversal Protection
                </span>
                <span className="px-2 sm:px-3 py-1 text-[10px] sm:text-sm rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  🛡️ Secret Scanning
                </span>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutClient;