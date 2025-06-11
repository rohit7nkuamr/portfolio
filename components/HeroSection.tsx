'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import profile from '../content/profile.json';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
};

const colors = ['#ff2d75', '#4cc9f0', '#4895ef', '#4361ee', '#7209b7'];

export default function HeroSection() {
  const controls = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  // Initialize particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        // Create new particles based on container size
        const particleCount = Math.floor((width * height) / 10000); // Adjust for density
        const newParticles: Particle[] = [];
        
        for (let i = 0; i < particleCount; i++) {
          newParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.7 + 0.3
          });
        }
        
        setParticles(newParticles);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0 || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Mouse interaction
    let mouseX = dimensions.width / 2;
    let mouseY = dimensions.height / 2;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    const render = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw particles
      const updatedParticles = particles.map(p => {
        // Update position
        let x = p.x + p.speedX;
        let y = p.y + p.speedY;
        
        // Wrap around screen edges
        if (x < 0) x = dimensions.width;
        if (x > dimensions.width) x = 0;
        if (y < 0) y = dimensions.height;
        if (y > dimensions.height) y = 0;
        
        // Mouse interaction - particles attracted to mouse
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 1500;
          x += Math.cos(angle) * force;
          y += Math.sin(angle) * force;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw connections between nearby particles
        particles.forEach(p2 => {
          const dx2 = p2.x - x;
          const dy2 = p2.y - y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          if (distance2 < 100) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color + Math.floor((0.2 - distance2 / 100 * 0.2) * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
        
        return { ...p, x, y };
      });
      
      setParticles(updatedParticles);
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particles, dimensions]);
  
  // Animate content
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    };
    sequence();
  }, [controls]);

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.8 }
    })
  };

  const taglineChars = profile.tagline.split('');

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 z-0"
      />
      <motion.section 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative z-10" 
        id="home"
        style={{ y, opacity }}
      >
        <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={controls}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                duration: 1.5 
              }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur opacity-70 animate-pulse" />
              <Image
                src="/avatar.png"
                alt={`${profile.name} photo`}
                className="rounded-full border-4 border-transparent bg-black/50 relative z-10"
                width={180}
                height={180}
                priority
              />
            </motion.div>
            
            <motion.h1 
              className="mt-8 text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {profile.name}
            </motion.h1>
            
            <div className="mt-4 overflow-hidden">
              <div className="flex justify-center">
                {taglineChars.map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    className="text-xl text-gray-300 inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8"
            >
              <p className="text-accent-500 text-lg font-medium italic px-4 py-2 rounded-lg bg-white/5 border border-accent/20">
                "Building collaborative startups and world-changing ideas."
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="mt-10 flex gap-4"
            >
              <motion.a 
                href="#projects" 
                className="px-6 py-3 bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-accent rounded-lg font-medium transform transition duration-200 hover:scale-105 shadow-lg shadow-accent/20"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                My Work
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-medium transform transition duration-200 hover:scale-105 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
