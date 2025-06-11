'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y > lastY && y > 80) setHidden(true);
      else setHidden(false);
      setLastY(y);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-500 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } bg-primary/70 backdrop-blur`}
    >
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <h1 className="text-2xl font-bold">Rohit Kumar</h1>
        <ul className="flex gap-6 text-lg">
          {['about', 'projects', 'experience', 'contact'].map((section) => (
            <li key={section}>
              <Link href={`#${section}`}>{section.charAt(0).toUpperCase() + section.slice(1)}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
