'use client';
import { useState, useRef } from 'react';
import Section from './Section';
import projects from '../content/projects.json';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
  featured?: boolean;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Define animations for project cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(255, 45, 117, 0.2), 0 10px 10px -5px rgba(255, 45, 117, 0.1)",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { scale: 0.98 }
  };
  
  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    hover: { opacity: 1 },
  };

  const tagVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.15 + i * 0.05 + 0.3
      }
    })
  };
  
  const techBadgeColor = (tech: string) => {
    const colors = {
      'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Next.js': 'bg-black/30 text-white border-white/30',
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'TypeScript': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
      'Unity': 'bg-black/30 text-white border-white/30',
      'C#': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'Node.js': 'bg-green-500/20 text-green-300 border-green-500/30',
      'MongoDB': 'bg-green-700/20 text-green-500 border-green-700/30',
      'Firebase': 'bg-yellow-600/20 text-yellow-500 border-yellow-600/30',
      'Flutter': 'bg-blue-400/20 text-blue-300 border-blue-400/30',
      'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'AI': 'bg-red-500/20 text-red-300 border-red-500/30',
      'AR': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'VR': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      'Mobile': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      // Add more tech-specific styling as needed
    };
    // @ts-ignore - Index signature issue
    return colors[tech] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  // Game-inspired card design
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${project.featured ? 'md:col-span-2' : ''}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
      layout
    >
      {/* Card Background with Grid Pattern */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0 border border-accent/10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/20"></div>
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10" style={{opacity: 0.05}}>
          {Array.from({length: 100}).map((_, i) => (
            <div key={i} className="border-[0.5px] border-accent/20"></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Project Image (if available) */}
        {project.image && (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-black/20 border border-white/10">
            <motion.div 
              className="w-full h-full"
              variants={imageVariants}
            >
              <Image 
                src={project.image} 
                alt={project.title} 
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4"
              variants={overlayVariants}
            >
              <div>
                <div className="text-sm font-semibold text-accent mb-1 tracking-wide">{project.featured ? 'FEATURED PROJECT' : 'PROJECT'}</div>
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Project Title with Laser Text Effect */}
        <h3 className="text-2xl font-bold mb-3 game-heading group-hover:glitch">
          {project.title}
          <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-accent to-transparent transition-all duration-700 opacity-50 mt-1"></div>
        </h3>

        {/* Description with Animation */}
        <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, i) => (
            <motion.span
              key={tech}
              custom={i}
              variants={tagVariants}
              initial="hidden"
              animate="visible"
              className={`text-xs px-3 py-1 rounded-full border ${techBadgeColor(tech)}`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Project Link with Animation */}
        <motion.div 
          className="mt-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href={project.link}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="mr-2">View Project</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        {/* Corner Detail */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div 
            className="absolute transform rotate-45 bg-gradient-to-r from-accent/80 to-accent w-20 h-20 -top-10 -right-10"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Main section animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Section id="projects" theme="accent">
      <div ref={sectionRef} className="w-full max-w-6xl px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="mb-16 text-center relative">
            <h4 className="text-sm uppercase tracking-widest text-accent mb-2 font-medium">My Work</h4>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 game-heading">
              Projects
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Check out my featured projects, gaming applications, and software solutions
            </p>
            <div className="h-1 w-20 bg-gradient-to-r from-accent to-accent-light mx-auto mt-6"></div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
