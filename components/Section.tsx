'use client';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
  theme?: 'default' | 'accent' | 'dark' | 'light';
  showDecoration?: boolean;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  enter: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    } 
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const getThemeStyles = (theme: string) => {
  switch (theme) {
    case 'accent':
      return 'bg-gradient-to-b from-black via-accent/10 to-black relative';
    case 'dark':
      return 'bg-gradient-to-b from-black via-gray-900/20 to-black relative';
    case 'light':
      return 'bg-gradient-to-b from-black via-white/5 to-black relative';
    default:
      return 'relative';
  }
};

export default function Section({ 
  id, 
  children, 
  className = '',
  theme = 'default',
  showDecoration = true,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const [isMounted, setIsMounted] = useState(false);
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Generate random decoration positions only once on component mount
  const [decorations] = useState(() => {
    return Array.from({ length: 8 }).map(() => ({
      size: Math.random() * 10 + 5, // Size between 5 and 15px
      top: `${Math.random() * 80 + 10}%`, // Position between 10% and 90%
      left: `${Math.random() * 90 + 5}%`, // Position between 5% and 95%
      delay: Math.random() * 5, // Random delay for animations
      duration: Math.random() * 10 + 15, // Animation duration between 15 and 25s
    }));
  });

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`min-h-screen flex items-center justify-center px-4 py-20 md:px-6 ${getThemeStyles(theme)} ${className}`}
      initial="hidden"
      whileInView="enter"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {showDecoration && isMounted && (
        <>
          {/* Background decorations */}
          {decorations.map((decoration, index) => (
            <motion.div 
              key={`deco-${id}-${index}`}
              className="absolute rounded-full bg-accent/10 blur-md pointer-events-none"
              style={{
                width: decoration.size,
                height: decoration.size,
                top: decoration.top,
                left: decoration.left,
              }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: decoration.duration,
                delay: decoration.delay,
                ease: "easeInOut" 
              }}
            />
          ))}

          {/* Side grid decorations */}
          <div className="absolute left-0 top-0 w-16 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full border-r border-dashed border-accent/50"></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`grid-left-${id}-${i}`}
                className="absolute w-full border-b border-dashed border-accent/30"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>
          
          <div className="absolute right-0 top-0 w-16 h-full opacity-10 pointer-events-none">
            <div className="w-full h-full border-l border-dashed border-accent/50"></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={`grid-right-${id}-${i}`}
                className="absolute w-full border-b border-dashed border-accent/30"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>
        </>
      )}

      {/* Main content with parallax effect */}
      <motion.div 
        className="w-full max-w-6xl z-10"
        style={{ y: isMounted ? y : 0, opacity: isMounted ? opacity : 1 }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
