'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import profile from '../content/profile.json';

// Typing animation text options
const roleTexts = [
  "Game Developer",
  "Full-Stack Engineer",
  "AI App Developer",
  "Mobile Developer",
  "Unity Expert",
  "Creative Coder",
  "Startup Enthusiast"
];

export default function HeroSection() {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // For typing animation
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typing animation effect
  useEffect(() => {
    const typingSpeed = 100; // ms per character
    const deletingSpeed = 50; // ms per character
    const pauseBeforeDelete = 1500; // ms
    const pauseBeforeNextWord = 500; // ms
    
    const currentRole = roleTexts[currentRoleIndex];
    
    if (!isDeleting) {
      // Typing forward
      if (currentTextIndex < currentRole.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, currentTextIndex + 1));
          setCurrentTextIndex(currentTextIndex + 1);
        }, typingSpeed);
        
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseBeforeDelete);
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting
      if (currentTextIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentRole.substring(0, currentTextIndex - 1));
          setCurrentTextIndex(currentTextIndex - 1);
        }, deletingSpeed);
        
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next word
        const timeout = setTimeout(() => {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roleTexts.length);
        }, pauseBeforeNextWord);

        return () => clearTimeout(timeout);
      }
    }
  }, [currentRoleIndex, currentTextIndex, isDeleting]);


  
  // Animate content
  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 1 } });
  }, [controls]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Beckham-inspired corner digit */}
      <div className="absolute top-8 left-8 text-9xl font-bold text-gray-800 opacity-20 select-none">01</div>
      
      {/* Main content section */}
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10" 
        id="home"
        style={{ y, opacity }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-2 text-gray-400"
          >
            Hello! I'm
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-2 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {profile.name}
          </motion.h1>
          
          <motion.div 
            className="text-gray-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I'm passionate about game development
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl md:text-5xl font-bold flex items-center justify-center text-accent-500 min-h-[60px]"
          >
            <div className="relative flex items-center justify-center">
              <span className="mr-2 text-white">A</span>
              <span className="text-accent-500">{displayText}</span>
              <span className="ml-1 animate-pulse">|</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link 
              href="#projects"
              className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 transform hover:translate-y-[-3px] shadow-lg"
            >
              View My Work
            </Link>
            
            <Link 
              href="#contact"
              className="border-2 border-gray-600 hover:border-accent-500 text-white hover:text-accent-500 py-3 px-8 rounded-full font-medium transition-all duration-300 transform hover:translate-y-[-3px]"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
