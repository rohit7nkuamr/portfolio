'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Navigation links with icons
  const navLinks = [
    { name: 'home', icon: '🏠', label: 'Home' },
    { name: 'about', icon: '👨‍💻', label: 'About' },
    { name: 'projects', icon: '🎮', label: 'Projects' },
    { name: 'experience', icon: '💼', label: 'Experience' },
    { name: 'contact', icon: '📨', label: 'Contact' },
  ];

  // Handle scroll events
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      // Hide navbar when scrolling down
      if (y > lastY && y > 100) setHidden(true);
      else setHidden(false);
      setLastY(y);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => document.getElementById(link.name));
      const currentSection = sections
        .filter(section => section !== null)
        .find((section) => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    }
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${!hidden && 'shadow-lg shadow-accent/10'}`}
    >
      <motion.nav 
        className="container mx-auto backdrop-blur-md bg-black/40 border-b border-white/10 rounded-b-2xl relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between py-4 px-6">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-500 to-purple-500 opacity-70 blur-sm" />
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center relative">
                <span className="text-xl">RK</span>
              </div>
            </div>
            <Link href="#home" className="font-black text-2xl bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              Rohit Kumar
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <motion.li key={link.name} className="relative">
                <Link 
                  href={`#${link.name}`} 
                  onClick={() => setActiveSection(link.name)}
                  className={`px-4 py-2 flex items-center gap-2 text-sm rounded-lg hover:bg-white/10 transition-all ${activeSection === link.name ? 'text-accent' : 'text-gray-300'}`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium tracking-wide">{link.label}</span>
                </Link>
                {activeSection === link.name && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-purple-500"
                    layoutId="activeNav"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/10"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <motion.span 
                  className="bg-white h-0.5 rounded-full block" 
                  animate={{ translateY: mobileMenuOpen ? '7px' : 0, rotate: mobileMenuOpen ? 45 : 0 }}
                />
                <motion.span 
                  className="bg-white h-0.5 rounded-full block" 
                  animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                />
                <motion.span 
                  className="bg-white h-0.5 rounded-full block" 
                  animate={{ translateY: mobileMenuOpen ? '-7px' : 0, rotate: mobileMenuOpen ? -45 : 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <ul className="py-3 px-4 space-y-1">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Link 
                      href={`#${link.name}`} 
                      onClick={() => {
                        setActiveSection(link.name);
                        setMobileMenuOpen(false);
                      }}
                      className={`block px-3 py-3 rounded-lg ${activeSection === link.name 
                        ? 'bg-accent/20 text-accent' 
                        : 'hover:bg-white/5'}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xl">{link.icon}</span>
                        <span className="font-medium">{link.label}</span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
