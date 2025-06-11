'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import profile from '../content/profile.json';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4" id="home">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <Image
          src="/avatar.png"
          alt={`${profile.name} photo`}
          className="rounded-full border-4 border-accent shadow-lg"
          width={160}
          height={160}
        />
        <h2 className="mt-6 text-4xl font-extrabold tracking-tight">
          {profile.name}
        </h2>
        <p className="mt-2 max-w-xl text-lg text-gray-300">
          {profile.tagline}
        </p>
        <p className="mt-4 text-accent text-lg italic">
          "Building collaborative startups and world-changing ideas."
        </p>
      </motion.div>
    </section>
  );
}
