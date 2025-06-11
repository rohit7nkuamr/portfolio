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

// Determine the base URL for deployment - fix for Next.js server-side logic
// This needs to be wrapped in a function that executes only on the client side
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''; // Empty string on client side, relative URLs
  }
  
  // Server-side rendering determination
  const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
  if (isGithubPages) {
    return 'https://rohit7nkuamr.github.io/portfolio';
  } else if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  } else {
    return 'http://localhost:3000';
  }
};

const baseUrl = getBaseUrl();


export const metadata: Metadata = {
  title: 'Rohit Kumar | Game Developer & Full-Stack Engineer',
  description: 'Interactive portfolio of Rohit Kumar – Game & Full-Stack Developer specializing in creating immersive experiences and innovative applications',
  metadataBase: new URL(baseUrl),
  authors: [{ name: 'Rohit Kumar' }],
  keywords: ['Game Developer', 'Full-Stack Developer', 'Unity', 'React', 'Next.js', 'Mobile Apps', 'Portfolio'],
  creator: 'Rohit Kumar',
  openGraph: {
    title: 'Rohit Kumar | Game Developer & Full-Stack Engineer',
    description: 'Interactive portfolio showcasing game development and full-stack engineering projects',
    type: 'website',
    locale: 'en_US',
    siteName: 'Rohit Kumar Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Rohit Kumar Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rohit Kumar | Game Developer',
    description: 'Explore my interactive, game-themed developer portfolio',
    images: ['/og-image.png'],
  },
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
