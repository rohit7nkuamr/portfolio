'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Section from './Section';
import profile from '../content/profile.json';

export default function ContactSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  const contactButtons = [
    {
      name: 'email',
      label: 'Email Me',
      url: `mailto:${profile.email}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      primary: true
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      url: profile.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'github',
      label: 'GitHub',
      url: profile.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'phone',
      label: 'Phone',
      url: `tel:${profile.phone}`,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
        </svg>
      )
    }
  ];
  
  // Terminal-inspired text
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const titleText = "Get in Touch";
  const subtitleText = "Feel free to reach out anytime—let's build something awesome together.";

  return (
    <Section id="contact" theme="accent">
      <div ref={sectionRef} className="w-full max-w-4xl px-4">
        <div className="rounded-xl overflow-hidden relative backdrop-blur-sm border border-accent/20">
          {/* Futuristic gaming interface elements */}
          <div className="absolute inset-0 bg-black/60 z-0">
            {/* Grid pattern background */}
            <div className="absolute inset-0 grid grid-cols-20 grid-rows-20" style={{opacity: 0.05}}>
              {Array.from({length: 400}).map((_, i) => (
                <div key={i} className="border-[0.5px] border-accent/10"></div>
              ))}
            </div>
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-accent/40"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-accent/40"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-accent/40"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-accent/40"></div>
          </div>
          
          {/* Content Container */}
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center space-y-8">
              {/* Terminal-like header */}
              <div className="inline-block px-4 py-1 border border-accent/30 bg-black/30 rounded-md mb-2">
                <code className="text-xs md:text-sm font-mono text-accent">{'> ./contact-rohit.sh'}</code>
              </div>
              
              {/* Title with animated text effect */}
              <motion.h2 
                className="text-4xl sm:text-5xl font-black tracking-tight mb-1 game-heading relative"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={textVariants}
              >
                {titleText.split('').map((char, index) => (
                  <motion.span key={index} variants={characterVariants}>
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></span>
              </motion.h2>
              
              <motion.p 
                className="text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {subtitleText}
              </motion.p>
              
              {/* Contact buttons with hover animations */}
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {contactButtons.map((button) => (
                  <motion.a
                    key={button.name}
                    href={button.url}
                    target={button.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`
                      relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-md
                      border ${button.primary ? 'border-transparent' : 'border-accent/50'}
                      ${button.primary ? 'bg-accent text-black' : 'bg-transparent text-accent'}
                      transition-all duration-300 hover:-translate-y-1
                    `}
                    onMouseEnter={() => setHoveredButton(button.name)}
                    onMouseLeave={() => setHoveredButton(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">{button.icon}</span>
                    <span className="relative z-10">{button.label}</span>
                    
                    {/* Background glow effect on hover */}
                    {button.primary ? (
                      <motion.div 
                        className="absolute inset-0 bg-accent-light opacity-0"
                        animate={{ opacity: hoveredButton === button.name ? 0.5 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <motion.div 
                        className="absolute inset-0 bg-accent/10 opacity-0"
                        animate={{ opacity: hoveredButton === button.name ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Button edge glow */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-light"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredButton === button.name ? 1 : 0,
                        opacity: hoveredButton === button.name ? 0.8 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </motion.div>
              
              {/* Command prompt footer */}
              <motion.div 
                className="font-mono text-sm text-green-400 mt-8 opacity-70"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="typing-effect">{'> Loading communication channels... [100%]'}</p>
                <p className="blinking-cursor">{'> _'}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
