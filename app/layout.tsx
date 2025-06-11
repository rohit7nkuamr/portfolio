import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rohit Kumar Portfolio',
  description: 'Game-themed portfolio of Rohit Kumar – Full-stack & Game Developer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans overflow-y-scroll snap-y snap-mandatory h-screen">
        {children}
      </body>
    </html>
  );
}
