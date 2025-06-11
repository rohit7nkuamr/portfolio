'use client';
import { useRef } from 'react';
import Section from './Section';
import experiences from '../content/experience.json';
import { motion, useScroll, useSpring, useInView, useTransform } from 'framer-motion';

interface Experience {
  role: string;
  org: string;
  period: string;
  details: string;
  skills?: string[];
  achievement?: string;
}

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px 0px" });
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: index * 0.1
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0.1, 0.3, 0.1],
      scale: 1,
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative mb-12 last:mb-0"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/80 via-accent/30 to-transparent h-full"></div>
      
      {/* Timeline dot */}
      <div className="absolute left-6 top-8 w-3 h-3 rounded-full bg-accent transform -translate-x-1.5 z-10">
        <motion.div
          variants={glowVariants}
          animate="visible"
          className="absolute w-8 h-8 rounded-full bg-accent/20 -top-2.5 -left-2.5 blur-sm"
        />
      </div>

      {/* Card content */}
      <motion.div 
        className="relative ml-16 bg-black/30 backdrop-blur-sm border border-accent/10 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300"
        whileHover={{ 
          boxShadow: "0 10px 30px -5px rgba(255, 45, 117, 0.2)",
          y: -5
        }}
      >
        {/* Terminal-like header */}
        <div className="bg-black/60 px-4 py-2 border-b border-accent/20 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="text-xs font-mono text-gray-400 flex-grow text-center truncate">
            experience://{experience.org.toLowerCase().replace(/\s/g, '-')}
          </div>
          <div className="text-xs text-accent font-mono">{experience.period}</div>
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1 game-heading group-hover:text-gradient-accent">
              {experience.role}
            </h3>
            <h4 className="text-lg text-accent font-medium">{experience.org}</h4>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">{experience.details}</p>
          </div>
          
          {experience.skills && (
            <div className="mt-4 flex flex-wrap gap-2">
              {experience.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="text-xs px-2 py-1 bg-accent/10 border border-accent/30 rounded-md text-accent/90"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {experience.achievement && (
            <div className="mt-4 bg-accent/5 border-l-2 border-accent p-3 rounded">
              <div className="text-xs font-semibold text-accent mb-1">ACHIEVEMENT</div>
              <p className="text-sm text-gray-300">{experience.achievement}</p>
            </div>
          )}
        </div>
        
        {/* Corner detail */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-50">
          <div className="absolute transform rotate-45 bg-accent/10 w-20 h-20 -top-10 -right-10"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  // Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  return (
    <Section id="experience" theme="dark">
      <div ref={ref} className="max-w-4xl w-full px-4">
        {/* Header with animations */}
        <motion.div 
          className="mb-16 text-center relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h4 className="text-sm uppercase tracking-widest text-accent mb-2 font-medium">Career Path</h4>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 game-heading">
            Experience
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            My professional journey in game development and software engineering
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-accent to-accent-light mx-auto mt-6"></div>
        </motion.div>

        {/* Experience timeline */}
        <div className="relative">
          {/* Progress line */}
          <motion.div 
            className="absolute left-6 top-0 w-0.5 h-full bg-gray-800 origin-top"
            style={{ scaleY: scaleProgress }}
          />
          
          {/* Experience cards */}
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.org} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
