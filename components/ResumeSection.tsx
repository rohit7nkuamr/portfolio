'use client';
import Section from './Section';
import ResumePreview from './ResumePreview';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ResumeSection() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Section id="resume" className="bg-transparent">
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.h2 
          className="game-heading text-4xl font-bold relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Résumé
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 max-w-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Download my ATS-optimized résumé for a concise overview of my skills, experience,
          and projects. Designed for both human readers and applicant tracking systems.
        </motion.p>
        
        {/* Résumé preview and download area */}
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative rounded-xl overflow-hidden bg-[#090a10] border border-accent/30 p-8 shadow-[0_0_25px_rgba(0,255,255,0.2)]">
            {/* Animated grid background */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] opacity-20">
              {Array.from({ length: 400 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border-[0.5px] border-accent/20"
                  style={{
                    opacity: Math.random() * 0.5 + 0.25
                  }}
                />
              ))}
            </div>
            
            {/* Resume content layout */}
            <div className="relative z-10 grid md:grid-cols-[1fr_1.5fr] gap-8 items-center">
              {/* Left side - Resume Preview */}
              <div className="relative max-h-[500px] overflow-hidden rounded-lg shadow-lg">
                <ResumePreview />
                
                {/* Fade overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                
                {/* ATS score badge */}
                <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  90+ ATS Score
                </div>
              </div>
              
              {/* Right side - Download and Info */}
              <div className="space-y-6 flex flex-col justify-center">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">ATS-Optimized Design</h3>
                  <p className="text-gray-300">This résumé is carefully crafted to pass through Applicant Tracking Systems with a high score while remaining visually appealing to human reviewers.</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-accent">Key Features:</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      Clean, parsable formatting for ATS compatibility
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      Keyword optimization based on industry standards
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent mr-2">✓</span>
                      Quantifiable achievements with metrics
                    </li>
                  </ul>
                </div>
                
                {/* Download button */}
                <motion.div
                  className="relative group mt-4"
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  
                  {/* Button frame */}
                  <div className="relative px-1 py-1 bg-black rounded-lg leading-none flex items-center">
                    <a
                      href="/Rohit_Kumar_Resume.pdf"
                      download
                      className="flex items-center space-x-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded font-medium transition-all duration-300 w-full justify-center"
                    >
                      <span className="text-accent group-hover:text-white transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                      <span>Download Résumé</span>
                    </a>
                  </div>
                  
                  {/* Corner decorations */}
                  <motion.div 
                    className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent"
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent"
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent"
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent"
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
