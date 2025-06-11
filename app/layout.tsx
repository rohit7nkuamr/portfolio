import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

// Setup font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Rohit Kumar | Game Developer & Full-Stack Engineer',
  description: 'Interactive portfolio of Rohit Kumar – Game & Full-Stack Developer specializing in creating immersive experiences and innovative applications',
  authors: [{ name: 'Rohit Kumar' }],
  keywords: ['Game Developer', 'Full-Stack Developer', 'Unity', 'React', 'Next.js', 'Mobile Apps', 'Portfolio'],
  creator: 'Rohit Kumar',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white font-sans overflow-x-hidden min-h-screen">
        {/* Star background */}
        <div className="fixed inset-0 stars opacity-50 pointer-events-none"></div>
        
        {/* Vignette effect */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent to-black/70 z-[1]"></div>
        
        {/* Main content */}
        <main className="relative z-[2]">
          {children}
        </main>
      </body>
    </html>
  );
}
