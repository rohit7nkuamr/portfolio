'use client';
import { motion } from 'framer-motion';
import Section from './Section';
import aboutData from '../content/about.json';

export default function AboutSection() {
  return (
    <Section id="about" className="bg-gradient-to-b from-black to-gray-900 relative">
      {/* Beckham-inspired corner digit */}
      <div className="absolute top-8 left-8 text-9xl font-bold text-gray-800 opacity-20 select-none">02</div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 text-white">About Me</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-500 to-accent-300 opacity-20 rounded-xl"></div>
              <div className="relative p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-2xl font-bold mb-4 text-white">Game Developer & Full-Stack Engineer</h3>
                {aboutData.bio.map((paragraph: string) => (
                  <p key={paragraph.slice(0,20)} className="text-lg text-gray-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:bg-white/10">
                <h4 className="text-xl font-bold mb-2 text-accent-500">UI/UX Design</h4>
                <p className="text-gray-300">Creating intuitive interfaces for games and web applications</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:bg-white/10">
                <h4 className="text-xl font-bold mb-2 text-accent-500">Game Dev</h4>
                <p className="text-gray-300">Developing interactive experiences with Unity and custom engines</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:bg-white/10">
                <h4 className="text-xl font-bold mb-2 text-accent-500">Full-Stack</h4>
                <p className="text-gray-300">Building scalable web solutions with modern technologies</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all hover:bg-white/10">
                <h4 className="text-xl font-bold mb-2 text-accent-500">AI Integration</h4>
                <p className="text-gray-300">Implementing intelligent systems for enhanced functionality</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
