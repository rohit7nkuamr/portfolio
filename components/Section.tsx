'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  id: string;
  children: ReactNode;
  className?: string;
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  enter: { opacity: 1, y: 0 },
};

export default function Section({ id, children, className = '' }: Props) {
  return (
    <motion.section
      id={id}
      className={`min-h-screen snap-start flex items-center justify-center px-6 ${className}`}
      initial="hidden"
      whileInView="enter"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}
